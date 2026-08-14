'use client'

import { ReactLenis } from 'lenis/react'
import { useReducedMotion } from 'motion/react'

/**
 * Wraps children in a root Lenis instance for smooth scrolling.
 * Lenis drives native scroll (window.scrollY), so useScroll()-based
 * features (scroll-progress bar, navbar hide-on-scroll) keep working untouched.
 * Under prefers-reduced-motion, renders children with native scroll only.
 */
export function SmoothScroll({ children }: { children: React.ReactNode }) {
  const reduce = useReducedMotion()

  if (reduce) return <>{children}</>

  return (
    <ReactLenis
      root
      options={{ lerp: 0.1, duration: 1.15, smoothWheel: true, anchors: true }}
    >
      {children}
    </ReactLenis>
  )
}
