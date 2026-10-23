'use client'

import { useEffect, useRef, useState } from 'react'
import { motion, useMotionValue, useReducedMotion, useSpring } from 'motion/react'

import { cn } from '@/lib/utils'

interface TiltCardProps {
  children: React.ReactNode
  /** Max degrees of rotation per axis. Defaults to 3. */
  maxTilt?: number
  /** CSS perspective for the rotate, in px. Defaults to 900. */
  perspective?: number
  /** Apply the standard card surface (border, background, radius). */
  surface?: boolean
  className?: string
}

const spring = { stiffness: 200, damping: 24, mass: 0.5 }

const clamp = (v: number) => Math.max(-0.5, Math.min(0.5, v))

/**
 * Card with a slight 3D tilt toward a mouse pointer.
 *
 * The perspective is part of the element's own transform
 * (`transformPerspective`), so there is no wrapper and no `preserve-3d`: the
 * whole card, border included, tilts as one flat plane and nothing can
 * z-fight with a background behind it.
 *
 * Pointer position feeds motion values directly, so moving the mouse never
 * re-renders the card. Touch, pen and reduced-motion visitors get a static card.
 */
export function TiltCard({ children, maxTilt = 3, perspective = 900, surface = false, className }: TiltCardProps) {
  const reduce = useReducedMotion()
  const ref = useRef<HTMLDivElement>(null)
  const rect = useRef<DOMRect | null>(null)
  const [finePointer, setFinePointer] = useState(false)

  useEffect(() => {
    const mql = window.matchMedia('(hover: hover) and (pointer: fine)')
    setFinePointer(mql.matches)
    const handler = (e: MediaQueryListEvent) => setFinePointer(e.matches)
    mql.addEventListener('change', handler)
    return () => mql.removeEventListener('change', handler)
  }, [])

  const rotX = useMotionValue(0)
  const rotY = useMotionValue(0)
  const rotateX = useSpring(rotX, spring)
  const rotateY = useSpring(rotY, spring)

  const interactive = !reduce && finePointer

  const handlePointerEnter = (e: React.PointerEvent<HTMLDivElement>) => {
    if (e.pointerType !== 'mouse' || !ref.current) return
    // Measured once per hover rather than on every move.
    rect.current = ref.current.getBoundingClientRect()
  }
  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    const r = rect.current
    if (e.pointerType !== 'mouse' || !r) return
    // Clamped: the cached rect drifts if the page scrolls mid-hover.
    const px = clamp((e.clientX - r.left) / r.width - 0.5)
    const py = clamp((e.clientY - r.top) / r.height - 0.5)
    rotX.set(-py * 2 * maxTilt)
    rotY.set(px * 2 * maxTilt)
  }
  const handlePointerLeave = () => {
    rect.current = null
    rotX.set(0)
    rotY.set(0)
  }

  return (
    <motion.div
      ref={ref}
      onPointerEnter={interactive ? handlePointerEnter : undefined}
      onPointerMove={interactive ? handlePointerMove : undefined}
      onPointerLeave={interactive ? handlePointerLeave : undefined}
      className={cn('relative', surface && 'rounded-3xl border border-border bg-card shadow-sm', className)}
      style={
        interactive
          ? {
              transformPerspective: perspective,
              rotateX,
              rotateY,
              // Motion owns `transform`; a CSS transition on it (e.g. a caller's
              // `transition-all`) would lag every frame and make the tilt judder.
              transitionProperty: 'color, background-color, border-color, box-shadow, opacity',
            }
          : undefined
      }
    >
      {children}
    </motion.div>
  )
}
