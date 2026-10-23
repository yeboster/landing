import { RevealGroup, RevealItem } from '@/components/motion/reveal'
import type { TimelineEntry } from '@/content/about'
import { cn } from '@/lib/utils'

import { TimelineRail } from './timeline-rail'

export function JourneyTimeline({ entries }: { entries: TimelineEntry[] }) {
  return (
    <TimelineRail>
      <RevealGroup interval={0.12}>
        <ol className="relative space-y-12 md:space-y-14">
          {entries.map(({ label, title, description, icon: Icon, current }) => (
            <RevealItem as="li" key={label} className="grid grid-cols-[2.5rem_minmax(0,1fr)] gap-x-5 md:gap-x-7">
              <div
                aria-hidden
                className={cn(
                  'relative flex size-10 items-center justify-center rounded-full border bg-card text-muted-foreground shadow-sm [&_svg]:size-4',
                  current && 'border-brand/40 text-brand shadow-glow'
                )}
              >
                {current && <span className="absolute inset-0 rounded-full bg-brand-soft" />}
                <Icon className="relative" />
              </div>

              <div className="pt-1.5">
                <div className="flex flex-wrap items-center gap-3">
                  <span className="font-mono text-xs font-medium uppercase tracking-[0.14em] text-muted-foreground">
                    {label}
                  </span>
                  {current && (
                    <span className="inline-flex items-center gap-1.5 rounded-full border border-brand/30 bg-brand-soft px-2 py-0.5 font-mono text-[10px] font-medium uppercase tracking-[0.14em] text-brand">
                      <span aria-hidden className="size-1.5 animate-pulse-dot rounded-full bg-brand" />
                      Current
                    </span>
                  )}
                </div>
                <h3 className="mt-2 text-xl font-semibold tracking-tight md:text-2xl">{title}</h3>
                <p className="mt-3 max-w-xl leading-relaxed text-muted-foreground">{description}</p>
              </div>
            </RevealItem>
          ))}
        </ol>
      </RevealGroup>
    </TimelineRail>
  )
}
