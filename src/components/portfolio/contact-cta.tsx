import { ArrowRight, CalendarDays } from 'lucide-react'

import { Reveal } from '@/components/motion/reveal'
import { ButtonLink } from '@/components/ui/button'
import { Section } from '@/components/ui/section'
import { site } from '@/lib/site'

/** Closing call to action for the work pages. */
export function ContactCta({ title = 'Have a project in mind?' }: { title?: string }) {
  return (
    <Section aria-labelledby="contact-cta-title">
      <Reveal className="relative mx-auto max-w-3xl overflow-hidden rounded-4xl border border-border bg-card px-6 py-14 text-center shadow-soft md:px-12 md:py-16">
        <div aria-hidden className="bg-grid mask-radial pointer-events-none absolute inset-0" />
        <div className="relative">
          <h2 id="contact-cta-title" className="text-3xl font-semibold tracking-tight sm:text-4xl">
            {title}
          </h2>
          <p className="mx-auto mt-4 max-w-lg text-muted-foreground md:text-lg">{site.availability.detail}</p>
          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <ButtonLink href="/contact" variant="brand" size="lg">
              Get in touch
              <ArrowRight aria-hidden className="transition-transform duration-300 group-hover/button:translate-x-0.5" />
            </ButtonLink>
            <ButtonLink href={site.booking} variant="secondary" size="lg">
              <CalendarDays aria-hidden />
              Book a call
            </ButtonLink>
          </div>
        </div>
      </Reveal>
    </Section>
  )
}
