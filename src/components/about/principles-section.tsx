import { RevealGroup, RevealItem } from '@/components/motion/reveal'
import { Section, SectionHeader } from '@/components/ui/section'
import { principles } from '@/content/about'

export function PrinciplesSection() {
  return (
    <Section aria-labelledby="principles-title">
      <SectionHeader
        align="left"
        eyebrow="Principles"
        titleId="principles-title"
        title="How I work"
        description="The principles behind every line of code I write."
      />

      <RevealGroup as="ol" interval={0.05} className="grid gap-x-10 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
        {principles.map((principle, i) => (
          <RevealItem as="li" key={principle.title} className="border-t border-border pt-5">
            <span aria-hidden className="font-mono text-xs text-brand-ink">
              {String(i + 1).padStart(2, '0')}
            </span>
            <h3 className="mt-3 text-lg font-semibold tracking-tight">{principle.title}</h3>
            <p className="mt-2 leading-relaxed text-muted-foreground">{principle.description}</p>
          </RevealItem>
        ))}
      </RevealGroup>
    </Section>
  )
}
