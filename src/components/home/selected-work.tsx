import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight, ArrowUpRight, BookOpen, Building2, FileText, Zap } from 'lucide-react'

import { RevealGroup, RevealItem } from '@/components/motion/reveal'
import { TiltCard } from '@/components/tilt-card'
import { Card, CardIcon } from '@/components/ui/card'
import { Section, SectionHeader } from '@/components/ui/section'
import { scaleIn } from '@/lib/motion'
import { highlightedProjects, projectLinks } from '@/lib/projects-data'
import { site } from '@/lib/site'
import { cn } from '@/lib/utils'

import { currentWork } from './data'
import { TagList } from './tag-list'

const linkClass =
  'inline-flex items-center gap-1.5 rounded-sm text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand/50 [&_svg]:size-3.5'

/** No hover lift: the tilt already responds to the cursor, and two motions fight. */
const cardClass =
  'flex h-full flex-col transition-[border-color,box-shadow] duration-500 ease-out-expo hover:border-foreground/15 hover:shadow-lift'

function WorkCard({
  icon,
  title,
  description,
  tags,
  links,
}: {
  icon: React.ReactNode
  title: string
  description: string
  tags: readonly string[]
  links: React.ReactNode
}) {
  return (
    <RevealItem as="li" variants={scaleIn} className="h-full">
      <TiltCard maxTilt={3} className="h-full">
        <Card className={cn('group', cardClass)}>
          <CardIcon>{icon}</CardIcon>
          <h3 className="mt-6 text-xl font-semibold tracking-tight">{title}</h3>
          <p className="mt-3 grow text-sm leading-relaxed text-muted-foreground">{description}</p>
          <TagList tags={tags} className="mt-6" />
          <div className="mt-6 flex flex-wrap items-center gap-x-5 gap-y-2 border-t border-border pt-5">{links}</div>
        </Card>
      </TiltCard>
    </RevealItem>
  )
}

/** Current professional work first, then the highlighted side projects. */
export function SelectedWork({ caseStudies }: { caseStudies: string[] }) {
  return (
    <Section aria-labelledby="selected-work-title">
      <SectionHeader
        align="left"
        eyebrow="Selected work"
        titleId="selected-work-title"
        title={
          <>
            What I&apos;ve <em className="font-serif font-normal italic">shipped</em>
          </>
        }
        action={
          <Link href="/portfolio" className={cn(linkClass, 'text-muted-foreground hover:text-foreground')}>
            All projects
            <ArrowRight aria-hidden="true" />
          </Link>
        }
      />

      <RevealGroup as="ul" className="grid grid-cols-1 gap-6 md:grid-cols-3">
        <WorkCard
          icon={<Building2 aria-hidden="true" />}
          title={site.company}
          description={currentWork.description}
          tags={currentWork.tags}
          links={
            <Link href="/about" className={cn(linkClass, 'text-foreground hover:text-brand-ink')}>
              <FileText aria-hidden="true" />
              Career details
            </Link>
          }
        />

        {highlightedProjects.map((project) => {
          const Icon = project.icon ?? Zap
          return (
            <WorkCard
              key={project.slug}
              icon={
                project.image ? (
                  // Decorative: the project title sits right below it.
                  <Image src={project.image} alt="" width={24} height={24} className="size-6 object-contain" />
                ) : (
                  <Icon aria-hidden="true" />
                )
              }
              title={project.title}
              description={project.description}
              tags={project.tags}
              links={
                <>
                  {caseStudies.includes(project.slug) && (
                    <Link href={`/portfolio/${project.slug}`} className={cn(linkClass, 'text-brand-ink hover:text-foreground')}>
                      <BookOpen aria-hidden="true" />
                      Case study
                    </Link>
                  )}
                  {projectLinks(project).map((link) => (
                    <a
                      key={link.href}
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={cn(linkClass, 'text-muted-foreground hover:text-foreground')}
                    >
                      <ArrowUpRight aria-hidden="true" />
                      {link.label}
                      <span className="sr-only"> for {project.title} (opens in a new tab)</span>
                    </a>
                  ))}
                </>
              }
            />
          )
        })}
      </RevealGroup>
    </Section>
  )
}
