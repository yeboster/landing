import { Code2, Globe } from 'lucide-react'

import { ButtonLink } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { formatDate } from '@/lib/post'
import { projectLinks, type Project } from '@/lib/projects-data'
import type { CaseStudy } from '@/lib/projects'

import { TagList } from './tag-list'

/** Rounded estimate at an average reading pace; derived from the text, never stated by hand. */
function readingMinutes(content: string) {
  const words = content.split(/\s+/).filter(Boolean).length
  return Math.max(1, Math.round(words / 230))
}

const linkIcons = { website: Globe, source: Code2 }

function Row({ term, children }: { term: string; children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-2">
      <dt className="font-mono text-[11px] font-medium uppercase tracking-[0.14em] text-muted-foreground">{term}</dt>
      <dd className="text-sm text-foreground">{children}</dd>
    </div>
  )
}

/** Project facts beside the article: sticky on wide screens, a panel above the text on small ones. */
export function CaseStudyMeta({ study, project }: { study: CaseStudy; project?: Project }) {
  const links = project ? projectLinks(project) : []
  return (
    <Card className="p-6 md:p-6">
      <h2 className="sr-only">Project details</h2>
      <dl className="grid grid-cols-2 gap-6 lg:grid-cols-1">
        <Row term="Published">
          <time dateTime={study.date}>{formatDate(study.date)}</time>
        </Row>
        <Row term="Reading time">{readingMinutes(study.content)} min</Row>
        {project?.role && <Row term="Role">{project.role}</Row>}
        {study.tags.length > 0 && (
          <div className="col-span-2 lg:col-span-1">
            <Row term="Stack">
              <TagList tags={study.tags} label="Stack" />
            </Row>
          </div>
        )}
      </dl>
      {links.length > 0 && (
        <div className="mt-6 flex flex-wrap gap-2 border-t border-border pt-6">
          {links.map((link) => {
            const Icon = linkIcons[link.kind]
            return (
              <ButtonLink key={link.href} href={link.href} variant="secondary" size="sm" external>
                <Icon aria-hidden />
                {link.label}
              </ButtonLink>
            )
          })}
        </div>
      )}
    </Card>
  )
}
