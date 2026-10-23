import * as React from 'react'

import { Reveal } from '@/components/motion/reveal'
import { Eyebrow } from '@/components/ui/eyebrow'
import { cn } from '@/lib/utils'

type SectionProps = React.HTMLAttributes<HTMLElement> & {
  /** `subtle` tints the background to separate the section from its neighbours. */
  tone?: 'default' | 'subtle'
}

/** Vertical rhythm + centered container for a page section. */
const Section = React.forwardRef<HTMLElement, SectionProps>(({ className, tone = 'default', children, ...props }, ref) => (
  <section
    ref={ref}
    className={cn('relative w-full py-20 md:py-28', tone === 'subtle' && 'border-y border-border bg-subtle', className)}
    {...props}
  >
    <div className="container">{children}</div>
  </section>
))
Section.displayName = 'Section'

type SectionHeaderProps = {
  eyebrow?: string
  title: React.ReactNode
  description?: React.ReactNode
  align?: 'center' | 'left'
  /** Id for the `<h2>`, so the section can point `aria-labelledby` at it. */
  titleId?: string
  /** Rendered beside the text on wide screens, e.g. an "All projects" link. */
  action?: React.ReactNode
  className?: string
}

/** Eyebrow + title + description, with a staggered entrance. */
function SectionHeader({ eyebrow, title, description, align = 'center', titleId, action, className }: SectionHeaderProps) {
  const text = (
    <div className={cn('flex flex-col gap-4', align === 'center' ? 'mx-auto max-w-2xl items-center text-center' : 'max-w-2xl items-start')}>
      {eyebrow && (
        <Reveal>
          <Eyebrow>{eyebrow}</Eyebrow>
        </Reveal>
      )}
      <Reveal delay={0.05}>
        <h2 id={titleId} className="text-3xl font-semibold tracking-tight sm:text-4xl md:text-5xl">
          {title}
        </h2>
      </Reveal>
      {description && (
        <Reveal delay={0.1}>
          <p className="text-base leading-relaxed text-muted-foreground md:text-lg">{description}</p>
        </Reveal>
      )}
    </div>
  )

  if (!action) return <div className={cn('mb-12 md:mb-16', className)}>{text}</div>

  return (
    <div className={cn('mb-12 flex flex-col gap-6 md:mb-16 md:flex-row md:items-end md:justify-between', className)}>
      {text}
      <Reveal delay={0.15} className="shrink-0">
        {action}
      </Reveal>
    </div>
  )
}

export { Section, SectionHeader }
