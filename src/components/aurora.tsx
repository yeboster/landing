'use client'

import { useRef } from 'react'
import { motion, useMotionValue, useSpring, useReducedMotion, useTransform, type MotionValue } from 'motion/react'

interface AuroraProps {
  /**
   * The aurora blobs. Each is positioned absolutely and animated with a
   * CSS keyframe ("aurora"). We layer mouse-parallax on top by translating
   * each blob a few px toward the cursor via springs.
   *
   * Pass children that already include the "aurora" CSS class for the
   * float animation.
   */
  children: React.ReactNode
  /** Maximum pixel offset per axis. Defaults to 12. */
  maxOffset?: number
}

/**
 * Wraps aurora hero blobs and applies a soft mouse-parallax by translating
 * each child a few px toward the cursor. Respects prefers-reduced-motion
 * (the parallax is a no-op; the underlying CSS aurora is suppressed by the
 * global reduced-motion media query).
 *
 * Children must include the `aurora` CSS class for the float keyframes.
 */
export function Aurora({ children, maxOffset = 12 }: AuroraProps) {
  const reduce = useReducedMotion()
  const ref = useRef<HTMLDivElement>(null)
  const mx = useMotionValue(0)
  const my = useMotionValue(0)
  const sx = useSpring(mx, { stiffness: 60, damping: 14, mass: 0.6 })
  const sy = useSpring(my, { stiffness: 60, damping: 14, mass: 0.6 })

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (reduce || !ref.current) return
    const r = ref.current.getBoundingClientRect()
    const cx = (e.clientX - r.left) / r.width - 0.5 // -0.5 .. 0.5
    const cy = (e.clientY - r.top) / r.height - 0.5
    mx.set(cx * maxOffset)
    my.set(cy * maxOffset)
  }

  const handleMouseLeave = () => {
    if (reduce) return
    mx.set(0)
    my.set(0)
  }

  return (
    <div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="absolute inset-0 overflow-hidden pointer-events-none"
      aria-hidden="true"
    >
      <ParallaxLayer sx={sx} sy={sy} factor={1}>
        {children}
      </ParallaxLayer>
    </div>
  )
}

/**
 * Translates children by (sx*factor, sy*factor). Used to give each
 * aurora blob a slightly different parallax magnitude for depth.
 */
function ParallaxLayer({
  sx,
  sy,
  factor,
  children,
}: {
  sx: MotionValue<number>
  sy: MotionValue<number>
  factor: number
  children: React.ReactNode
}) {
  const x = useTransform(sx, (v) => v * factor)
  const y = useTransform(sy, (v) => v * factor)
  return (
    <motion.div style={{ x, y }} className="absolute inset-0">
      {children}
    </motion.div>
  )
}
