'use client'

import { useEffect, useRef, useState } from 'react'
import { motion, useMotionValue, useSpring, useReducedMotion, type MotionValue } from 'motion/react'

interface TiltCardProps {
  children: React.ReactNode
  /** Max degrees of rotation per axis. Defaults to 4. */
  maxTilt?: number
  /** CSS perspective for the rotate. Defaults to 800. */
  perspective?: number
  /** Inner element gets a subtle scale on hover. Defaults to true. */
  scaleOnHover?: boolean
  /** Spotlight color CSS variable values. Defaults to violet accent @ ~12%. */
  spotlightOpacity?: number
  className?: string
}

/**
 * Card with:
 *  - Spotlight glow that follows the cursor (via CSS custom props on the
 *    same element, so the CSS pseudo-element glow stays accurate).
 *  - 3D tilt: rotateX/rotateY driven by cursor position, springs for
 *    a soft, tactile feel.
 *  - Optional inner scale (1.02) on hover.
 *
 * Handlers are attached to the card itself (not an opaque wrapper) so the
 * spotlight CSS reads the correct --spotlight-x/y coordinates.
 *
 * Reduced-motion: returns a non-interactive static card.
 * Touch devices (no `(hover: hover)`): also non-interactive.
 */
export function TiltCard({
  children,
  maxTilt = 4,
  perspective = 800,
  scaleOnHover = true,
  spotlightOpacity = 0.12,
  className = '',
}: TiltCardProps) {
  const reduce = useReducedMotion()
  const ref = useRef<HTMLDivElement>(null)
  const [hoverable, setHoverable] = useState(false)

  // Detect coarse / no-hover devices up front.
  useEffect(() => {
    if (typeof window === 'undefined') return
    const mql = window.matchMedia('(hover: hover)')
    setHoverable(mql.matches)
    const handler = (e: MediaQueryListEvent) => setHoverable(e.matches)
    mql.addEventListener('change', handler)
    return () => mql.removeEventListener('change', handler)
  }, [])

  const [spot, setSpot] = useState({ x: 50, y: 50 })
  const rotX = useMotionValue(0)
  const rotY = useMotionValue(0)
  const sRotX = useSpring(rotX, { stiffness: 220, damping: 22, mass: 0.4 })
  const sRotY = useSpring(rotY, { stiffness: 220, damping: 22, mass: 0.4 })

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (reduce || !hoverable || !ref.current) return
    const r = ref.current.getBoundingClientRect()
    const px = (e.clientX - r.left) / r.width - 0.5 // -0.5 .. 0.5
    const py = (e.clientY - r.top) / r.height - 0.5
    setSpot({ x: (px + 0.5) * 100, y: (py + 0.5) * 100 })
    rotX.set(-py * 2 * maxTilt)
    rotY.set(px * 2 * maxTilt)
  }
  const handleMouseLeave = () => {
    if (reduce) return
    setSpot({ x: 50, y: 50 })
    rotX.set(0)
    rotY.set(0)
  }

  // When reduced motion or touch: no tilt, no spotlight tracking needed.
  // We still allow the spotlight CSS to default to center via class.
  const interactive = !reduce && hoverable

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={`spotlight-card relative ${className}`}
      style={
        {
          perspective,
          transformStyle: 'preserve-3d',
          '--spotlight-x': `${spot.x}%`,
          '--spotlight-y': `${spot.y}%`,
          '--spotlight-opacity': `${spotlightOpacity}`,
        } as React.CSSProperties
      }
    >
      <motion.div
        style={{ rotateX: interactive ? (sRotX as unknown as MotionValue<number>) : 0, rotateY: interactive ? (sRotY as unknown as MotionValue<number>) : 0 }}
        className={interactive && scaleOnHover ? 'tilt-inner' : ''}
      >
        {children}
      </motion.div>
    </motion.div>
  )
}
