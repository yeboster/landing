'use client'

import { motion, useScroll, useSpring, useReducedMotion } from 'motion/react'

/**
 * Thin fixed scroll-progress bar.
 * Sits above the navbar (z-60) and tracks page scroll via useScroll,
 * animated through a spring for a soft trailing feel.
 * Honors prefers-reduced-motion: returns null so it never paints.
 */
export function ScrollProgress() {
  const reduce = useReducedMotion()
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 220,
    damping: 30,
    mass: 0.4,
    restDelta: 0.001,
  })

  if (reduce) return null

  return (
    <motion.div
      aria-hidden="true"
      className="pointer-events-none fixed top-0 left-0 right-0 z-[60] h-[3px] origin-left bg-gradient-to-r from-[#7a3a78] via-[#9f4f9d] to-[#c06fbe]"
      style={{ scaleX }}
    />
  )
}
