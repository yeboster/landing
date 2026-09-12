import type { Metadata } from 'next'
import HomeClient from '@/components/home-client'
import { caseStudySlugs } from '@/lib/projects'
import { defaultTitle, site } from '@/lib/site'

export const metadata: Metadata = {
  title: { absolute: defaultTitle },
  description: `${site.pitch} ${site.role} at ${site.company} in ${site.location}.`,
  alternates: { canonical: site.siteUrl },
}

export default function HomePage() {
  return <HomeClient caseStudies={caseStudySlugs()} />
}
