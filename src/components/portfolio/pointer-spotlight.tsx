'use client'

import * as React from 'react'

import { cn } from '@/lib/utils'

type PointerSpotlightProps = {
  children: React.ReactNode
  className?: string
}

/**
 * Tracks a mouse pointer and exposes its position to descendants as the
 * `--spot-x` / `--spot-y` CSS variables. Pair with `<Spotlight />` (rendered
 * inside the card) for the visual. Touch and pen input are ignored, and no
 * React state is involved, so moving the pointer never re-renders.
 */
export function PointerSpotlight({ children, className }: PointerSpotlightProps) {
  const onPointerMove = React.useCallback((event: React.PointerEvent<HTMLDivElement>) => {
    if (event.pointerType !== 'mouse') return
    const el = event.currentTarget
    const rect = el.getBoundingClientRect()
    el.style.setProperty('--spot-x', `${event.clientX - rect.left}px`)
    el.style.setProperty('--spot-y', `${event.clientY - rect.top}px`)
  }, [])

  return (
    <div className={cn('h-full', className)} onPointerMove={onPointerMove}>
      {children}
    </div>
  )
}
