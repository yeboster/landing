'use client'

import dynamic from 'next/dynamic'
import { useEffect, useRef, useState } from 'react'
import { useReducedMotion } from 'motion/react'

const MatrixRain = dynamic(() => import('./matrix-rain').then((m) => m.MatrixRain), { ssr: false })

const KONAMI_SEQUENCE = [
  'arrowup', 'arrowup', 'arrowdown', 'arrowdown',
  'arrowleft', 'arrowright', 'arrowleft', 'arrowright',
  'b', 'a',
]

/**
 * Konami code (↑↑↓↓←→←→ba) → full-screen violet matrix rain, dismissible
 * via click or Escape, auto-dismisses after 12s. Disabled entirely (no
 * listener attached) under prefers-reduced-motion. The rain canvas itself
 * is a separate chunk, fetched only once the code is entered.
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

