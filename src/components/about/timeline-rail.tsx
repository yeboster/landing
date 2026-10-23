'use client'

import * as React from 'react'
import { motion, useReducedMotion, useScroll } from 'motion/react'

/**
 * The vertical line behind the career timeline. A brand-coloured overlay
 * draws down the rail as the list scrolls past; with reduced motion it is
 * simply drawn in full. The list itself stays server-rendered.
 */
export function TimelineRail({ children }: { children: React.ReactNode }) {
  const ref = React.useRef<HTMLDivElement>(null)
  const reduce = useReducedMotion()
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 75%', 'end 60%'] })

  return (
    <div ref={ref} className="relative">
      <span aria-hidden className="absolute bottom-3 left-[7px] top-3 w-px bg-border print:hidden" />
      <motion.span
        aria-hidden
        style={{ scaleY: reduce ? 1 : scrollYProgress }}
        className="absolute bottom-3 left-[7px] top-3 w-px origin-top bg-brand print:hidden"
      />
      {children}
    </div>
  )
}
