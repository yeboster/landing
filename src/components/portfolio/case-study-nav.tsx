import Link from 'next/link'
import { ArrowLeft, ArrowRight } from 'lucide-react'

import { Reveal } from '@/components/motion/reveal'
import { Card } from '@/components/ui/card'
import { getCaseStudies, type CaseStudyMeta } from '@/lib/projects'
import { projects } from '@/lib/projects-data'
import { cn } from '@/lib/utils'

/** Case studies in the order the portfolio lists their projects; strays go last, newest first. */
function ordered(): CaseStudyMeta[] {
  const studies = getCaseStudies()
  const rank = (slug: string) => {
    const i = projects.findIndex((project) => project.slug === slug)
    return i === -1 ? projects.length : i
  }
  return [...studies].sort((a, b) => rank(a.slug) - rank(b.slug) || b.date.localeCompare(a.date))
}

function NavCard({ study, direction }: { study: CaseStudyMeta; direction: 'previous' | 'next' }) {
  const next = direction === 'next'
  const Arrow = next ? ArrowRight : ArrowLeft
  return (
    <Link href={`/portfolio/${study.slug}`} rel={direction === 'previous' ? 'prev' : 'next'} className="group block h-full rounded-3xl">
      <Card interactive className={cn('flex h-full flex-col gap-2 p-6 md:p-6', next && 'sm:items-end sm:text-right')}>
        <span className="inline-flex items-center gap-1.5 font-mono text-[11px] font-medium uppercase tracking-[0.14em] text-muted-foreground">
          {!next && <Arrow aria-hidden className="size-3.5 transition-transform duration-300 ease-out-expo group-hover:-translate-x-0.5" />}
          {next ? 'Next case study' : 'Previous case study'}
          {next && <Arrow aria-hidden className="size-3.5 transition-transform duration-300 ease-out-expo group-hover:translate-x-0.5" />}
        </span>
        <span className="text-lg font-semibold tracking-tight transition-colors group-hover:text-brand-ink">{study.title}</span>
        {study.description && <span className="line-clamp-2 text-sm text-muted-foreground">{study.description}</span>}
      </Card>
    </Link>
  )
}

export function CaseStudyNav({ slug }: { slug: string }) {
  const studies = ordered()
  const i = studies.findIndex((study) => study.slug === slug)
  const previous = i > 0 ? studies[i - 1] : undefined
  const next = i >= 0 && i < studies.length - 1 ? studies[i + 1] : undefined
  if (!previous && !next) return null

  return (
    <nav aria-label="More case studies" className="container mt-20 md:mt-28">
      <Reveal className="mx-auto grid max-w-5xl gap-4 sm:grid-cols-2">
        {previous ? <NavCard study={previous} direction="previous" /> : <div aria-hidden className="hidden sm:block" />}
        {next && <NavCard study={next} direction="next" />}
      </Reveal>
    </nav>
  )
}
