'use client'

import { MotionConfig } from 'motion/react'

/**
 * Makes every Motion animation on the site honor the visitor's
 * `prefers-reduced-motion` setting.
 *
 * The individual interaction islands each carry their own guard, but the
 * page-level entrance animations — the `fadeUp` / `scaleIn` variants in the
 * seven page clients — drove Motion directly with no check. The global CSS
 * reduced-motion rule does not cover them, because it neutralises CSS
 * animations and transitions while Motion animates via JS. `reducedMotion="user"`
 * closes that gap in one place: transform and opacity animations resolve
 * instantly to their final state instead of being dropped, so nothing that
 * animates in ends up invisible.
 */
export function MotionProvider({ children }: { children: React.ReactNode }) {
  return <MotionConfig reducedMotion="user">{children}</MotionConfig>
}
