'use client'

import { useRef } from 'react'

import { Aurora } from '@/components/aurora'
import { DotGrid, type DotGridHandle } from '@/components/dot-grid'

/**
 * The hero's `<section>` and its decorative backdrop. A client island only
 * because the dot grid needs pointer coordinates; the content passed in as
 * children is still rendered on the server.
 */
export function HeroStage({ children, labelledBy }: { children: React.ReactNode; labelledBy?: string }) {
  const dotGridRef = useRef<DotGridHandle>(null)

  return (
    <section
      aria-labelledby={labelledBy}
      className="relative isolate w-full overflow-hidden py-24 md:py-32 lg:py-40"
      onMouseMove={(e) => {
        const rect = e.currentTarget.getBoundingClientRect()
        dotGridRef.current?.setPointer(e.clientX - rect.left, e.clientY - rect.top)
      }}
      onMouseLeave={() => dotGridRef.current?.setPointer(null, null)}
    >
      {/* A direct child: Aurora listens for the pointer on its parent element. */}
      <Aurora maxOffset={14} className="-z-10" />
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
        <div className="mask-radial absolute inset-0">
          <DotGrid ref={dotGridRef} />
        </div>
        {/* Melts the backdrop into the page so the next band starts clean. */}
        <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-b from-transparent to-background" />
      </div>
      {children}
    </section>
  )
}
