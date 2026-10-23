import { ArrowRight } from 'lucide-react'

import { AvailabilityBadge } from '@/components/availability-badge'
import { RevealGroup, RevealItem } from '@/components/motion/reveal'
import { ButtonLink } from '@/components/ui/button'
import { Eyebrow } from '@/components/ui/eyebrow'
import { scaleIn } from '@/lib/motion'
import { site } from '@/lib/site'

import { HeroGlow } from './hero-glow'
import { PrintButton } from './print-button'

const facts = [
  { label: 'Currently', value: `${site.role}, ${site.company}` },
  { label: 'Based in', value: `${site.location} (${site.timezone})` },
  { label: 'Replies within', value: site.responseTime },
]

export function AboutHero() {
  return (
    <section data-print="hide" aria-labelledby="about-title" className="relative overflow-hidden pb-16 pt-16 md:pb-24 md:pt-24">
      <HeroGlow />

      <div className="container relative grid gap-12 lg:grid-cols-[minmax(0,1fr)_380px] lg:items-end lg:gap-16">
        <RevealGroup immediate interval={0.06} className="max-w-2xl">
          <RevealItem>
            <Eyebrow>About</Eyebrow>
          </RevealItem>
          <RevealItem as="h1" id="about-title" className="mt-6 text-4xl font-semibold tracking-tight sm:text-5xl md:text-6xl">
            Engineer, tinkerer, lifelong <em className="font-serif font-normal italic text-brand-ink">learner</em>.
          </RevealItem>
          <RevealItem as="p" className="mt-6 text-lg leading-relaxed text-muted-foreground md:text-xl">
            I&apos;m {site.person}, a {site.role.toLowerCase()} at {site.company}. {site.pitch} Outside work I keep
            building: a GitOps home cluster, AI automation agents, and this site.
          </RevealItem>
          <RevealItem className="mt-8 flex flex-wrap items-center gap-3">
            <ButtonLink href="/contact" variant="primary">
              Get in touch
              <ArrowRight aria-hidden className="transition-transform group-hover/button:translate-x-0.5" />
            </ButtonLink>
            <PrintButton />
            <ButtonLink href={site.socials.linkedin} variant="ghost">
              LinkedIn
            </ButtonLink>
          </RevealItem>
        </RevealGroup>

        <RevealGroup immediate delay={0.15} interval={0.05} className="lg:pb-2">
          <RevealItem variants={scaleIn} className="rounded-3xl border border-border bg-card/80 p-6 shadow-soft backdrop-blur">
            <AvailabilityBadge />
            <dl className="mt-6 divide-y divide-border text-sm">
              {facts.map((fact) => (
                <div key={fact.label} className="flex items-baseline justify-between gap-4 py-3 first:pt-0 last:pb-0">
                  <dt className="font-mono text-[11px] uppercase tracking-[0.14em] text-muted-foreground">{fact.label}</dt>
                  <dd className="text-right font-medium">{fact.value}</dd>
                </div>
              ))}
              <div className="py-3 last:pb-0">
                <dt className="font-mono text-[11px] uppercase tracking-[0.14em] text-muted-foreground">Open to</dt>
                <dd className="mt-2">
                  <ul className="flex flex-col gap-1.5">
                    {site.engagements.map((item) => (
                      <li key={item} className="flex items-center gap-2 font-medium">
                        <span aria-hidden className="size-1 rounded-full bg-brand" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </dd>
              </div>
            </dl>
          </RevealItem>
        </RevealGroup>
      </div>
    </section>
  )
}
