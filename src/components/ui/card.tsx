import * as React from 'react'
import { Slot } from '@radix-ui/react-slot'

import { cn } from '@/lib/utils'

type CardProps = React.HTMLAttributes<HTMLDivElement> & {
  /** Adds hover lift + border emphasis. Use for clickable cards. */
  interactive?: boolean
  /** Render the single child (e.g. an `<a>` or `<Link>`) with card styles instead of a div. */
  asChild?: boolean
}

/** Base surface used for every card on the site. */
const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ className, interactive = false, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : 'div'
    return (
      <Comp
        ref={ref}
        className={cn(
          'relative rounded-3xl border bg-card p-6 shadow-sm md:p-8',
          interactive &&
            'transition-all duration-500 ease-out-expo hover:-translate-y-1 hover:border-foreground/15 hover:shadow-lift',
          className
        )}
        {...props}
      />
    )
  }
)
Card.displayName = 'Card'

/** Rounded square holding an icon at the top of a card. */
function CardIcon({ className, children }: { className?: string; children: React.ReactNode }) {
  return (
    <div
      className={cn(
        'flex size-11 items-center justify-center rounded-2xl border bg-subtle text-foreground transition-colors duration-300 [&_svg]:size-5',
        'group-hover:border-brand/30 group-hover:bg-brand-soft group-hover:text-brand',
        className
      )}
    >
      {children}
    </div>
  )
}

export { Card, CardIcon }
