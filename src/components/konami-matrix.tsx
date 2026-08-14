'use client'

import { useEffect, useRef, useState } from 'react'
import { useReducedMotion } from 'motion/react'

const KONAMI_SEQUENCE = [
  'arrowup', 'arrowup', 'arrowdown', 'arrowdown',
  'arrowleft', 'arrowright', 'arrowleft', 'arrowright',
  'b', 'a',
]
const AUTO_DISMISS_MS = 12000
const FRAME_INTERVAL_MS = 1000 / 24
const KATAKANA = 'アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン'
const GLYPHS = (KATAKANA + '0123456789').split('')

/**
 * Konami code (↑↑↓↓←→←→ba) → full-screen violet matrix rain, dismissible
 * via click or Escape, auto-dismisses after 12s. Disabled entirely (no
 * listener attached) under prefers-reduced-motion.
 */
export function KonamiMatrix() {
  const reduce = useReducedMotion()
  const [active, setActive] = useState(false)
  const bufferRef = useRef<string[]>([])

  useEffect(() => {
    if (reduce) return
    function onKeyDown(e: KeyboardEvent) {
      const key = e.key.toLowerCase()
      const buffer = bufferRef.current
      buffer.push(key)
      if (buffer.length > KONAMI_SEQUENCE.length) buffer.shift()
      if (
        buffer.length === KONAMI_SEQUENCE.length &&
        buffer.every((k, i) => k === KONAMI_SEQUENCE[i])
      ) {
        setActive(true)
        bufferRef.current = []
      }
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [reduce])

  if (reduce || !active) return null

  return <MatrixRain onDismiss={() => setActive(false)} />
}

function MatrixRain({ onDismiss }: { onDismiss: () => void }) {
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
