import { RevealGroup, RevealItem } from '@/components/motion/reveal'
import { Section, SectionHeader } from '@/components/ui/section'
import { skills } from '@/content/about'

/** Skills as a two-column table: it scans faster than cards and prints like a CV. */
export function SkillsSection() {
  return (
    <Section tone="subtle" aria-labelledby="skills-title">
      <SectionHeader
        align="left"
        eyebrow="Skills"
        titleId="skills-title"
        title="What I work with"
        description="A strong computer science background, and a habit of picking up new tools and methods."
      />

      <RevealGroup as="ul" interval={0.05} className="divide-y divide-border border-y border-border">
        {skills.map((group) => (
          <RevealItem
            as="li"
            key={group.title}
            className="grid gap-3 py-5 sm:grid-cols-[12rem_minmax(0,1fr)] sm:items-baseline sm:gap-8 md:py-6"
          >
            <h3 className="font-mono text-xs uppercase tracking-[0.14em] text-muted-foreground">{group.title}</h3>
            <ul className="flex flex-wrap gap-2">
              {group.items.map((item) => (
                <li
                  key={item}
                  className="rounded-full border border-border bg-card px-3 py-1 text-sm font-medium transition-colors duration-300 hover:border-brand/40 hover:text-brand-ink"
                >
                  {item}
                </li>
              ))}
            </ul>
          </RevealItem>
        ))}
      </RevealGroup>
    </Section>
  )
}
