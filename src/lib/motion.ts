import type { Variants } from 'motion/react'

/**
 * Shared motion language. Every page used to carry its own copy of these
 * variants with slightly different timings; import from here instead so the
 * whole site moves the same way.
 *
 * No `filter: blur()` in shared variants: animating filter on gradient
 * (`bg-clip-text`) headings leaves them invisible in Chrome unless the filter
 * is cleared afterwards (see `transitionEnd` in split-text.tsx).
 */

export const ease = [0.16, 1, 0.3, 1] as const

export const duration = {
  fast: 0.3,
  base: 0.6,
  slow: 0.9,
} as const

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: duration.base, ease } },
}

export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: duration.base, ease } },
}

export const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.96, y: 16 },
  visible: { opacity: 1, scale: 1, y: 0, transition: { duration: duration.base, ease } },
}

export const stagger = (staggerChildren = 0.08, delayChildren = 0): Variants => ({
  hidden: {},
  visible: { transition: { staggerChildren, delayChildren } },
})

/** Viewport settings for scroll-triggered entrances. */
export const inView = { once: true, margin: '-80px' } as const
