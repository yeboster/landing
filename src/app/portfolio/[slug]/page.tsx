import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { ArrowLeft } from 'lucide-react'

import { Reveal } from '@/components/motion/reveal'
import { CaseStudyMeta } from '@/components/portfolio/case-study-meta'
import { CaseStudyNav } from '@/components/portfolio/case-study-nav'
import { ContactCta } from '@/components/portfolio/contact-cta'
import { ProjectLogo } from '@/components/portfolio/project-logo'
import { Eyebrow } from '@/components/ui/eyebrow'
import { TableOfContents, TableOfContentsDisclosure, TOC_MIN_HEADINGS } from '@/components/writing/table-of-contents'
import { headings, Markdown } from '@/lib/markdown'
import { getCaseStudies, getCaseStudy } from '@/lib/projects'
import { getProject } from '@/lib/projects-data'
import { siteUrl } from '@/lib/site'

type Props = { params: Promise<{ slug: string }> }

export function generateStaticParams() {
  return getCaseStudies().map((study) => ({ slug: study.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const study = getCaseStudy(slug)
  if (!study) return {}

  return {
    title: study.title,
    description: study.description,
    alternates: { canonical: `${siteUrl}/portfolio/${study.slug}` },
    openGraph: {
      type: 'article',
      title: study.title,
      description: study.description,
      url: `${siteUrl}/portfolio/${study.slug}`,
      publishedTime: study.date,
      tags: study.tags,
    },
  }
}

export default async function CaseStudyPage({ params }: Props) {
  const { slug } = await params
  const study = getCaseStudy(slug)
  if (!study) notFound()

  // A case study usually has a matching card, but the page must not depend on it.
  const project = getProject(slug)
  const outline = headings(study.content)
  const toc = outline.length >= TOC_MIN_HEADINGS ? outline : null

  return (
    <main className="flex-1">
      <article className="container pt-12 md:pt-20">
        <header className="mx-auto max-w-5xl">
          <Reveal immediate>
            <Link
              href="/portfolio"
              className="inline-flex items-center gap-2 rounded text-sm text-muted-foreground transition-colors hover:text-foreground"
            >
              <ArrowLeft aria-hidden className="size-4" />
              All work
            </Link>
          </Reveal>

          <div className="mt-10 flex flex-col-reverse gap-8 md:flex-row md:items-end md:justify-between">
            <div className="max-w-3xl">
              <Reveal immediate delay={0.05}>
                <Eyebrow>Case study</Eyebrow>
              </Reveal>
              <Reveal immediate delay={0.1}>
                <h1 className="mt-5 text-4xl font-semibold tracking-tight sm:text-5xl md:text-6xl">{study.title}</h1>
              </Reveal>
              {study.description && (
                <Reveal immediate delay={0.15}>
                  <p className="mt-5 text-lg leading-relaxed text-muted-foreground md:text-xl">{study.description}</p>
                </Reveal>
              )}
            </div>
            {project && (
              <Reveal immediate delay={0.2} className="shrink-0">
                <ProjectLogo project={project} size="md" />
              </Reveal>
            )}
          </div>
        </header>

        <div className="mx-auto mt-12 grid max-w-5xl gap-10 border-t border-border pt-10 md:mt-16 md:pt-14 lg:grid-cols-[minmax(0,1fr)_17rem] lg:gap-16">
          <aside className="lg:order-last">
            <Reveal immediate delay={0.25} className="lg:sticky lg:top-24">
              <CaseStudyMeta study={study} project={project} />
              {toc && <TableOfContents items={toc} className="mt-10 hidden lg:block" />}
            </Reveal>
          </aside>

          {/* ~65ch at the body size: the measure stays readable on any screen. */}
          <Reveal immediate delay={0.3} className="min-w-0 max-w-2xl">
            {toc && <TableOfContentsDisclosure items={toc} className="mb-10 lg:hidden" />}
            <Markdown source={study.content} />
          </Reveal>
        </div>
      </article>

      <CaseStudyNav slug={study.slug} />
      <ContactCta title="Want something built like this?" />
    </main>
  )
}
