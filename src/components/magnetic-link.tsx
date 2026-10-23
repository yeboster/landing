'use client'

import Link from 'next/link'
import { useRef } from 'react'
import { motion, useMotionValue, useReducedMotion, useSpring } from 'motion/react'

import { buttonClasses, type ButtonStyleProps } from '@/components/ui/button'

/** Furthest the button drifts toward the cursor, in px per axis. */
const PULL = 10

type MagneticLinkProps = ButtonStyleProps & {
  href: string
  children: React.ReactNode
}

/**
 * Button-styled internal link that leans toward the cursor.
 *
 * The offset lives in motion values on a wrapper, so pointer movement never
 * re-renders the link, and the wrapper's transform doesn't fight the button's
 * own hover lift. Reduced motion leaves a plain button.
 */
export function MagneticLink({ href, children, variant = 'primary', size = 'lg', className }: MagneticLinkProps) {
  const reduce = useReducedMotion()
  const ref = useRef<HTMLSpanElement>(null)
  const mx = useMotionValue(0)
  const my = useMotionValue(0)
  // Critically damped: it settles without overshooting.
  const x = useSpring(mx, { stiffness: 260, damping: 26, mass: 0.5 })
  const y = useSpring(my, { stiffness: 260, damping: 26, mass: 0.5 })

  function handleMouseMove(e: React.MouseEvent<HTMLSpanElement>) {
    if (reduce || !ref.current) return
    const rect = ref.current.getBoundingClientRect()
    mx.set(((e.clientX - rect.left) / rect.width - 0.5) * 2 * PULL)
    my.set(((e.clientY - rect.top) / rect.height - 0.5) * 2 * PULL)
  }

  function handleMouseLeave() {
    mx.set(0)
    my.set(0)
  }

  return (
    <motion.span
      ref={ref}
      className="inline-flex"
      style={reduce ? undefined : { x, y }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <Link href={href} className={buttonClasses({ variant, size, className })}>
        {children}
      </Link>
    </motion.span>
  )
}
