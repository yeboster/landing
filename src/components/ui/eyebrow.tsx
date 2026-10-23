import * as React from 'react'

import { cn } from '@/lib/utils'

/** Small label above a heading, e.g. "Selected work". Replaces the old Chip. */
export function Eyebrow({ className, children, ...props }: React.HTMLAttributes<HTMLSpanElement>) {
  return (
    <span
      className={cn(
        'inline-flex items-center gap-2 rounded-full border border-border bg-card/60 px-3 py-1 font-mono text-[11px] font-medium uppercase tracking-[0.14em] text-muted-foreground backdrop-blur',
        className
      )}
      {...props}
    >
      <span aria-hidden className="size-1.5 rounded-full bg-brand" />
      {children}
    </span>
  )
}
