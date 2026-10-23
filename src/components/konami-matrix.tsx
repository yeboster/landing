'use client'

import dynamic from 'next/dynamic'
import { useCallback, useEffect, useRef, useState } from 'react'
import { useReducedMotion } from 'motion/react'

const MatrixRain = dynamic(() => import('./matrix-rain').then((m) => m.MatrixRain), { ssr: false })

const KONAMI_SEQUENCE = ['arrowup', 'arrowup', 'arrowdown', 'arrowdown', 'arrowleft', 'arrowright', 'arrowleft', 'arrowright', 'b', 'a']

/**
 * Konami code (↑↑↓↓←→←→ba) → full-screen matrix rain in the brand color,
 * dismissible via click or Escape, auto-dismissed after 12s. No listener is
 * attached under prefers-reduced-motion. The rain canvas is a separate chunk,
 * fetched only once the code is entered.
 */
export function KonamiMatrix() {
  const reduce = useReducedMotion()
  const [active, setActive] = useState(false)
  const bufferRef = useRef<string[]>([])
  const dismiss = useCallback(() => setActive(false), [])

  useEffect(() => {
    if (reduce) return
    function onKeyDown(e: KeyboardEvent) {
      // Don't listen in on typing (contact form, palette search, terminal).
      const target = e.target as HTMLElement | null
      if (target?.isContentEditable || target?.tagName === 'INPUT' || target?.tagName === 'TEXTAREA') return
      const buffer = bufferRef.current
      buffer.push(e.key.toLowerCase())
      if (buffer.length > KONAMI_SEQUENCE.length) buffer.shift()
      if (buffer.length === KONAMI_SEQUENCE.length && buffer.every((k, i) => k === KONAMI_SEQUENCE[i])) {
        setActive(true)
        bufferRef.current = []
      }
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [reduce])

  if (reduce || !active) return null

  return <MatrixRain onDismiss={dismiss} />
}
