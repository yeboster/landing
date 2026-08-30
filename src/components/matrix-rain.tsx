'use client'

import { useEffect, useRef, useState } from 'react'

const AUTO_DISMISS_MS = 12000
const FRAME_INTERVAL_MS = 1000 / 24
const KATAKANA = 'アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン'
const GLYPHS = (KATAKANA + '0123456789').split('')

/** Full-screen violet matrix rain. Loaded on demand by KonamiMatrix. */
export function MatrixRain({ onDismiss }: { onDismiss: () => void }) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [hintVisible, setHintVisible] = useState(true)

  useEffect(() => {
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
    }
  }, [onDismiss])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const fontSize = 16
    let columns = 0
    let drops: number[] = []

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2)
      canvas.width = window.innerWidth * dpr
      canvas.height = window.innerHeight * dpr
      canvas.style.width = `${window.innerWidth}px`
      canvas.style.height = `${window.innerHeight}px`
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      columns = Math.ceil(window.innerWidth / fontSize)
      drops = new Array(columns).fill(0).map(() => Math.floor(Math.random() * -50))
    }
    resize()
    window.addEventListener('resize', resize)

    let rafId = 0
    let lastFrame = 0
    const draw = (timestamp: number) => {
      rafId = requestAnimationFrame(draw)
      if (timestamp - lastFrame < FRAME_INTERVAL_MS) return
      lastFrame = timestamp
      ctx.fillStyle = 'rgba(0,0,0,0.08)'
      ctx.fillRect(0, 0, window.innerWidth, window.innerHeight)
      ctx.fillStyle = '#9f4f9d'
      ctx.font = `${fontSize}px monospace`
      for (let i = 0; i < columns; i++) {
        const glyph = Math.random() < 0.002 ? 'marco' : GLYPHS[Math.floor(Math.random() * GLYPHS.length)]
        ctx.fillText(glyph, i * fontSize, drops[i] * fontSize)
        if (drops[i] * fontSize > window.innerHeight && Math.random() > 0.975) {
          drops[i] = 0
        }
        drops[i]++
      }
    }
    rafId = requestAnimationFrame(draw)

    return () => {
      cancelAnimationFrame(rafId)
      window.removeEventListener('resize', resize)
    }
  }, [])

  return (
    <div className="fixed inset-0 z-[95] bg-black" role="dialog" aria-label="Matrix rain easter egg">
      <canvas ref={canvasRef} onClick={onDismiss} className="block h-full w-full cursor-pointer" />
      <div
        className={`pointer-events-none fixed bottom-8 left-1/2 -translate-x-1/2 rounded-full bg-black/70 px-4 py-2 text-xs font-mono text-[#c06fbe] transition-opacity duration-700 ${hintVisible ? 'opacity-100' : 'opacity-0'}`}
      >
        matrix mode — esc to exit
      </div>
    </div>
  )
}
