import * as React from 'react'

import { cn } from '@/lib/utils'

type CardProps = React.HTMLAttributes<HTMLDivElement> & {
  /** Hover lift and border emphasis, for clickable cards. */
  interactive?: boolean
}

/** Base surface for every card on the site. */
export const Card = React.forwardRef<HTMLDivElement, CardProps>(({ className, interactive = false, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      'relative rounded-3xl border border-border bg-card p-6 shadow-sm md:p-8',
      interactive &&
        'transition-[transform,box-shadow,border-color] duration-500 ease-out-expo hover:-translate-y-1 hover:border-foreground/15 hover:shadow-lift',
      className
    )}
    {...props}
  />
))
Card.displayName = 'Card'

/** Rounded square holding an icon. Picks up brand tint on `group` hover. */
export function CardIcon({ className, children }: { className?: string; children: React.ReactNode }) {
  return (
    <div
      className={cn(
        'flex size-11 shrink-0 items-center justify-center rounded-2xl border border-border bg-subtle text-foreground transition-colors duration-300 [&_svg]:size-5',
        'group-hover:border-brand/30 group-hover:bg-brand-soft group-hover:text-brand-ink',
        className
      )}
    >
      {children}
    </div>
  )
}
