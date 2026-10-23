import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowLeft, ArrowRight } from 'lucide-react'

import { Reveal } from '@/components/motion/reveal'
import { HeroBackdrop } from '@/components/page-hero'
import { Button } from '@/components/ui/button'
import { Eyebrow } from '@/components/ui/eyebrow'

export const metadata: Metadata = {
  title: 'Page not found',
  robots: { index: false },
}

export default function NotFound() {
  return (
    <section className="relative isolate flex min-h-[70vh] items-center py-24 md:py-36">
      <HeroBackdrop />
      <div className="container flex flex-col items-center text-center">
        <Reveal immediate>
          <Eyebrow>Error 404</Eyebrow>
        </Reveal>
        <Reveal immediate delay={0.08}>
          <h1 className="mt-6 text-balance text-4xl font-semibold tracking-tight sm:text-6xl">
            <span aria-hidden className="block font-mono text-7xl font-medium tracking-tighter text-gradient-brand sm:text-9xl">
              404
            </span>
            <span className="mt-4 block">
              This page <em className="font-serif font-normal italic">wandered off</em>
            </span>
          </h1>
        </Reveal>
        <Reveal immediate delay={0.16}>
          <p className="mt-6 max-w-md text-lg leading-relaxed text-muted-foreground">
            The link may be broken, or the page may have moved. Let&apos;s get you back on track.
          </p>
        </Reveal>
        <Reveal immediate delay={0.24} className="mt-10 flex flex-col items-center gap-3 sm:flex-row">
          <Button asChild size="lg">
            <Link href="/">
              <ArrowLeft className="transition-transform duration-300 group-hover/button:-translate-x-0.5" />
              Back home
            </Link>
          </Button>
          <Button asChild size="lg" variant="secondary">
            <Link href="/portfolio">
              See my work
              <ArrowRight className="transition-transform duration-300 group-hover/button:translate-x-0.5" />
            </Link>
          </Button>
        </Reveal>
      </div>
    </section>
  )
}
