import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

import { JourneyTimeline } from '@/components/about/journey-timeline'
import { PrinciplesGrid } from '@/components/about/principles-grid'
import { Toolbox } from '@/components/about/toolbox'
import { CtaSection } from '@/components/cta-section'
import { Reveal } from '@/components/motion/reveal'
import { PageHero } from '@/components/page-hero'
import { Button } from '@/components/ui/button'
import { Section, SectionHeader } from '@/components/ui/section'
import { journey, principles, toolbox } from '@/content/about'
import { siteConfig } from '@/lib/site'

export const metadata: Metadata = {
  title: 'About',
  description:
    'Full-stack engineer working across TypeScript, Ruby, Rust and Kubernetes. The journey from tinkering to production systems, the principles behind the work, and the tools of the trade.',
  alternates: { canonical: '/about' },
}

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="About"
        title={
          <>
            Curious by nature, <em className="font-serif font-normal italic">builder</em> by trade.
          </>
        }
        description="I'm a full-stack engineer who enjoys the whole journey, from the first sketch to a system running reliably in production. Here's how I got here and how I like to work."
      />

      <Section id="journey" aria-labelledby="journey-title" className="pt-8 md:pt-12">
        <div className="grid gap-14 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-20">
          <div className="lg:sticky lg:top-28 lg:self-start">
            <SectionHeader
              align="left"
              eyebrow="Story"
              titleId="journey-title"
              title="The journey so far"
              className="mb-8 md:mb-10"
            />
            <Reveal delay={0.15} className="space-y-5 text-base leading-relaxed text-muted-foreground md:text-lg">
              <p>
                I got into software the way many of us do: by taking things apart to see how they work.
                Scripts turned into side projects, side projects turned into production systems, and the
                curiosity never wore off.
              </p>
              <p>
                Today I work across the whole stack, from the interface down to the containers and clusters
                it runs on. Owning every layer means fewer hand-offs, and fewer places for problems to hide.
              </p>
            </Reveal>
            <Reveal delay={0.2}>
              <figure className="mt-10 border-l-2 border-brand pl-5">
                <blockquote className="font-serif text-2xl italic leading-snug text-foreground md:text-3xl">
                  &ldquo;{siteConfig.tagline}.&rdquo;
                </blockquote>
                <figcaption className="mt-3 font-mono text-[11px] uppercase tracking-[0.14em] text-muted-foreground">
                  The idea behind everything I build
                </figcaption>
              </figure>
            </Reveal>
            <Reveal delay={0.25} className="mt-10">
              <Button asChild variant="secondary">
                <Link href="/portfolio">
                  See selected work
                  <ArrowRight className="transition-transform duration-300 group-hover/button:translate-x-0.5" />
                </Link>
              </Button>
            </Reveal>
          </div>

          <JourneyTimeline entries={journey} />
        </div>
      </Section>

      <Section tone="subtle" id="principles" aria-labelledby="principles-title">
        <SectionHeader
          eyebrow="Principles"
          titleId="principles-title"
          title="How I work"
          description="A handful of principles that shape every project, from the first commit to the last deploy."
        />
        <PrinciplesGrid principles={principles} />
      </Section>

      <Section id="toolbox" aria-labelledby="toolbox-title">
        <SectionHeader
          eyebrow="Toolbox"
          titleId="toolbox-title"
          title="Tools of the trade"
          description="The languages and platforms I reach for day to day, grouped by where they sit in the stack."
        />
        <div className="mx-auto max-w-4xl">
          <Toolbox groups={toolbox} />
        </div>
      </Section>

      <CtaSection
        title={
          <>
            Let&apos;s build something <em className="font-serif font-normal italic">together</em>.
          </>
        }
        description="I'm always open to interesting projects, collaborations, or simply a good conversation about software."
        label="Get in touch"
      />
    </>
  )
}
