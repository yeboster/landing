import { Rss } from 'lucide-react'

import { Aurora } from '@/components/aurora'
import { Reveal } from '@/components/motion/reveal'
import { SplitText } from '@/components/split-text'
import { Eyebrow } from '@/components/ui/eyebrow'

/** The feed is a route handler, not a page, so it's linked with a plain <a>: next/link would try to prefetch it. */
export const RSS_PATH = '/writing/rss.xml'

export function WritingHero() {
  return (
    <section className="relative w-full pb-12 pt-16 md:pb-16 md:pt-28">
      <Aurora maxOffset={14}>
        <div className="aurora absolute inset-x-0 -top-40 mx-auto h-[420px] w-[min(680px,100%)] rounded-full bg-brand/15 blur-3xl dark:bg-brand/20" />
      </Aurora>

      <div className="container relative z-10 flex max-w-3xl flex-col items-center text-center">
        <Reveal immediate>
          <Eyebrow>Writing</Eyebrow>
        </Reveal>
        <h1
          className="mt-6 text-4xl font-semibold tracking-tight sm:text-5xl md:text-6xl"
          aria-label="Notes from the build"
        >
          <SplitText text="Notes from the" by="word" />{' '}
          <em className="font-serif font-normal italic">
            <SplitText text="build" by="word" gradient />
          </em>
        </h1>
        <Reveal immediate delay={0.2}>
          <p className="mx-auto mt-6 max-w-xl text-lg leading-relaxed text-muted-foreground">
            Long-form notes on what I actually ship: Rails at scale, Rust on chain, Kubernetes at home, and the AI
            plumbing in between.
          </p>
        </Reveal>
        <Reveal immediate delay={0.3} className="mt-8">
          <a
            href={RSS_PATH}
            className="inline-flex h-9 items-center gap-2 rounded-full border border-border bg-card px-4 font-mono text-xs text-muted-foreground shadow-sm transition-colors hover:border-brand/40 hover:text-brand-ink"
          >
            <Rss aria-hidden className="size-3.5" />
            RSS feed
          </a>
        </Reveal>
      </div>
    </section>
  )
}
