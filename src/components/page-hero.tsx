import * as React from 'react'

import { Reveal } from '@/components/motion/reveal'
import { Eyebrow } from '@/components/ui/eyebrow'
import { cn } from '@/lib/utils'

/** Ambient background: dotted grid + slow-drifting brand glow. Purely decorative. */
export function HeroBackdrop({ className }: { className?: string }) {
  return (
    <div aria-hidden className={cn('pointer-events-none absolute inset-0 -z-10 overflow-hidden', className)}>
      <div className="bg-grid mask-radial absolute inset-0" />
      <div className="absolute left-1/2 top-[-10%] h-[520px] w-[820px] -translate-x-1/2 animate-aurora-drift rounded-full bg-brand/20 blur-[120px] dark:bg-brand/15" />
      <div className="absolute right-[10%] top-[30%] h-[280px] w-[380px] animate-aurora-drift rounded-full bg-sky-400/10 blur-[100px] [animation-delay:-6s] dark:bg-sky-400/[0.07]" />
      <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-b from-transparent to-background" />
    </div>
  )
}

type PageHeroProps = {
  eyebrow: string
  title: React.ReactNode
  description?: React.ReactNode
  children?: React.ReactNode
  className?: string
}

/**
 * Hero used at the top of every sub-page. Wrap the key word of `title` in
 * `<span className="text-gradient-brand">` or `<em className="font-serif">`
 * for emphasis.
 */
export function PageHero({ eyebrow, title, description, children, className }: PageHeroProps) {
  return (
    <section className={cn('relative isolate pb-16 pt-24 md:pb-24 md:pt-36', className)}>
      <HeroBackdrop />
      <div className="container flex flex-col items-center text-center">
        <Reveal immediate>
          <Eyebrow>{eyebrow}</Eyebrow>
        </Reveal>
        <Reveal immediate delay={0.08}>
          <h1 className="mt-6 max-w-4xl text-4xl font-semibold tracking-tight sm:text-6xl md:text-7xl">
            {title}
          </h1>
        </Reveal>
        {description && (
          <Reveal immediate delay={0.16}>
            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-muted-foreground md:text-xl">
              {description}
            </p>
          </Reveal>
        )}
        {children && (
          <Reveal immediate delay={0.24} className="mt-10">
            {children}
          </Reveal>
        )}
      </div>
    </section>
  )
}
