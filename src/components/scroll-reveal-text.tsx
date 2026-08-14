'use client'

import { useRef } from 'react'
import { motion, useScroll, useTransform, useReducedMotion, type MotionValue } from 'motion/react'

interface ScrollRevealTextProps {
  text: string
  className?: string
}

/**
 * Paragraph that illuminates word-by-word, left-to-right, as it scrolls
 * into view. Reduced motion renders the plain paragraph at full opacity
 * with no scroll subscription at all.
 */
export function ScrollRevealText({ text, className }: ScrollRevealTextProps) {
  const reduce = useReducedMotion()

  if (reduce) return <p className={className}>{text}</p>

  return <RevealParagraph text={text} className={className} />
}

function RevealParagraph({ text, className }: ScrollRevealTextProps) {
  const ref = useRef<HTMLParagraphElement>(null)
  const words = text.split(' ')
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start 0.8', 'start 0.25'],
  })

  return (
    <p ref={ref} className={className}>
      {words.map((word, i) => (
        <RevealWord
          key={`${word}-${i}`}
          word={word}
          isLast={i === words.length - 1}
          start={i / words.length}
          end={(i + 1) / words.length}
          progress={scrollYProgress}
        />
      ))}
    </p>
  )
}

function RevealWord({
  word,
  isLast,
  start,
  end,
  progress,
}: {
  word: string
  isLast: boolean
  start: number
  end: number
  progress: MotionValue<number>
}) {
  const opacity = useTransform(progress, [start, end], [0.15, 1])
  return (
    <motion.span style={{ opacity }} className="inline-block">
      {word}
      {isLast ? '' : ' '}
    </motion.span>
  )
}
