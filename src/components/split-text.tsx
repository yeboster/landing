'use client'

import { motion, useReducedMotion, type Variants } from 'motion/react'

interface SplitTextProps {
  text: string
  /** Stagger between words (seconds). Defaults to 0.06. */
  stagger?: number
  /** Per-word duration in seconds. */
  duration?: number
  /** "word" or "letter" splitting. */
  by?: 'word' | 'letter'
  className?: string
}

const containerVariants: Variants = {
  hidden: {},
  visible: (custom: { stagger: number }) => ({
    transition: { staggerChildren: custom.stagger, delayChildren: 0.1 },
  }),
}

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 18, filter: 'blur(8px)' },
  visible: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    // Clear the filter after the entrance: a live `filter` on children of a
    // `background-clip: text` parent kills the gradient text paint in Chrome.
    transitionEnd: { filter: 'none' },
    transition: { duration: 0.55, ease: [0.25, 0.46, 0.45, 0.94] },
  },
}

/**
 * Splits text into words or letters and reveals each with a fadeUp + blur
 * entrance, staggered. Returns plain text for users with prefers-reduced-motion.
 */
export function SplitText({
  text,
  stagger = 0.06,
  duration = 0.55,
  by = 'word',
  className,
}: SplitTextProps) {
  const reduce = useReducedMotion()
  if (reduce) return <span className={className}>{text}</span>

  const tokens = by === 'letter' ? Array.from(text) : text.split(' ')
  const variantsWithDuration: Variants = {
    ...itemVariants,
    visible: {
      ...(itemVariants.visible as object),
      transition: { duration, ease: [0.25, 0.46, 0.45, 0.94] },
    },
  }

  return (
    <motion.span
      className={className}
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      custom={{ stagger }}
    >
      {tokens.map((token, i) => (
        <motion.span
          key={`${token}-${i}`}
          aria-hidden="true"
          variants={variantsWithDuration}
          className="inline-block"
          style={{ whiteSpace: by === 'letter' && token === ' ' ? 'pre' : 'normal' }}
        >
          {token}
          {by === 'word' && i < tokens.length - 1 ? '\u00A0' : ''}
        </motion.span>
      ))}
    </motion.span>
  )
}
