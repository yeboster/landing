import type { Metadata } from 'next'

import { Reveal, RevealGroup, RevealItem } from '@/components/motion/reveal'
import { ContactCta } from '@/components/portfolio/contact-cta'
import { PortfolioHero } from '@/components/portfolio/portfolio-hero'
import { CaseStudyBadge } from '@/components/portfolio/project-logo'
import { ProjectCard } from '@/components/portfolio/project-card'
import { ProfileLinks } from '@/components/portfolio/profile-links'
import { StackGrid } from '@/components/portfolio/stack-grid'
import { Section, SectionHeader } from '@/components/ui/section'
import { caseStudySlugs } from '@/lib/projects'
import { projects } from '@/lib/projects-data'
import { site, siteUrl } from '@/lib/site'

export const metadata: Metadata = {
  title: 'Work',
  description: `${site.person}'s projects and case studies: Rust smart contracts, TypeScript, and a GitOps Kubernetes cluster.`,
  alternates: { canonical: `${siteUrl}/portfolio` },
}

export default function PortfolioPage() {
  const caseStudies = new Set(caseStudySlugs())
  const featured = projects.find((project) => project.featured)
  const rest = projects.filter((project) => project !== featured)
  const caseStudyCount = projects.filter((project) => caseStudies.has(project.slug)).length

  return (
    <main className="flex-1 overflow-hidden">
      <PortfolioHero projectCount={projects.length} caseStudyCount={caseStudyCount} />

      <section aria-labelledby="projects-title" className="pb-20 md:pb-28">
        <div className="container">
          <div className="mx-auto max-w-5xl">
            <Reveal className="mb-6 flex flex-wrap items-center justify-between gap-3">
              <h2 id="projects-title" className="font-mono text-xs font-medium uppercase tracking-[0.14em] text-muted-foreground">
                Projects
              </h2>
              <p className="flex items-center gap-2 text-xs text-muted-foreground">
                <CaseStudyBadge />
                <span>has a written case study</span>
              </p>
            </Reveal>

            {featured && (
              <Reveal className="mb-6">
                <ProjectCard project={featured} hasCaseStudy={caseStudies.has(featured.slug)} featured />
              </Reveal>
            )}

            <RevealGroup as="ul" className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {rest.map((project) => (
                <RevealItem as="li" key={project.slug}>
                  <ProjectCard project={project} hasCaseStudy={caseStudies.has(project.slug)} />
                </RevealItem>
              ))}
            </RevealGroup>
          </div>
        </div>
      </section>

      <Section tone="subtle" aria-labelledby="stack-title">
        <SectionHeader eyebrow="Stack" title="What I work with" titleId="stack-title" />
        <StackGrid />
      </Section>

      <Section aria-labelledby="profiles-title" className="pb-0 md:pb-0">
        <SectionHeader eyebrow="Profiles" title="Find me online" titleId="profiles-title" />
        <ProfileLinks />
      </Section>

      <ContactCta />
    </main>
  )
}
