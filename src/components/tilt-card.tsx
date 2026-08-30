'use client'

import { useEffect, useRef, useState } from 'react'
import { motion, useMotionValue, useSpring, useReducedMotion } from 'motion/react'

interface TiltCardProps {
  children: React.ReactNode
  /** Max degrees of rotation per axis. Defaults to 4. */
  maxTilt?: number
  /** CSS perspective for the rotate. Defaults to 800. */
  perspective?: number
  className?: string
}

/**
 * Card with a 3D tilt: rotateX/rotateY driven by cursor position, springs
 * for a soft, tactile feel.
 *
 * Cursor position feeds motion values directly — no React state per
 * mousemove, so hovering never re-renders the card subtree.
 *
 * Reduced-motion: returns a non-interactive static card.
 * Touch devices (no `(hover: hover)`): also non-interactive.
 */
export function TiltCard({
  children,
  maxTilt = 4,
  perspective = 800,
  className = '',
}: TiltCardProps) {
  const reduce = useReducedMotion()
  const ref = useRef<HTMLDivElement>(null)
  const [hoverable, setHoverable] = useState(false)

  // Detect coarse / no-hover devices up front.
  useEffect(() => {
    const mql = window.matchMedia('(hover: hover)')
    setHoverable(mql.matches)
    const handler = (e: MediaQueryListEvent) => setHoverable(e.matches)
    mql.addEventListener('change', handler)
    return () => mql.removeEventListener('change', handler)
  }, [])

  const rotX = useMotionValue(0)
  const rotY = useMotionValue(0)
  const sRotX = useSpring(rotX, { stiffness: 220, damping: 22, mass: 0.4 })
  const sRotY = useSpring(rotY, { stiffness: 220, damping: 22, mass: 0.4 })

  const interactive = !reduce && hoverable

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!interactive || !ref.current) return
    const r = ref.current.getBoundingClientRect()
    const px = (e.clientX - r.left) / r.width - 0.5 // -0.5 .. 0.5
    const py = (e.clientY - r.top) / r.height - 0.5
    rotX.set(-py * 2 * maxTilt)
    rotY.set(px * 2 * maxTilt)
  }
  const handleMouseLeave = () => {
    rotX.set(0)
    rotY.set(0)
  }

  return (
    <motion.div
      ref={ref}
      onMouseMove={interactive ? handleMouseMove : undefined}
      onMouseLeave={interactive ? handleMouseLeave : undefined}
      className={`relative ${className}`}
      style={{ perspective, transformStyle: 'preserve-3d' }}
    >
      <motion.div
        style={{ rotateX: interactive ? sRotX : 0, rotateY: interactive ? sRotY : 0 }}
      >
        {children}
      </motion.div>
    </motion.div>
  )
}
