'use client'

import { useEffect, useRef, useState } from 'react'
import { useReducedMotion } from 'motion/react'

const AUTO_DISMISS_MS = 12000
const FRAME_INTERVAL_MS = 1000 / 24
const FONT_SIZE = 16
const KATAKANA = 'アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン'
const GLYPHS = (KATAKANA + '0123456789').split('')

/** The brand color from the design tokens, as a canvas fill. */
function brandColor() {
  const channels = getComputedStyle(document.documentElement).getPropertyValue('--brand').trim()
  return channels ? `rgb(${channels})` : '#9f4f9d'
}

/** Full-screen brand-colored matrix rain. Loaded on demand by KonamiMatrix. */
export function MatrixRain({ onDismiss }: { onDismiss: () => void }) {
  const reduce = useReducedMotion()
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const exitRef = useRef<HTMLButtonElement>(null)
  const [hintVisible, setHintVisible] = useState(true)

  useEffect(() => {
    const previousFocus = document.activeElement as HTMLElement | null
    exitRef.current?.focus({ preventScroll: true })

    function onKeyDown(e: KeyboardEvent) {
      if (e.key === 'Escape') onDismiss()
    }
    window.addEventListener('keydown', onKeyDown)
    const dismissTimer = setTimeout(onDismiss, AUTO_DISMISS_MS)
    const hintTimer = setTimeout(() => setHintVisible(false), 3000)
    return () => {
      window.removeEventListener('keydown', onKeyDown)
      clearTimeout(dismissTimer)
      clearTimeout(hintTimer)
      previousFocus?.focus?.({ preventScroll: true })
    }
  }, [onDismiss])

  useEffect(() => {
    // KonamiMatrix already refuses to mount under reduced motion; this guards
    // the loop if the preference flips while the rain is on screen.
    if (reduce) return
    const canvas = canvasRef.current
    const ctx = canvas?.getContext('2d')
    if (!canvas || !ctx) return

    const color = brandColor()
    let columns = 0
    let drops: number[] = []

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2)
      canvas.width = window.innerWidth * dpr
      canvas.height = window.innerHeight * dpr
      canvas.style.width = `${window.innerWidth}px`
      canvas.style.height = `${window.innerHeight}px`
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      columns = Math.ceil(window.innerWidth / FONT_SIZE)
      drops = Array.from({ length: columns }, () => Math.floor(Math.random() * -50))
    }
    resize()
    window.addEventListener('resize', resize)

    let rafId = 0
    let lastFrame = 0
    const draw = (timestamp: number) => {
      rafId = requestAnimationFrame(draw)
      if (timestamp - lastFrame < FRAME_INTERVAL_MS) return
      lastFrame = timestamp
      // Translucent black over the last frame leaves the fading trails.
      ctx.fillStyle = 'rgba(0, 0, 0, 0.08)'
      ctx.fillRect(0, 0, window.innerWidth, window.innerHeight)
      ctx.fillStyle = color
      ctx.font = `${FONT_SIZE}px monospace`
      for (let i = 0; i < columns; i++) {
        const glyph = Math.random() < 0.002 ? 'marco' : GLYPHS[Math.floor(Math.random() * GLYPHS.length)]
        ctx.fillText(glyph, i * FONT_SIZE, drops[i] * FONT_SIZE)
        if (drops[i] * FONT_SIZE > window.innerHeight && Math.random() > 0.975) drops[i] = 0
        drops[i]++
      }
    }
    rafId = requestAnimationFrame(draw)

    return () => {
      cancelAnimationFrame(rafId)
      window.removeEventListener('resize', resize)
    }
  }, [reduce])

  return (
    <div className="fixed inset-0 z-[95] bg-black" role="dialog" aria-modal="true" aria-label="Matrix rain easter egg">
      <canvas ref={canvasRef} onClick={onDismiss} aria-hidden="true" className="block h-full w-full cursor-pointer" />
      <button
        ref={exitRef}
        type="button"
        onClick={onDismiss}
        className={`fixed bottom-8 left-1/2 -translate-x-1/2 rounded-full border border-white/15 bg-black/70 px-4 py-2 font-mono text-xs text-white/80 transition-opacity duration-700 focus-visible:opacity-100 ${
          hintVisible ? 'opacity-100' : 'opacity-0'
        }`}
      >
        matrix mode · esc to exit
      </button>
    </div>
  )
}
