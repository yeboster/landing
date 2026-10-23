'use client'

import { motion, useReducedMotion, useScroll, useSpring } from 'motion/react'

/**
 * Hairline reading-progress bar pinned to the top of the viewport.
 *
 * It sits above the navbar (z-60) and is independent of it: when the navbar
 * hides on scroll-down the bar stays put, and when the navbar is shown the
 * bar simply overlays its top edge. Not rendered under reduced motion.
 */
export function ScrollProgress() {
  const reduce = useReducedMotion()
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, { stiffness: 220, damping: 32, mass: 0.4, restDelta: 0.001 })

  if (reduce) return null

  return (
    <motion.div
      aria-hidden="true"
      data-print="hide"
      className="pointer-events-none fixed inset-x-0 top-0 z-[60] h-0.5 origin-left bg-gradient-to-r from-brand via-brand-strong to-brand"
      style={{ scaleX }}
    />
  )
}
