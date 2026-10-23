import type { Variants } from 'framer-motion'

// Shared motion language. Keep durations and easing consistent site-wide.

export const ease = [0.16, 1, 0.3, 1] as const

export const duration = {
  fast: 0.3,
  base: 0.6,
  slow: 0.9,
} as const

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24, filter: 'blur(6px)' },
  visible: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: { duration: duration.base, ease },
  },
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
