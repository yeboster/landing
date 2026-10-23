import Image from 'next/image'
import { ArrowUpRight, Github, Globe } from 'lucide-react'

import { PointerSpotlight } from '@/components/portfolio/pointer-spotlight'
import { primaryLink, type Project, type ProjectLinks } from '@/content/projects'
import { cn } from '@/lib/utils'

export type ProjectCardLayout = 'featured' | 'wide' | 'default'

type ProjectCardProps = {
  project: Project
  /**
   * `featured` is horizontal from md up; `wide` is horizontal on tablets only
   * (used to fill an odd final row in a two-column grid).
   */
  layout?: ProjectCardLayout
}

const linkMeta: Record<keyof ProjectLinks, { label: string; Icon: typeof Globe }> = {
  live: { label: 'Visit site', Icon: Globe },
  source: { label: 'View source', Icon: Github },
}

const linkOrder: (keyof ProjectLinks)[] = ['live', 'source']

function NewTabHint() {
  return <span className="sr-only"> (opens in new tab)</span>
}

/** Framed logo on a dotted grid. Falls back to a monogram when there is no image. */
function ProjectPreview({ project, layout }: Required<ProjectCardProps>) {
  const large = layout === 'featured'

  return (
    <div
      className={cn(
        'relative isolate flex aspect-[16/10] shrink-0 items-center justify-center overflow-hidden border-b bg-subtle',
        layout === 'featured' && 'md:aspect-auto md:min-h-[22rem] md:w-1/2 md:border-b-0 md:border-r',
        layout === 'wide' && 'md:aspect-auto md:min-h-[16rem] md:w-2/5 md:border-b-0 md:border-r lg:aspect-[16/10] lg:min-h-0 lg:w-full lg:border-b lg:border-r-0'
      )}
    >
      <div aria-hidden className="bg-grid mask-radial absolute inset-0 -z-10" />
      <div
        aria-hidden
        className="absolute left-1/2 top-1/2 -z-10 size-56 -translate-x-1/2 -translate-y-1/2 rounded-full bg-brand/20 opacity-40 blur-3xl transition-opacity duration-700 ease-out-expo group-hover:opacity-100"
      />

      {project.image ? (
        // Logos ship with light/opaque backgrounds, so they sit on a fixed white plate in both themes.
        <div
          className={cn(
            'relative overflow-hidden rounded-[1.375rem] bg-white shadow-soft ring-1 ring-foreground/10 transition-transform duration-700 ease-out-expo group-hover:scale-[1.04]',
            large ? 'size-36 md:size-44' : 'size-32'
          )}
        >
          <Image
            src={project.image}
            alt={`${project.title} logo`}
            fill
            sizes={large ? '(min-width: 768px) 176px, 144px' : '128px'}
            className="object-contain p-2.5"
          />
        </div>
      ) : (
        <div
          aria-hidden
          className={cn(
            'flex items-center justify-center rounded-[1.375rem] bg-brand text-brand-foreground shadow-glow transition-transform duration-700 ease-out-expo group-hover:scale-[1.04]',
            large ? 'size-36 md:size-44' : 'size-32'
          )}
        >
          <span className="font-serif text-7xl italic leading-none">{project.title.charAt(0)}</span>
        </div>
      )}
    </div>
  )
}

/**
 * Whole-card link via the stretched-link pattern: the title anchor's `::after`
 * covers the card, and secondary links sit above it with `relative z-10`.
 */
