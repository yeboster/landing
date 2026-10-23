'use client'

import * as React from 'react'

import { cn } from '@/lib/utils'

/**
 * Soft brand-tinted glow that follows the cursor inside its parent.
 * Drop it as the first child of a `relative group` element. Mouse only;
 * no React state, so moving the pointer never re-renders.
 */
export function Spotlight({ className }: { className?: string }) {
  const ref = React.useRef<HTMLDivElement>(null)

  React.useEffect(() => {
    const el = ref.current
    const parent = el?.parentElement
    if (!el || !parent) return

    const onMove = (event: PointerEvent) => {
      if (event.pointerType !== 'mouse') return
      const rect = parent.getBoundingClientRect()
      el.style.setProperty('--spot-x', `${event.clientX - rect.left}px`)
      el.style.setProperty('--spot-y', `${event.clientY - rect.top}px`)
    }

    parent.addEventListener('pointermove', onMove, { passive: true })
    return () => parent.removeEventListener('pointermove', onMove)
  }, [])

  return (
    <div
      ref={ref}
      aria-hidden
      className={cn(
        'pointer-events-none absolute inset-0 rounded-[inherit] opacity-0 transition-opacity duration-500 group-hover:opacity-100',
        className
      )}
      style={{
        background:
          'radial-gradient(420px circle at var(--spot-x, 50%) var(--spot-y, 0%), hsl(var(--brand) / 0.09), transparent 45%)',
      }}
    />
  )
}
