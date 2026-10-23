import { Clock } from 'lucide-react'

import { HeroGlow } from '@/components/about/hero-glow'
import { RevealGroup, RevealItem } from '@/components/motion/reveal'
import { Eyebrow } from '@/components/ui/eyebrow'
import { updated } from '@/content/now'

import { ParisNow } from './paris-now'

export function NowHero() {
  return (
    <section aria-labelledby="now-title" className="relative overflow-hidden pb-16 pt-16 md:pb-24 md:pt-24">
      <HeroGlow />

      <RevealGroup immediate interval={0.06} className="container relative">
        <RevealItem>
          <Eyebrow>Now</Eyebrow>
        </RevealItem>
        <RevealItem as="h1" id="now-title" className="mt-6 max-w-3xl text-4xl font-semibold tracking-tight sm:text-5xl md:text-6xl">
          What I&apos;m focused on <em className="font-serif font-normal italic text-brand-ink">now</em>.
        </RevealItem>
        <RevealItem as="p" className="mt-6 max-w-2xl text-lg leading-relaxed text-muted-foreground md:text-xl">
          A snapshot of my work, side projects and current stack, in the spirit of{' '}
          <a
            href="https://nownownow.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-foreground underline decoration-border underline-offset-4 transition-colors hover:decoration-brand"
          >
            nownownow.com
            <span className="sr-only"> (opens in a new tab)</span>
          </a>
          .
        </RevealItem>
        <RevealItem className="mt-8 flex flex-wrap items-center gap-x-5 gap-y-3">
          <ParisNow />
          <p className="inline-flex items-center gap-1.5 font-mono text-xs uppercase tracking-[0.14em] text-muted-foreground">
            <Clock className="size-3.5" aria-hidden />
            Updated {updated}
          </p>
        </RevealItem>
      </RevealGroup>
    </section>
  )
}
