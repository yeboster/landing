'use client'

import { useEffect, useRef, useState } from 'react'

import { cn } from '@/lib/utils'

const GLYPHS = '!<>-_\\/[]{}=+*^?#'
/** Delay between one character starting to scramble and the next. */
const CHAR_STAGGER_MS = 22
/** How long each character scrambles before settling. */
const SCRAMBLE_MS = 90
/** Glyph swaps are throttled to this interval so it reads as flicker, not noise. */
const TICK_MS = 35

interface ScrambleTextProps {
  text: string
  className?: string
}

function randomGlyph() {
  return GLYPHS[Math.floor(Math.random() * GLYPHS.length)]
}

/**
 * Hover text that briefly scrambles through glyphs, left to right, then
 * settles. The real text reserves the width (so nothing beside it shifts) and
 * is what screen readers get; the scrambled overlay is aria-hidden.
 * Plain text on touch devices and under reduced motion.
 */
export function ScrambleText({ text, className }: ScrambleTextProps) {
  const [display, setDisplay] = useState(text)
  const [interactive, setInteractive] = useState(false)
  const frameRef = useRef<number | null>(null)

  useEffect(() => {
    const reduceQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
    const hoverQuery = window.matchMedia('(hover: hover) and (pointer: fine)')
    const update = () => setInteractive(!reduceQuery.matches && hoverQuery.matches)
    update()
    reduceQuery.addEventListener('change', update)
    hoverQuery.addEventListener('change', update)
    return () => {
      reduceQuery.removeEventListener('change', update)
      hoverQuery.removeEventListener('change', update)
    }
  }, [])

  const stop = () => {
    if (frameRef.current !== null) cancelAnimationFrame(frameRef.current)
    frameRef.current = null
  }

  useEffect(() => stop, [])

  const scramble = () => {
    stop()
    const chars = Array.from(text)
    const total = (chars.length - 1) * CHAR_STAGGER_MS + SCRAMBLE_MS
    let start = 0
    let lastTick = 0

    const frame = (now: number) => {
      start ||= now
      const elapsed = now - start
      if (elapsed >= total) {
        setDisplay(text)
        frameRef.current = null
        return
      }
      if (now - lastTick >= TICK_MS) {
        lastTick = now
        setDisplay(
          chars
            .map((char, i) => {
              const local = elapsed - i * CHAR_STAGGER_MS
              return char === ' ' || local < 0 || local >= SCRAMBLE_MS ? char : randomGlyph()
            })
            .join('')
        )
      }
      frameRef.current = requestAnimationFrame(frame)
    }
    frameRef.current = requestAnimationFrame(frame)
  }

  const restore = () => {
    stop()
    setDisplay(text)
  }

  if (!interactive) return <span className={className}>{text}</span>

  return (
    <span className={cn('relative inline-block', className)} onPointerEnter={scramble} onPointerLeave={restore}>
      <span className="invisible">{text}</span>
      <span aria-hidden="true" className="absolute inset-0 whitespace-nowrap">
        {display}
      </span>
      <span className="sr-only">{text}</span>
    </span>
  )
}