export function ProjectCard({ project, layout = 'default' }: ProjectCardProps) {
  const primary = primaryLink(project)
  const secondaryKinds = linkOrder.filter((kind) => project.links[kind] && kind !== primary?.kind)
  const PrimaryIcon = primary ? linkMeta[primary.kind].Icon : null

  return (
    <PointerSpotlight>
      <article
        id={project.slug}
        className={cn(
          'group relative flex h-full flex-col overflow-hidden rounded-3xl border bg-card shadow-sm',
          'transition-[transform,box-shadow,border-color] duration-500 ease-out-expo hover:-translate-y-1 hover:border-foreground/15 hover:shadow-lift',
          'has-[.project-link:focus-visible]:ring-2 has-[.project-link:focus-visible]:ring-ring has-[.project-link:focus-visible]:ring-offset-2 has-[.project-link:focus-visible]:ring-offset-background',
          layout === 'featured' && 'md:flex-row',
          layout === 'wide' && 'md:flex-row lg:flex-col'
        )}
      >
        {/* Cursor-following glow; driven by CSS vars from <PointerSpotlight>, hidden on touch devices. */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 z-[1] hidden opacity-0 transition-opacity duration-500 group-hover:opacity-100 [@media(hover:hover)]:block"
          style={{
            background:
              'radial-gradient(480px circle at var(--spot-x, 50%) var(--spot-y, 0%), hsl(var(--brand) / 0.08), transparent 55%)',
          }}
        />

        <ProjectPreview project={project} layout={layout} />

        <div className={cn('flex grow flex-col p-6', layout === 'featured' && 'md:justify-center md:p-10')}>
          <div className="flex items-start justify-between gap-4">
            <div className="min-w-0">
              <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
                {project.featured && (
                  <span className="inline-flex items-center rounded-full border border-brand/20 bg-brand-soft px-2 py-0.5 font-mono text-[11px] font-medium uppercase tracking-[0.12em] text-brand">
                    Featured
                  </span>
                )}
                <p className="font-mono text-xs text-muted-foreground">{project.summary}</p>
              </div>
              <h3
                className={cn(
                  'mt-3 font-semibold tracking-tight',
                  layout === 'featured' ? 'text-2xl md:text-3xl' : 'text-xl'
                )}
              >
                {primary ? (
                  <a
                    href={primary.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="project-link after:absolute after:inset-0 after:z-[2] after:content-[''] focus-visible:ring-0 focus-visible:ring-offset-0"
                  >
                    {project.title}
                    <NewTabHint />
                  </a>
                ) : (
                  project.title
                )}
              </h3>
            </div>
            {primary && (
              <span
                aria-hidden
                className="flex size-9 shrink-0 items-center justify-center rounded-full border bg-background text-muted-foreground transition-all duration-500 ease-out-expo group-hover:border-foreground/20 group-hover:text-foreground"
              >
                <ArrowUpRight className="size-4 transition-transform duration-500 ease-out-expo group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              </span>
            )}
          </div>

          <p
            className={cn(
              'mt-3 leading-relaxed text-muted-foreground',
              layout === 'featured' ? 'text-base md:text-lg' : 'text-sm'
            )}
          >
            {project.description}
          </p>

          <ul className="mt-5 flex flex-wrap gap-1.5" aria-label="Technologies">
            {project.tags.map((tag) => (
              <li
                key={tag}
                className="rounded-md border bg-subtle px-2 py-0.5 font-mono text-[11px] text-muted-foreground"
              >
                {tag}
              </li>
            ))}
          </ul>

          {primary && (
            <div className="mt-auto pt-6">
              <div className="flex items-center gap-5 border-t pt-4 text-sm font-medium">
                {/* Visual label for the stretched link; the title anchor carries the semantics. */}
                <span aria-hidden className="inline-flex items-center gap-1.5 text-foreground">
                  {PrimaryIcon && <PrimaryIcon className="size-3.5" />}
                  {linkMeta[primary.kind].label}
                </span>
                {secondaryKinds.map((kind) => {
                  const { label, Icon } = linkMeta[kind]
                  return (
                    <a
                      key={kind}
                      href={project.links[kind]}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="relative z-10 inline-flex items-center gap-1.5 rounded-sm text-muted-foreground transition-colors hover:text-foreground"
                    >
                      <Icon className="size-3.5" aria-hidden />
                      {label}
                      <span className="sr-only"> for {project.title}</span>
                      <NewTabHint />
                    </a>
                  )
                })}
              </div>
            </div>
          )}
        </div>
      </article>
    </PointerSpotlight>
  )
}
