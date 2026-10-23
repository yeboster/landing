'use client'

import { useEffect, useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'motion/react'

import { duration, ease } from '@/lib/motion'
import { cn } from '@/lib/utils'

/**
 * Cycles through `words` in place.
 *
 * Every word is laid out invisibly in the same grid cell, so the box is always
 * as wide as the longest word and the surrounding line never shifts. Solid
 * color and no blur: animating `filter` on clipped gradient text blanks it in
 * Chrome. Screen readers get the whole list once instead of a live ticker.
 */
export function RotatingText({ words, interval = 2600, className }: { words: string[]; interval?: number; className?: string }) {
  const [index, setIndex] = useState(0)
  const reduce = useReducedMotion()

  useEffect(() => {
    if (reduce) return
    const id = setInterval(() => setIndex((i) => (i + 1) % words.length), interval)
    return () => clearInterval(id)
  }, [words.length, interval, reduce])

  return (
    <span className={cn('relative inline-grid text-left align-bottom', className)}>
      <span className="sr-only">{words.join(', ')}</span>
      {words.map((word) => (
        <span key={word} aria-hidden="true" className="invisible [grid-area:1/1]">
          {word}
        </span>
      ))}
      <AnimatePresence mode="wait" initial={false}>
        <motion.span
          key={words[index]}
          aria-hidden="true"
          className="[grid-area:1/1]"
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: duration.fast, ease }}
        >
          {words[index]}
        </motion.span>
      </AnimatePresence>
    </span>
  )
}
