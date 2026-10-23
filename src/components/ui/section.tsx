import * as React from 'react'

import { Reveal } from '@/components/motion/reveal'
import { Eyebrow } from '@/components/ui/eyebrow'
import { cn } from '@/lib/utils'

type SectionProps = React.HTMLAttributes<HTMLElement> & {
  /** `subtle` gives the section a tinted background to separate it from neighbours. */
  tone?: 'default' | 'subtle'
}

const Section = React.forwardRef<HTMLElement, SectionProps>(
  ({ className, tone = 'default', children, ...props }, ref) => (
    <section
      ref={ref}
      className={cn(
        'relative w-full py-20 md:py-28',
        tone === 'subtle' && 'border-y bg-subtle',
        className
      )}
      {...props}
    >
      <div className="container">{children}</div>
    </section>
  )
)
Section.displayName = 'Section'

type SectionHeaderProps = {
  eyebrow?: string
  title: React.ReactNode
  description?: React.ReactNode
  align?: 'center' | 'left'
  /** Id for the `<h2>`, so the enclosing section can use `aria-labelledby`. */
  titleId?: string
  className?: string
}

/** Eyebrow + title + description with a staggered entrance. */
function SectionHeader({ eyebrow, title, description, align = 'center', titleId, className }: SectionHeaderProps) {
  return (
    <div
      className={cn(
        'mb-12 flex flex-col gap-4 md:mb-16',
        align === 'center' ? 'mx-auto max-w-2xl items-center text-center' : 'max-w-2xl items-start',
        className
      )}
    >
      {eyebrow && (
        <Reveal>
          <Eyebrow>{eyebrow}</Eyebrow>
        </Reveal>
      )}
      <Reveal delay={0.05}>
        <h2 id={titleId} className="text-3xl font-semibold tracking-tight sm:text-4xl md:text-5xl">{title}</h2>
      </Reveal>
      {description && (
        <Reveal delay={0.1}>
          <p className="text-base leading-relaxed text-muted-foreground md:text-lg">{description}</p>
        </Reveal>
      )}
    </div>
  )
}

export { Section, SectionHeader }
