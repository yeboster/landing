import Link from 'next/link'
import { ArrowRight, PenLine, Rss } from 'lucide-react'

import { Reveal } from '@/components/motion/reveal'

import { RSS_PATH } from './writing-hero'

/** Drafts in progress. Remove an entry when its post ships. */
const QUEUED = [
  'Designing a reusable LLM framework inside a Rails app',
  'Running Talos Kubernetes at home, reconciled by FluxCD',
  'Shipping a Rust smart contract with a TypeScript SDK',
]

export function WritingEmptyState() {
  return (
    <Reveal className="rounded-3xl border border-dashed border-border bg-card/50 px-6 py-12 sm:px-12 sm:py-14">
      <div className="mx-auto max-w-md text-center">
        <span className="mx-auto flex size-11 items-center justify-center rounded-2xl border border-border bg-subtle text-brand-ink">
          <PenLine aria-hidden className="size-5" />
        </span>
        <h2 className="mt-5 text-xl font-semibold tracking-tight">The first post is being written</h2>
        <p className="mt-2 leading-relaxed text-muted-foreground">
          Everything here comes out of real work, so it takes a while. Queued up:
        </p>
      </div>

      <ol className="mx-auto mt-8 max-w-md divide-y divide-border border-y border-border">
        {QUEUED.map((topic, n) => (
          <li key={topic} className="flex gap-4 py-3 text-sm">
            <span aria-hidden className="pt-px font-mono text-xs text-muted-foreground">
              {String(n + 1).padStart(2, '0')}
            </span>
            <span className="text-foreground/85">{topic}</span>
          </li>
        ))}
      </ol>

      <div className="mt-8 flex flex-wrap items-center justify-center gap-x-6 gap-y-3 text-sm">
        <a
          href={RSS_PATH}
          className="inline-flex items-center gap-1.5 font-medium text-brand-ink underline decoration-brand-ink/30 underline-offset-4 transition-colors hover:decoration-brand-ink"
        >
          <Rss aria-hidden className="size-3.5" />
          Get the first one via RSS
        </a>
        <Link
          href="/contact"
          className="group inline-flex items-center gap-1.5 text-muted-foreground transition-colors hover:text-foreground"
        >
          Or ask me directly
          <ArrowRight aria-hidden className="size-3.5 transition-transform group-hover:translate-x-0.5" />
        </Link>
      </div>
    </Reveal>
  )
}
