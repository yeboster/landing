import { TerminalCard } from '@/components/terminal-card'
import { Section, SectionHeader } from '@/components/ui/section'

export function TerminalSection() {
  return (
    <Section tone="subtle" aria-labelledby="terminal-title">
      <SectionHeader
        eyebrow="Interactive"
        titleId="terminal-title"
        title={
          <>
            Try the <em className="font-serif font-normal italic">terminal</em>
          </>
        }
        description={
          <>
            Type <kbd className="rounded-md border border-border bg-card px-1.5 py-0.5 font-mono text-sm text-foreground">help</kbd>{' '}
            to see what it knows.
          </>
        }
      />
      <div className="mx-auto max-w-2xl">
        <TerminalCard />
      </div>
    </Section>
  )
}
