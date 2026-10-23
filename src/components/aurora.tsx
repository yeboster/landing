'use client'

import { useEffect, useRef } from 'react'
import { motion, useMotionValue, useReducedMotion, useSpring } from 'motion/react'

import { cn } from '@/lib/utils'

interface AuroraProps {
  /**
   * Custom glow layers. Optional: without children Aurora renders the
   * standard brand glow. Children should carry the `aurora` class to get the
   * slow float keyframes from globals.css.
   */
  children?: React.ReactNode
  /** Maximum parallax offset per axis, in px. Defaults to 12. */
  maxOffset?: number
  className?: string
}

/*
 * Radial gradients rather than `blur-3xl` on solid shapes: same soft glow,
 * but no filter to rasterise, so the float animation stays on the compositor.
 * `inset-x-0 mx-auto` centres the main glow because the `aurora` keyframes
 * own `transform`, which would discard a `-translate-x-1/2`.
 */
function DefaultGlow() {
  return (
    <>
      <div
        className="aurora absolute inset-x-0 -top-48 mx-auto h-[520px] w-[min(880px,140%)] opacity-70 dark:opacity-100"
        style={{ background: 'radial-gradient(closest-side, rgb(var(--brand) / 0.28), transparent)' }}
      />
      <div
        className="aurora absolute -right-40 top-16 h-[360px] w-[480px] opacity-60 [animation-delay:-8s] dark:opacity-90"
        style={{ background: 'radial-gradient(closest-side, rgb(var(--brand-strong) / 0.18), transparent)' }}
      />
    </>
  )
}

/**
 * Soft brand glow behind a hero, drifting a few px toward the pointer.
 *
 * The layer itself ignores the pointer (it sits under the content), so the
 * parallax listens on the parent section instead. Touch and reduced-motion
 * visitors get the static glow; the CSS float is neutralised globally under
 * reduced motion.
 */
export function Aurora({ children, maxOffset = 12, className }: AuroraProps) {
  const reduce = useReducedMotion()
  const ref = useRef<HTMLDivElement>(null)
  const mx = useMotionValue(0)
  const my = useMotionValue(0)
  const x = useSpring(mx, { stiffness: 50, damping: 16, mass: 0.6 })
  const y = useSpring(my, { stiffness: 50, damping: 16, mass: 0.6 })

  useEffect(() => {
    const host = ref.current?.parentElement
    if (reduce || !host || !window.matchMedia('(hover: hover) and (pointer: fine)').matches) return

    let frame = 0
    const onMove = (e: PointerEvent) => {
      if (frame) return
      // One read per frame at most.
      frame = requestAnimationFrame(() => {
        frame = 0
        const r = host.getBoundingClientRect()
        mx.set(((e.clientX - r.left) / r.width - 0.5) * maxOffset)
        my.set(((e.clientY - r.top) / r.height - 0.5) * maxOffset)
      })
    }
    const onLeave = () => {
      mx.set(0)
      my.set(0)
    }
    host.addEventListener('pointermove', onMove, { passive: true })
    host.addEventListener('pointerleave', onLeave)
    return () => {
      cancelAnimationFrame(frame)
      host.removeEventListener('pointermove', onMove)
      host.removeEventListener('pointerleave', onLeave)
    }
  }, [reduce, maxOffset, mx, my])

  return (
    <div ref={ref} aria-hidden="true" className={cn('pointer-events-none absolute inset-0 overflow-hidden', className)}>
      <motion.div style={{ x, y }} className="absolute inset-0">
        {children ?? <DefaultGlow />}
      </motion.div>
    </div>
  )
}
