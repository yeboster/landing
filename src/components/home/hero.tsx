import { ArrowRight, FileText } from 'lucide-react'

import { AvailabilityBadge } from '@/components/availability-badge'
import { MagneticLink } from '@/components/magnetic-link'
import { Reveal } from '@/components/motion/reveal'
import { RotatingText } from '@/components/rotating-text'
import { SplitText } from '@/components/split-text'
import { ButtonLink } from '@/components/ui/button'
import { site } from '@/lib/site'

import { city, specialisms } from './data'
import { HeroStage } from './hero-stage'

/** Availability, name, role, pitch, next steps: in that order of weight. */
export function Hero() {
  return (
    <HeroStage labelledBy="hero-title">
      <div className="container flex flex-col items-center text-center">
        <Reveal immediate>
          <AvailabilityBadge />
        </Reveal>

        <h1 id="hero-title" className="mt-8 text-[clamp(2.25rem,10.5vw,6rem)] font-semibold leading-[1.05] tracking-tight text-foreground">
          {/* Solid color: a gradient here faded the last letter out. SplitText adds its own sr-only copy. */}
          <SplitText text={site.person} by="letter" />
        </h1>

        <Reveal immediate delay={0.35}>
          <p className="mt-6 font-mono text-xs uppercase tracking-[0.14em] text-muted-foreground sm:text-sm">
            {site.role} at {site.company} · {city} ·{' '}
            <RotatingText words={specialisms} className="text-brand-ink" />
          </p>
        </Reveal>

        <Reveal immediate delay={0.45}>
          <p className="mt-6 max-w-xl text-balance text-lg leading-relaxed text-muted-foreground md:text-xl">{site.pitch}</p>
        </Reveal>

        <Reveal immediate delay={0.55} className="mt-10 flex flex-wrap items-center justify-center gap-3">
          <MagneticLink href="/portfolio">
            See the work
            <ArrowRight aria-hidden="true" className="transition-transform duration-300 ease-out-expo group-hover/button:translate-x-0.5" />
          </MagneticLink>
          <ButtonLink href="/contact" variant="secondary" size="lg">
            Get in touch
          </ButtonLink>
          <ButtonLink href={site.resumePath} variant="ghost" size="lg">
            <FileText aria-hidden="true" />
            Résumé
          </ButtonLink>
        </Reveal>
      </div>
    </HeroStage>
  )
}
