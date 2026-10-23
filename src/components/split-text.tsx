'use client'

import { motion, useReducedMotion, type Variants } from 'motion/react'

import { ease } from '@/lib/motion'
import { cn } from '@/lib/utils'

interface SplitTextProps {
  text: string
  /** Seconds between tokens. Defaults to 0.04 for words, 0.025 for letters. */
  stagger?: number
  /** Per-token duration in seconds. */
  duration?: number
  /** "word" or "letter" splitting. */
  by?: 'word' | 'letter'
  /** Seconds before the first token starts. */
  delay?: number
  /**
   * Paint the text with the brand gradient. Prefer this over wrapping
   * SplitText in a `bg-clip-text` span: each token carries its own slice of
   * the gradient, so letters stay visible while they animate (Chrome drops
   * animated children of a `background-clip: text` parent) and the last
   * letter of an italic word is never clipped to transparent.
   */
  gradient?: boolean
  className?: string
}

/** Upper bound for the whole stagger, so long headings still land quickly. */
const MAX_SPREAD = 0.4

const containerVariants: Variants = {
  hidden: {},
  visible: (custom: { stagger: number; delay: number }) => ({
    transition: { staggerChildren: custom.stagger, delayChildren: custom.delay },
  }),
}

function tokenVariants(duration: number, blur: boolean): Variants {
  return {
    hidden: { opacity: 0, y: '0.3em', ...(blur && { filter: 'blur(4px)' }) },
    visible: {
      opacity: 1,
      y: 0,
      ...(blur && { filter: 'blur(0px)' }),
      // Clear the filter after the entrance: a live `filter` on children of a
      // `background-clip: text` parent kills the gradient text paint in Chrome.
      transitionEnd: { filter: 'none' },
      transition: { duration, ease },
    },
  }
}

/** Gives token `i` of `n` its slice of one continuous gradient. */
function gradientSlice(i: number, n: number): React.CSSProperties {
  return {
    backgroundSize: `${n * 100}% 100%`,
    backgroundPosition: `${n > 1 ? (i / (n - 1)) * 100 : 0}% 0`,
  }
}

/**
 * Splits text into words or letters and reveals them with a short, staggered
 * rise. Screen readers get the plain text once; the animated tokens are
 * hidden from them. Reduced motion renders the text as is.
 */
export function SplitText({ text, stagger, duration = 0.45, by = 'word', delay = 0.05, gradient = false, className }: SplitTextProps) {
  const reduce = useReducedMotion()

  if (reduce) {
    return <span className={cn(gradient && 'text-gradient-brand pr-[0.08em]', className)}>{text}</span>
  }

  const words = text.split(' ')
  const count = by === 'letter' ? text.replace(/ /g, '').length : words.length
  const requested = stagger ?? (by === 'letter' ? 0.025 : 0.04)
  const step = count > 1 ? Math.min(requested, MAX_SPREAD / (count - 1)) : requested
  // No blur on gradient tokens: they are their own `background-clip: text` box.
  const variants = tokenVariants(duration, !gradient)

  // Italic glyphs overhang their box; the padding keeps that overhang inside
  // the painted gradient and the negative margin keeps the spacing unchanged.
  const tokenClass = cn('inline-block', gradient && 'text-gradient-brand -mr-[0.08em] pr-[0.08em]')

  let index = 0
  const token = (content: string, key: string) => {
    const i = index++
    return (
      <motion.span key={key} variants={variants} className={tokenClass} style={gradient ? gradientSlice(i, count) : undefined}>
        {content}
      </motion.span>
    )
  }

  return (
    <motion.span
      className={className}
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      custom={{ stagger: step, delay }}
    >
      <span className="sr-only">{text}</span>
      <span aria-hidden="true">
        {words.map((word, w) => (
          <span key={`${word}-${w}`}>
            {by === 'letter' ? (
              // Keep a word's letters together so lines only break between words.
              <span className="inline-block whitespace-nowrap">
                {Array.from(word).map((char, c) => token(char, `${char}-${c}`))}
              </span>
            ) : (
              token(word, word)
            )}
            {w < words.length - 1 ? ' ' : null}
          </span>
        ))}
      </span>
    </motion.span>
  )
}
