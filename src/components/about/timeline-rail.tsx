'use client'

import * as React from 'react'
import { motion, useReducedMotion, useScroll, useSpring } from 'framer-motion'

import { cn } from '@/lib/utils'

/**
 * Vertical rail behind a timeline. A brand-coloured line draws in as the
 * timeline scrolls through the viewport. The rail sits at the horizontal
 * centre of 2.5rem (size-10) markers; children render on top of it.
 */
export function TimelineRail({ children, className }: { children: React.ReactNode; className?: string }) {
  const ref = React.useRef<HTMLDivElement>(null)
  const reduceMotion = useReducedMotion()
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 80%', 'end 60%'] })
  const progress = useSpring(scrollYProgress, { stiffness: 140, damping: 30, restDelta: 0.001 })

  return (
    <div ref={ref} className={cn('relative', className)}>
      <div aria-hidden className="mask-fade-b pointer-events-none absolute bottom-0 left-5 top-5 w-px -translate-x-1/2">
        <div className="absolute inset-0 bg-border" />
        <motion.div
          className="absolute inset-0 origin-top bg-gradient-to-b from-brand via-brand/70 to-brand/0"
          style={{ scaleY: reduceMotion ? 1 : progress }}
        />
      </div>
      {children}
    </div>
  )
}
