'use client'

import { motion, useReducedMotion } from 'motion/react'

import { duration, ease } from '@/lib/motion'

/** Short fade-and-rise on every route change (mounted by app/template.tsx). */
export function PageTransition({ children }: { children: React.ReactNode }) {
  const reduce = useReducedMotion()
  return (
    <motion.div
      initial={reduce ? false : { opacity: 0, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: duration.fast, ease }}
    >
      {children}
    </motion.div>
  )
}
