'use client'

import { useEffect, useRef, useState } from 'react'

const GLYPHS = '!<>-_\\/[]{}—=+*^?#'
const CHAR_STAGGER_MS = 28
const CYCLES = 3

interface ScrambleTextProps {
  text: string
  className?: string
}

function randomGlyph() {
  return GLYPHS[Math.floor(Math.random() * GLYPHS.length)]
}

/**
 * Hover text that scrambles through random glyphs before settling back to
 * the real characters, left-to-right. Real text stays in the DOM (sr-only)
 * for screen readers; the animated span is aria-hidden.
 */
export function ScrambleText({ text, className }: ScrambleTextProps) {
  const [display, setDisplay] = useState(text)
  const [interactive, setInteractive] = useState(false)
  const frameRef = useRef<number | null>(null)
  const timeoutsRef = useRef<ReturnType<typeof setTimeout>[]>([])

  useEffect(() => {
    const reduceQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
    const hoverQuery = window.matchMedia('(hover: none)')
    setInteractive(!reduceQuery.matches && !hoverQuery.matches)
    const update = () => setInteractive(!reduceQuery.matches && !hoverQuery.matches)
    reduceQuery.addEventListener('change', update)
    hoverQuery.addEventListener('change', update)
    return () => {
      reduceQuery.removeEventListener('change', update)
      hoverQuery.removeEventListener('change', update)
    }
  }, [])

  const clearPending = () => {
    timeoutsRef.current.forEach(clearTimeout)
    timeoutsRef.current = []
    if (frameRef.current !== null) {
      cancelAnimationFrame(frameRef.current)
      frameRef.current = null
    }
  }

  const scramble = () => {
    clearPending()
    const chars = text.split('')
    chars.forEach((char, i) => {
      if (char === ' ') return
      let cycle = 0
      const tick = () => {
        cycle += 1
        setDisplay((prev) => {
          const next = prev.split('')
          next[i] = cycle > CYCLES ? char : randomGlyph()
          return next.join('')
        })
        if (cycle <= CYCLES) {
          const t = setTimeout(tick, 40)
          timeoutsRef.current.push(t)
        }
      }
      const startDelay = i * CHAR_STAGGER_MS
      const t = setTimeout(tick, startDelay)
      timeoutsRef.current.push(t)
    })
  }

  const restore = () => {
    clearPending()
    setDisplay(text)
  }

  useEffect(() => () => clearPending(), [])

  if (!interactive) {
    return <span className={className}>{text}</span>
  }

  return (
    <span
      className={className}
      onPointerEnter={scramble}
      onPointerLeave={restore}
    >
      <span aria-hidden="true">{display}</span>
      <span className="sr-only">{text}</span>
    </span>
  )
}
