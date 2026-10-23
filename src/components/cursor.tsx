'use client'

import { useEffect, useState } from 'react'
import { motion, useMotionValue, useReducedMotion, useSpring } from 'motion/react'

const HOVER_TARGET_SELECTOR = 'a, button, [role="button"], [role="option"], input, textarea, select, label, summary, [data-cursor]'

/**
 * Accent dot + trailing ring that reacts to interactive elements.
 * Desktop only: gated on prefers-reduced-motion and a fine pointer
 * with hover support, so touch devices never mount the DOM nodes or
 * lose their native cursor.
 */
export function Cursor() {
  const reduce = useReducedMotion()
  const [enabled, setEnabled] = useState(false)
  const [visible, setVisible] = useState(false)
  const [hovering, setHovering] = useState(false)
  const [pressing, setPressing] = useState(false)

  const x = useMotionValue(-100)
  const y = useMotionValue(-100)
  const ringX = useSpring(x, { stiffness: 250, damping: 22, mass: 0.6 })
  const ringY = useSpring(y, { stiffness: 250, damping: 22, mass: 0.6 })

  useEffect(() => {
    if (reduce) {
      setEnabled(false)
      return
    }
    const mq = window.matchMedia('(hover: hover) and (pointer: fine)')
    setEnabled(mq.matches)
    const listener = (e: MediaQueryListEvent) => setEnabled(e.matches)
    mq.addEventListener('change', listener)
    return () => mq.removeEventListener('change', listener)
  }, [reduce])

  useEffect(() => {
    if (!enabled) return

    document.documentElement.classList.add('custom-cursor')

    function handleMouseMove(e: MouseEvent) {
      x.set(e.clientX)
      y.set(e.clientY)
      setVisible(true)
    }
    function handleDocumentMouseLeave() {
      setVisible(false)
    }
    // `mouseover` fires for every element entered, so it alone tracks the
    // hover target; pairing it with `mouseout` flickered between a link and
    // its own children.
    function handleMouseOver(e: MouseEvent) {
      setHovering(Boolean((e.target as Element | null)?.closest?.(HOVER_TARGET_SELECTOR)))
    }
    function handleMouseDown() {
      setPressing(true)
    }
    function handleMouseUp() {
      setPressing(false)
    }

    window.addEventListener('mousemove', handleMouseMove)
    document.addEventListener('mouseleave', handleDocumentMouseLeave)
    document.addEventListener('mouseover', handleMouseOver)
    window.addEventListener('mousedown', handleMouseDown)
    window.addEventListener('mouseup', handleMouseUp)

    return () => {
      document.documentElement.classList.remove('custom-cursor')
      window.removeEventListener('mousemove', handleMouseMove)
      document.removeEventListener('mouseleave', handleDocumentMouseLeave)
      document.removeEventListener('mouseover', handleMouseOver)
      window.removeEventListener('mousedown', handleMouseDown)
      window.removeEventListener('mouseup', handleMouseUp)
    }
  }, [enabled, x, y])

  if (reduce || !enabled) return null

  return (
    <>
      <motion.div
        aria-hidden="true"
        className="pointer-events-none fixed left-0 top-0 z-[300] h-2 w-2 rounded-full bg-brand"
        style={{ x, y, translateX: '-50%', translateY: '-50%' }}
        animate={{ opacity: visible ? 1 : 0, scale: hovering ? 0.5 : 1 }}
        transition={{ duration: 0.15 }}
      />
      <motion.div
        aria-hidden="true"
        className="pointer-events-none fixed left-0 top-0 z-[300] h-8 w-8 rounded-full border border-brand/50"
        style={{ x: ringX, y: ringY, translateX: '-50%', translateY: '-50%' }}
        animate={{ opacity: visible ? 1 : 0, scale: pressing ? 0.85 : hovering ? 1.6 : 1 }}
        transition={{ type: 'spring', stiffness: 250, damping: 22, mass: 0.6 }}
      />
    </>
  )
}
