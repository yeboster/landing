import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight, ArrowUpRight } from 'lucide-react'

import { Reveal, RevealGroup, RevealItem } from '@/components/motion/reveal'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Section, SectionHeader } from '@/components/ui/section'
import { primaryLink, projects as allProjects, type Project } from '@/content/projects'
import { cn } from '@/lib/utils'

const featuredSlugs = ['meta-names', 'todoist-actions', 'gitops-k8s']

const projects = featuredSlugs
  .map((slug) => allProjects.find((project) => project.slug === slug))
  .filter((project): project is Project & Required<Pick<Project, 'image'>> => Boolean(project?.image))

function externalLink(project: Project) {
  const link = primaryLink(project)
  if (!link) return undefined
  return { href: link.href, label: link.kind === 'live' ? new URL(link.href).hostname : 'GitHub' }
}

function ProjectCard({ project, wide = false }: { project: (typeof projects)[number]; wide?: boolean }) {
  const external = externalLink(project)
  return (
    <Card interactive className="group flex h-full flex-col overflow-hidden p-0 md:p-0">
      {/* Logo tile stays light in both themes: the source logos have white backgrounds. */}
      <div
        aria-hidden
        className={cn(
          'relative isolate flex aspect-[16/10] items-center justify-center overflow-hidden border-b bg-subtle',
          wide && 'md:aspect-[32/10] lg:aspect-[16/10]'
        )}
      >
        <div className="bg-grid mask-radial absolute inset-0 -z-10" />
        <div className="absolute left-1/2 top-1/2 -z-10 size-48 -translate-x-1/2 -translate-y-1/2 rounded-full bg-brand/20 opacity-0 blur-3xl transition-opacity duration-700 group-hover:opacity-100" />
        <div className="isolate flex size-24 items-center justify-center rounded-3xl border bg-card p-3.5 shadow-lift transition-transform duration-700 ease-out-expo group-hover:-translate-y-1 group-hover:scale-[1.04] md:size-28 dark:border-transparent dark:bg-foreground">
          <Image
            src={project.image}
            alt=""
            sizes="112px"
            className="size-full object-contain mix-blend-multiply"
          />
        </div>
      </div>

      <div className="flex flex-1 flex-col p-6 md:p-7">
        <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-muted-foreground">{project.summary}</p>
        <h3 className="mt-3 text-xl font-semibold tracking-tight">
          {/* Stretched link: the whole card navigates to the case study. */}
          <Link
            href={`/portfolio#${project.slug}`}
            className="after:absolute after:inset-0 after:rounded-3xl after:content-[''] focus-visible:ring-0 focus-visible:ring-offset-0 focus-visible:after:ring-2 focus-visible:after:ring-inset focus-visible:after:ring-ring"
          >
            {project.title}
          </Link>
        </h3>
        <p className="mt-3 text-sm leading-relaxed text-muted-foreground md:text-[15px]">{project.description}</p>

        <ul className="mt-5 flex flex-wrap gap-1.5" aria-label="Technologies">
          {project.tags.slice(0, 3).map((tag) => (
            <li
              key={tag}
              className="rounded-full border bg-subtle px-2.5 py-0.5 font-mono text-[11px] text-muted-foreground"
            >
              {tag}
            </li>
          ))}
        </ul>

        <div className="mt-auto flex items-center justify-between gap-4 pt-8 text-sm">
          <span aria-hidden className="inline-flex items-center gap-1.5 font-medium text-foreground">
            Read more
            <ArrowRight className="size-4 transition-transform duration-300 ease-out-expo group-hover:translate-x-0.5" />
          </span>
          {external && (
            <a
              href={external.href}
              target="_blank"
              rel="noopener noreferrer"
              className="relative z-10 -mr-2 inline-flex items-center gap-1 rounded-full px-2 py-1 text-muted-foreground transition-colors duration-300 hover:text-brand"
            >
              {external.label}
              <ArrowUpRight aria-hidden className="size-3.5" />
              <span className="sr-only"> for {project.title} (opens in a new tab)</span>
            </a>
          )}
        </div>
      </div>
    </Card>
  )
}

export function SelectedWork() {
  return (
    <Section tone="subtle" aria-labelledby="work-heading">
      <div className="mb-12 flex flex-col gap-6 md:mb-16 md:flex-row md:items-end md:justify-between">
        <SectionHeader
          align="left"
          eyebrow="Selected work"
          titleId="work-heading"
          title={
            <>
              Things I&apos;ve <em className="font-serif font-normal italic">shipped</em>.
            </>
          }
          description="A few projects spanning Web3, personal automation and cloud infrastructure."
          className="mb-0 md:mb-0"
        />
        <Reveal delay={0.1} className="shrink-0">
          <Button asChild variant="secondary">
            <Link href="/portfolio">
              All projects
              <ArrowRight
                aria-hidden
                className="transition-transform duration-300 group-hover/button:translate-x-0.5"
              />
            </Link>
          </Button>
        </Reveal>
      </div>

      <RevealGroup as="ul" interval={0.1} className="grid gap-4 md:grid-cols-2 md:gap-6 lg:grid-cols-3">
        {projects.map((project, index) => (
          <RevealItem
            as="li"
            key={project.slug}
            className={cn(index === projects.length - 1 && 'md:col-span-2 lg:col-span-1')}
          >
            <ProjectCard project={project} wide={index === projects.length - 1} />
          </RevealItem>
        ))}
      </RevealGroup>
    </Section>
  )
}
