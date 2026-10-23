import type { Metadata } from 'next'

import { AboutCta } from '@/components/about/about-cta'
import { AboutHero } from '@/components/about/about-hero'
import { CareerTimeline } from '@/components/about/career-timeline'
import { PrinciplesSection } from '@/components/about/principles-section'
import { PrintMasthead } from '@/components/about/print-masthead'
import { SkillsSection } from '@/components/about/skills-section'
import { site } from '@/lib/site'

export const metadata: Metadata = {
  title: 'About',
  description: `${site.person} — ${site.role} at ${site.company}, Paris. Career history, technical background, and how I work.`,
}

/**
 * Also the printable CV (`site.resumePath`): the masthead only shows on paper,
 * the hero and CTA are `data-print="hide"`. The print variants on <main> pin
 * scroll-reveal content visible, since sections never scrolled into view
 * would otherwise print at opacity 0. `overflow-x-clip` rather than
 * `overflow-hidden`, which would break the sticky career intro.
 */
export default function AboutPage() {
  return (
    <main className="flex-1 overflow-x-clip print:[&_*]:!transform-none print:[&_*]:!opacity-100">
      <PrintMasthead />
      <AboutHero />
      <CareerTimeline />
      <SkillsSection />
      <PrinciplesSection />
      <AboutCta />
    </main>
  )
}
