import { RevealGroup, RevealItem } from '@/components/motion/reveal'

import { credibility } from './data'

/** A compact band of checkable facts directly under the hero. */
export function Highlights() {
  return (
    <section aria-label="Highlights" className="w-full border-y border-border bg-card/50">
      <RevealGroup className="container py-10 md:py-12">
        <dl className="grid grid-cols-1 gap-x-10 gap-y-6 sm:grid-cols-2 lg:grid-cols-4">
          {credibility.map((item) => (
            <RevealItem key={item.label} className="border-l border-border pl-4">
              <dt className="font-mono text-[11px] font-medium uppercase tracking-[0.14em] text-brand-ink">{item.label}</dt>
              <dd className="mt-2 text-sm leading-relaxed text-foreground/80">{item.value}</dd>
            </RevealItem>
          ))}
        </dl>
      </RevealGroup>
    </section>
  )
}
