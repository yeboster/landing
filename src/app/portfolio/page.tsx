import type { Metadata } from 'next'
import { ArrowUpRight, Code2, Github, Gitlab, Server, Terminal } from 'lucide-react'

import { CtaSection } from '@/components/cta-section'
import { RevealGroup, RevealItem } from '@/components/motion/reveal'
import { PageHero } from '@/components/page-hero'
import { ProjectCard, type ProjectCardLayout } from '@/components/portfolio/project-card'
import { Card, CardIcon } from '@/components/ui/card'
import { Section, SectionHeader } from '@/components/ui/section'
import { projects, type Project } from '@/content/projects'
import { socialLinks } from '@/lib/site'
import { cn } from '@/lib/utils'

export const metadata: Metadata = {
  title: 'Work',
  description:
    'Selected projects by Yeboster: a Web3 naming service on Partisia Blockchain, workflow automation, a GitOps-run Kubernetes homelab and more.',
  alternates: { canonical: '/portfolio' },
}

const stack = [
  {
    icon: Code2,
    title: 'TypeScript',
    description: 'Typed, component-driven interfaces and full-stack web apps.',
    tags: ['React', 'Next.js', 'Vue', 'Svelte'],
  },
  {
    icon: Terminal,
    title: 'Ruby',
    description: 'Rails back-ends, lean APIs and dependable background processing.',
    tags: ['Rails 5–7', 'Roda', 'Sidekiq'],
  },
  {
    icon: Server,
    title: 'DevOps',
    description: 'Containers, clusters, cloud and the pipelines that ship them.',
    tags: ['Docker', 'Kubernetes', 'AWS', 'CI/CD'],
  },
] as const

const profiles = [
  {
    ...socialLinks.github,
    icon: Github,
    description: 'Current projects, experiments and open-source work.',
  },
  {
    ...socialLinks.gitlab,
    icon: Gitlab,
    description: 'An archive of earlier projects, from before the move to GitHub.',
  },
] as const

/** Featured projects first; an odd trailing card stretches across the tablet two-column grid. */
function arrangeProjects(list: Project[]): { project: Project; layout: ProjectCardLayout }[] {
  const featured = list.filter((p) => p.featured)
  const rest = list.filter((p) => !p.featured)
  return [
    ...featured.map((project) => ({ project, layout: 'featured' as const })),
    ...rest.map((project, i) => ({
      project,
      layout: rest.length % 2 === 1 && i === rest.length - 1 ? ('wide' as const) : ('default' as const),
    })),
  ]
}

const itemSpan: Record<ProjectCardLayout, string> = {
  featured: 'md:col-span-2 lg:col-span-3',
  wide: 'md:col-span-2 lg:col-span-1',
  default: '',
}

export default function PortfolioPage() {
  const arranged = arrangeProjects(projects)

  return (
    <>
      <PageHero
        eyebrow="Selected work"
        title={
          <>
            Things I&apos;ve <em className="font-serif font-normal italic">built</em>
          </>
        }
        description="From Rust smart contracts on Partisia Blockchain to a Kubernetes homelab run through GitOps: a selection of projects and the stack behind them."
      />

      {/* Projects */}
      <Section aria-labelledby="projects-heading" className="pt-0 md:pt-0">
        <div className="mb-8 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h2 id="projects-heading" className="text-2xl font-semibold tracking-tight md:text-3xl">
              Projects
            </h2>
            <p className="mt-2 text-sm text-muted-foreground md:text-base">
              Products, developer tooling and infrastructure.
            </p>
          </div>
          <a
            href={socialLinks.github.href}
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center gap-1.5 rounded-sm text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
          >
            All repositories on GitHub
            <ArrowUpRight
              aria-hidden
              className="size-4 transition-transform duration-300 ease-out-expo group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
            />
            <span className="sr-only"> (opens in new tab)</span>
          </a>
        </div>

        <RevealGroup as="div" className="grid gap-5 md:grid-cols-2 lg:grid-cols-3" interval={0.1}>
          {arranged.map(({ project, layout }) => (
            <RevealItem key={project.slug} className={cn('h-full', itemSpan[layout])}>
              <ProjectCard project={project} layout={layout} />
            </RevealItem>
          ))}
        </RevealGroup>
      </Section>

      {/* Stack */}
      <Section tone="subtle" aria-labelledby="stack-heading">
        <SectionHeader
          eyebrow="Stack"
          titleId="stack-heading"
          title="What I work with"
          description="The tools I reach for, from the interface down to the cluster."
        />
        <RevealGroup className="mx-auto grid max-w-5xl gap-5 md:grid-cols-3">
          {stack.map(({ icon: Icon, title, description, tags }) => (
            <RevealItem key={title} className="h-full">
              <Card className="group flex h-full flex-col p-6 md:p-7">
                <CardIcon>
                  <Icon aria-hidden />
                </CardIcon>
                <h3 className="mt-5 text-lg font-semibold tracking-tight">{title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{description}</p>
                <ul className="mt-auto flex flex-wrap gap-1.5 pt-5" aria-label={`${title} tools`}>
                  {tags.map((tag) => (
                    <li
                      key={tag}
                      className="rounded-md border bg-subtle px-2 py-0.5 font-mono text-[11px] text-muted-foreground"
                    >
                      {tag}
                    </li>
                  ))}
                </ul>
              </Card>
            </RevealItem>
          ))}
        </RevealGroup>
      </Section>

      {/* Profiles */}
      <Section aria-labelledby="profiles-heading">
        <SectionHeader
          eyebrow="Profiles"
          titleId="profiles-heading"
          title="Browse the code"
          description="Repositories, side projects and the occasional experiment."
        />
        <RevealGroup className="mx-auto grid max-w-3xl gap-4 sm:grid-cols-2">
          {profiles.map(({ icon: Icon, label, handle, href, description }) => (
            <RevealItem key={label} className="h-full">
              <a
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative flex h-full items-start gap-4 rounded-3xl border bg-card p-5 shadow-sm transition-[transform,box-shadow,border-color] duration-500 ease-out-expo hover:-translate-y-1 hover:border-foreground/15 hover:shadow-lift"
              >
                <CardIcon className="shrink-0">
                  <Icon aria-hidden />
                </CardIcon>
                <span className="min-w-0 flex-1">
                  <span className="flex items-baseline gap-2">
                    <span className="font-semibold">{label}</span>
                    <span className="truncate font-mono text-xs text-muted-foreground">@{handle}</span>
                  </span>
                  <span className="mt-1 block text-sm leading-relaxed text-muted-foreground">{description}</span>
                </span>
                <ArrowUpRight
                  aria-hidden
                  className="size-4 shrink-0 text-muted-foreground transition-all duration-500 ease-out-expo group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-foreground"
                />
                <span className="sr-only"> (opens in new tab)</span>
              </a>
            </RevealItem>
          ))}
        </RevealGroup>
      </Section>

      <CtaSection
        title={
          <>
            Have a project in <em className="font-serif font-normal italic">mind</em>?
          </>
        }
        description="Whether it lives in the interface or the infrastructure underneath, I would like to hear about it."
        label="Get in touch"
      />
    </>
  )
}
