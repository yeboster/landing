import { ArrowRight } from 'lucide-react'

import { Reveal } from '@/components/motion/reveal'
import { ButtonLink } from '@/components/ui/button'
import { Section } from '@/components/ui/section'
import { site } from '@/lib/site'

export function AboutCta() {
  return (
    <Section tone="subtle" data-print="hide" aria-labelledby="about-cta-title">
      <Reveal className="flex flex-col items-start gap-8 md:flex-row md:items-end md:justify-between">
        <div className="max-w-xl">
          <h2 id="about-cta-title" className="text-3xl font-semibold tracking-tight sm:text-4xl">
            Want to build something together?
          </h2>
          <p className="mt-4 text-lg leading-relaxed text-muted-foreground">
            I&apos;m open to interesting projects, collaborations, or a good conversation about tech. I reply within{' '}
            {site.responseTime}.
          </p>
        </div>
        <div className="flex flex-wrap gap-3">
          <ButtonLink href="/contact" variant="brand" size="lg">
            Get in touch
            <ArrowRight aria-hidden className="transition-transform group-hover/button:translate-x-0.5" />
          </ButtonLink>
          <ButtonLink href={site.booking} variant="secondary" size="lg">
            Book a call
          </ButtonLink>
        </div>
      </Reveal>
    </Section>
  )
}
