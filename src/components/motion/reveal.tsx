'use client'

import * as React from 'react'
import { motion, type Variants } from 'motion/react'

import { fadeUp, inView, stagger } from '@/lib/motion'

type Tag = 'div' | 'section' | 'ul' | 'ol' | 'li' | 'span' | 'p' | 'h1' | 'h2' | 'h3' | 'article'

function withDelay(variants: Variants, delay: number): Variants {
  const visible = variants.visible
  if (!delay || !visible || typeof visible !== 'object') return variants
  const transition = (visible as { transition?: object }).transition
  return { ...variants, visible: { ...visible, transition: { ...transition, delay } } }
}

type RevealProps = {
  children?: React.ReactNode
  className?: string
  id?: string
  /** Seconds before the animation starts. */
  delay?: number
  /** Animate on mount instead of on scroll-in. Use above the fold. */
  immediate?: boolean
  variants?: Variants
  as?: Tag
}

function trigger(immediate: boolean) {
  return immediate
    ? { animate: 'visible' as const }
    : { whileInView: 'visible' as const, viewport: inView }
}

/**
 * Fades its children in once, on mount or when scrolled into view.
 * A client island that Server Components can wrap content in.
 */
export function Reveal({ children, className, id, delay = 0, immediate = false, variants = fadeUp, as = 'div' }: RevealProps) {
  const Component = motion[as]
  return (
    <Component id={id} className={className} initial="hidden" {...trigger(immediate)} variants={withDelay(variants, delay)}>
      {children}
    </Component>
  )
}

/** Staggers the entrance of its `<RevealItem>` descendants. */
export function RevealGroup({
  children,
  className,
  id,
  delay = 0,
  immediate = false,
  interval = 0.08,
  as = 'div',
}: Omit<RevealProps, 'variants'> & { interval?: number }) {
  const Component = motion[as]
  return (
    <Component id={id} className={className} initial="hidden" {...trigger(immediate)} variants={stagger(interval, delay)}>
      {children}
    </Component>
  )
}

export function RevealItem({ children, className, id, variants = fadeUp, as = 'div' }: Pick<RevealProps, 'children' | 'className' | 'id' | 'variants' | 'as'>) {
  const Component = motion[as]
  return (
    <Component id={id} className={className} variants={variants}>
      {children}
    </Component>
  )
}
