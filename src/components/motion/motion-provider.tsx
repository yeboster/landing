'use client'

import { MotionConfig } from 'framer-motion'

/** Respects the user's OS-level "reduce motion" preference for all framer animations. */
export function MotionProvider({ children }: { children: React.ReactNode }) {
  return <MotionConfig reducedMotion="user">{children}</MotionConfig>
}
