import type { Metadata } from 'next'

import { ClosingCta } from '@/components/home/closing-cta'
import { Hero } from '@/components/home/hero'
import { Highlights } from '@/components/home/highlights'
import { Manifesto } from '@/components/home/manifesto'
import { NowAndOss } from '@/components/home/now-and-oss'
import { SelectedWork } from '@/components/home/selected-work'
import { TerminalSection } from '@/components/home/terminal-section'
import { caseStudySlugs } from '@/lib/projects'
import { defaultTitle, site } from '@/lib/site'

export const metadata: Metadata = {
  title: { absolute: defaultTitle },
  description: `${site.pitch} ${site.role} at ${site.company} in ${site.location}.`,
  alternates: { canonical: site.siteUrl },
}

/** Evidence comes early: the facts band and selected work sit right under the hero. */
export default function HomePage() {
  return (
    <main className="flex-1 overflow-hidden">
      <Hero />
      <Highlights />
      <SelectedWork caseStudies={caseStudySlugs()} />
      <Manifesto />
      <NowAndOss />
      <TerminalSection />
      <ClosingCta />
    </main>
  )
}
