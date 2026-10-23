'use client'

import * as React from 'react'
import { motion, type Variants } from 'framer-motion'

import { fadeUp, stagger } from '@/lib/motion'

function withDelay(variants: Variants, delay: number): Variants {
  if (!delay || typeof variants.visible !== 'object') return variants
  const visible = variants.visible as Record<string, any>
  return {
    ...variants,
    visible: { ...visible, transition: { ...visible.transition, delay } },
  }
}

type RevealProps = {
  children: React.ReactNode
  className?: string
  /** Delay in seconds before the animation starts. */
  delay?: number
  /** Animate on mount instead of when scrolled into view (use above the fold). */
  immediate?: boolean
  variants?: Variants
  as?: 'div' | 'section' | 'ul' | 'ol' | 'li' | 'span' | 'p' | 'h1' | 'h2' | 'h3'
}

/**
 * Fades its children in once, either on mount or when scrolled into view.
 * Usable from Server Components: pass content as children.
 */
export function Reveal({
  children,
  className,
  delay = 0,
  immediate = false,
  variants = fadeUp,
  as = 'div',
}: RevealProps) {
  const Component = motion[as]
  const trigger = immediate
    ? { animate: 'visible' as const }
    : { whileInView: 'visible' as const, viewport: { once: true, margin: '-80px' } }

  return (
    <Component
      className={className}
      initial="hidden"
      {...trigger}
      variants={withDelay(variants, delay)}
    >
      {children}
    </Component>
  )
}

type RevealGroupProps = Omit<RevealProps, 'variants'> & {
  /** Seconds between each child. */
  interval?: number
}

/** Staggers the entrance of its direct `<RevealItem>` children. */
export function RevealGroup({
  children,
  className,
  delay = 0,
  immediate = false,
  interval = 0.08,
  as = 'div',
}: RevealGroupProps) {
  const Component = motion[as]
  const trigger = immediate
    ? { animate: 'visible' as const }
    : { whileInView: 'visible' as const, viewport: { once: true, margin: '-80px' } }

  return (
    <Component
      className={className}
      initial="hidden"
      {...trigger}
      variants={stagger(interval, delay)}
    >
      {children}
    </Component>
  )
}

export function RevealItem({
  children,
  className,
  variants = fadeUp,
  as = 'div',
}: Pick<RevealProps, 'children' | 'className' | 'variants' | 'as'>) {
  const Component = motion[as]
  return (
    <Component className={className} variants={variants}>
      {children}
    </Component>
  )
}
