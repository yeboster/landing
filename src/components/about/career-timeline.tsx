import { RevealGroup, RevealItem } from '@/components/motion/reveal'
import { Section, SectionHeader } from '@/components/ui/section'
import { timeline } from '@/content/about'
import { cn } from '@/lib/utils'

import { TimelineRail } from './timeline-rail'

/** Career history: a sticky intro on the left, the timeline on the right. */
export function CareerTimeline() {
  return (
    <Section aria-labelledby="career-title">
      <div className="grid gap-12 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-20">
        <div className="lg:sticky lg:top-28 lg:self-start">
          <SectionHeader
            align="left"
            eyebrow="Career"
            titleId="career-title"
            title="Where I've worked"
            description="From a technical school in Thiene to anti-fraud and AI at Trustpair in Paris, with Rails as the thread through most of it."
            className="mb-0 md:mb-0"
          />
        </div>

        <TimelineRail>
          <RevealGroup as="ol" interval={0.06} className="flex flex-col gap-10 md:gap-12">
            {timeline.map((entry) => (
              <RevealItem as="li" key={`${entry.org}-${entry.period}`} className="relative pl-10 print:pl-0">
                <span
                  aria-hidden
                  className={cn(
                    'absolute left-0 top-1 size-[15px] rounded-full border-2 bg-background print:hidden',
                    entry.current ? 'border-brand shadow-glow' : 'border-border'
                  )}
                >
                  {entry.current && <span className="absolute inset-[3px] animate-pulse-dot rounded-full bg-brand" />}
                </span>

                <p className="font-mono text-xs uppercase tracking-[0.14em] text-muted-foreground">
                  {entry.period}
                  {entry.current && <span className="ml-2 text-brand-ink">· Current</span>}
                </p>
                <h3 className="mt-2 text-xl font-semibold tracking-tight">{entry.role}</h3>
                <p className="mt-0.5 font-medium text-foreground/80">
                  {entry.org}
                  {entry.place && <span className="text-muted-foreground"> · {entry.place}</span>}
                </p>
                <p className="mt-3 max-w-xl leading-relaxed text-muted-foreground">{entry.description}</p>
              </RevealItem>
            ))}
          </RevealGroup>
        </TimelineRail>
      </div>
    </Section>
  )
}
