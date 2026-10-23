import Link from 'next/link'
import { ArrowRight, ArrowUpRight, Code2, Globe } from 'lucide-react'

import { Card } from '@/components/ui/card'
import { projectLinks, type Project, type ProjectLink } from '@/lib/projects-data'
import { cn } from '@/lib/utils'

import { ProjectPreview } from './project-logo'
import { TagList } from './tag-list'

type Target = { href: string; cue: string; external: boolean }

/** Where a click anywhere on the card goes: the case study when there is one, else the project itself. */
function primaryTarget(project: Project, hasCaseStudy: boolean, links: ProjectLink[]): Target {
  if (hasCaseStudy) return { href: `/portfolio/${project.slug}`, cue: 'Read the case study', external: false }
  const main = links.find((link) => link.href === project.href) ?? links[0]
  return { href: main.href, cue: main.label, external: true }
}

const linkIcons = { website: Globe, source: Code2 }

// The title link stretches over the whole card; its outline is drawn inside the
// overlay (the card clips overflow) so keyboard focus frames the whole card.
const stretched =
  "after:absolute after:inset-0 after:z-0 after:rounded-3xl after:content-[''] focus-visible:outline-none focus-visible:after:outline focus-visible:after:outline-2 focus-visible:after:outline-offset-[-3px] focus-visible:after:outline-brand"

/**
 * One project, as a whole-card click target. Secondary links sit above the
 * stretched title link (`relative z-10`) so nothing is nested inside an anchor.
 */
export function ProjectCard({
  project,
  hasCaseStudy,
  featured = false,
  headingLevel = 'h3',
}: {
  project: Project
  hasCaseStudy: boolean
  featured?: boolean
  headingLevel?: 'h2' | 'h3'
}) {
  const links = projectLinks(project)
  const target = primaryTarget(project, hasCaseStudy, links)
  const secondary = links.filter((link) => link.href !== target.href)
  const Heading = headingLevel

  const title = target.external ? (
    <a href={target.href} target="_blank" rel="noopener noreferrer" className={stretched}>
      {project.title}
      <span className="sr-only">, {target.cue.toLowerCase()} (opens in a new tab)</span>
    </a>
  ) : (
    <Link href={target.href} className={stretched}>
      {project.title}
      <span className="sr-only">: read the case study</span>
    </Link>
  )

  return (
    <Card
      interactive
      className={cn(
        'group flex h-full flex-col overflow-hidden p-0 md:p-0',
        featured && 'md:grid md:grid-cols-[minmax(0,1.1fr)_minmax(0,1fr)]'
      )}
    >
      <ProjectPreview project={project} hasCaseStudy={hasCaseStudy} featured={featured} />

      <div className={cn('flex grow flex-col p-6', featured && 'md:justify-center md:p-10')}>
        {featured && (
          <p className="mb-3 font-mono text-[11px] font-medium uppercase tracking-[0.14em] text-muted-foreground">Featured project</p>
        )}
        <Heading className={cn('font-semibold tracking-tight', featured ? 'text-2xl md:text-3xl' : 'text-lg')}>{title}</Heading>
        <p className={cn('mt-2 grow leading-relaxed text-muted-foreground', featured ? 'text-base md:text-lg' : 'text-sm')}>
          {project.description}
        </p>

        <TagList tags={project.tags} className="mt-5" />

        <div className="mt-6 flex flex-wrap items-center gap-x-5 gap-y-2 border-t border-border pt-4 text-sm font-medium">
          {/* Visual cue only: the stretched title link already carries this destination. */}
          <span aria-hidden className={cn('inline-flex items-center gap-1.5', hasCaseStudy ? 'text-brand-ink' : 'text-foreground')}>
            {target.cue}
            {target.external ? (
              <ArrowUpRight className="size-3.5 transition-transform duration-300 ease-out-expo group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            ) : (
              <ArrowRight className="size-3.5 transition-transform duration-300 ease-out-expo group-hover:translate-x-0.5" />
            )}
          </span>
          {secondary.map((link) => {
            const Icon = linkIcons[link.kind]
            return (
              <a
                key={link.href}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="relative z-10 inline-flex items-center gap-1.5 rounded text-muted-foreground transition-colors hover:text-foreground"
              >
                <Icon aria-hidden className="size-3.5" />
                {link.label}
                <span className="sr-only"> for {project.title} (opens in a new tab)</span>
              </a>
            )
          })}
        </div>
      </div>
    </Card>
  )
}
