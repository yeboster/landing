import { ArrowRight, CalendarDays } from 'lucide-react'

import { Reveal } from '@/components/motion/reveal'
import { ButtonLink } from '@/components/ui/button'
import { Section } from '@/components/ui/section'
import { site } from '@/lib/site'

import { engagementsSentence } from './data'

export function ClosingCta() {
  return (
    <Section aria-labelledby="cta-title">
      <Reveal className="relative mx-auto max-w-3xl overflow-hidden rounded-4xl border border-border bg-card px-6 py-14 text-center shadow-soft md:px-12 md:py-20">
        <div aria-hidden="true" className="bg-grid mask-radial pointer-events-none absolute inset-0" />
        <div aria-hidden="true" className="pointer-events-none absolute -top-24 left-1/2 h-48 w-96 -translate-x-1/2 rounded-full bg-brand/15 blur-3xl" />
        <div className="relative">
          <h2 id="cta-title" className="text-balance text-3xl font-semibold tracking-tight sm:text-4xl md:text-5xl">
            Have a hard problem worth <em className="font-serif font-normal italic">solving</em>?
          </h2>
          <p className="mx-auto mt-5 max-w-lg text-balance leading-relaxed text-muted-foreground md:text-lg">
            I take on {engagementsSentence}. Tell me the outcome you need and I&apos;ll reply within {site.responseTime}.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <ButtonLink href="/contact" variant="brand" size="lg">
              Start a conversation
              <ArrowRight aria-hidden="true" />
            </ButtonLink>
            <ButtonLink href={site.booking} variant="secondary" size="lg">
              <CalendarDays aria-hidden="true" />
              Book a call
            </ButtonLink>
          </div>
        </div>
      </Reveal>
    </Section>
  )
}
