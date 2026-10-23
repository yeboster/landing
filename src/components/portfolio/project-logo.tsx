import Image from 'next/image'

import type { Project } from '@/lib/projects-data'
import { cn } from '@/lib/utils'

const sizes = {
  sm: { tile: 'size-12 rounded-xl p-1.5', image: 48, icon: 'size-6' },
  md: { tile: 'size-24 rounded-2xl p-3', image: 96, icon: 'size-10' },
  lg: { tile: 'size-32 rounded-3xl p-4 md:size-40', image: 160, icon: 'size-14' },
}

/**
 * The project's logo on a white tile. The logos ship with opaque white
 * backgrounds, so a deliberate white plate reads as intended in both themes
 * instead of as a white box on a dark card.
 */
export function ProjectLogo({ project, size = 'md', className }: { project: Project; size?: keyof typeof sizes; className?: string }) {
  const s = sizes[size]
  const Icon = project.icon
  return (
    <div
      className={cn(
        'relative flex shrink-0 items-center justify-center bg-white shadow-soft ring-1 ring-black/5 dark:ring-white/10',
        s.tile,
        className
      )}
    >
      {project.image ? (
        <Image src={project.image} alt={project.alt} height={s.image} className="h-full w-auto max-w-full object-contain" />
      ) : Icon ? (
        <Icon aria-hidden className={cn('text-brand', s.icon)} />
      ) : null}
    </div>
  )
}

/** Framed preview area at the top of a project card. */
export function ProjectPreview({
  project,
  hasCaseStudy,
  featured = false,
}: {
  project: Project
  hasCaseStudy: boolean
  featured?: boolean
}) {
  return (
    <div
      className={cn(
        'relative flex items-center justify-center overflow-hidden bg-subtle',
        featured ? 'min-h-64 border-b border-border md:min-h-80 md:border-b-0 md:border-r' : 'h-44 border-b border-border'
      )}
    >
      <div aria-hidden className="bg-grid mask-radial absolute inset-0" />
      <ProjectLogo
        project={project}
        size={featured ? 'lg' : 'md'}
        className="transition-transform duration-500 ease-out-expo group-hover:scale-105"
      />
      {hasCaseStudy && <CaseStudyBadge className="absolute left-4 top-4" />}
    </div>
  )
}

export function CaseStudyBadge({ className }: { className?: string }) {
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 rounded-full border border-brand/25 bg-brand-soft px-2.5 py-1 font-mono text-[11px] font-medium uppercase leading-none tracking-[0.14em] text-brand-ink',
        className
      )}
    >
      <span aria-hidden className="size-1.5 rounded-full bg-brand" />
      Case study
    </span>
  )
}
