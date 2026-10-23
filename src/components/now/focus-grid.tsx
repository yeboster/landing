import type { ReactNode } from 'react'
import { Bot, Briefcase, Code2, Server } from 'lucide-react'

import { RevealGroup, RevealItem } from '@/components/motion/reveal'
import { Card, CardIcon } from '@/components/ui/card'
import { Section, SectionHeader } from '@/components/ui/section'
import { focus, stack, type FocusItem } from '@/content/now'

const focusIcons: Record<FocusItem['kind'], ReactNode> = {
  work: <Briefcase aria-hidden />,
  infra: <Server aria-hidden />,
  agents: <Bot aria-hidden />,
  site: <Code2 aria-hidden />,
}

export function FocusGrid() {
  return (
    <Section tone="subtle" aria-labelledby="focus-title">
      <SectionHeader align="left" eyebrow="Right now" titleId="focus-title" title="Work and side projects" />

      <RevealGroup as="ul" interval={0.06} className="grid gap-4 sm:grid-cols-2 md:gap-6">
        {focus.map((item) => (
          <RevealItem as="li" key={item.title}>
            <Card interactive className="group h-full">
              <CardIcon>{focusIcons[item.kind]}</CardIcon>
              <h3 className="mt-6 text-lg font-semibold tracking-tight">{item.title}</h3>
              <p className="mt-2 leading-relaxed text-muted-foreground">{item.description}</p>
            </Card>
          </RevealItem>
        ))}
      </RevealGroup>

      <div className="mt-16 flex flex-col gap-5 border-t border-border pt-10 sm:flex-row sm:items-center sm:gap-10">
        <h2 className="shrink-0 font-mono text-xs uppercase tracking-[0.14em] text-muted-foreground">
          What I&apos;m reaching for
        </h2>
        <RevealGroup as="ul" interval={0.04} className="flex flex-wrap gap-2">
          {stack.map((tech) => (
            <RevealItem
              as="li"
              key={tech}
              className="rounded-full border border-border bg-card px-4 py-1.5 text-sm font-medium transition-colors duration-300 hover:border-brand/40 hover:text-brand-ink"
            >
              {tech}
            </RevealItem>
          ))}
        </RevealGroup>
      </div>
    </Section>
  )
}
