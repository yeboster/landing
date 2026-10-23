import type { Metadata } from 'next'

import { CtaSection } from '@/components/cta-section'
import { Capabilities } from '@/components/home/capabilities'
import { HomeHero } from '@/components/home/hero'
import { SelectedWork } from '@/components/home/selected-work'
import { TechMarquee } from '@/components/home/tech-marquee'
import { siteConfig } from '@/lib/site'

export const metadata: Metadata = {
  title: { absolute: siteConfig.title },
  description: siteConfig.description,
  alternates: { canonical: '/' },
}

export default function HomePage() {
  return (
    <>
      <HomeHero />
      <TechMarquee />
      <Capabilities />
      <SelectedWork />
      <CtaSection
        title={
          <>
            Let&apos;s build <em className="font-serif font-normal italic">together</em>.
          </>
        }
        description="Have a product to ship or a system to untangle? I'm open to new projects, collaborations and good conversations about software."
        label="Start a conversation"
      />
    </>
  )
}
