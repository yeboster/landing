import Link from 'next/link'
import type { Variants } from 'framer-motion'
import { ArrowRight, ChevronRight } from 'lucide-react'

import { Reveal } from '@/components/motion/reveal'
import { HeroBackdrop } from '@/components/page-hero'
import { Button } from '@/components/ui/button'
import { Logo } from '@/components/ui/logo'
import { duration, ease } from '@/lib/motion'

const markIn: Variants = {
  hidden: { opacity: 0, scale: 0.8, rotate: -8, filter: 'blur(8px)' },
  visible: {
    opacity: 1,
    scale: 1,
    rotate: 0,
    filter: 'blur(0px)',
    transition: { duration: duration.slow, ease },
  },
}

export function HomeHero() {
  return (
    <section className="relative isolate pb-16 pt-32 md:pb-24 md:pt-44">
      <HeroBackdrop />

      <div className="container flex flex-col items-center text-center">
        <Reveal immediate variants={markIn}>
          <div className="relative">
            <div aria-hidden className="absolute inset-0 -z-10 scale-150 rounded-full bg-brand/25 blur-2xl" />
            <Logo size={56} priority />
          </div>
        </Reveal>

        <Reveal immediate delay={0.12} className="mt-8">
          <Link
            href="/contact"
            className="group inline-flex items-center gap-2.5 rounded-full border bg-card/60 py-1 pl-3 pr-2.5 text-xs font-medium text-muted-foreground shadow-sm backdrop-blur transition-colors duration-300 hover:border-foreground/15 hover:text-foreground"
          >
            <span aria-hidden className="size-1.5 animate-pulse-dot rounded-full bg-brand ring-4 ring-brand/15" />
            Available for new projects
            <ChevronRight
              aria-hidden
              className="size-3.5 transition-transform duration-300 ease-out-expo group-hover:translate-x-0.5"
            />
          </Link>
        </Reveal>

        <Reveal immediate delay={0.2}>
          <h1 className="mt-7 max-w-4xl text-5xl font-semibold leading-[1.04] tracking-[-0.035em] sm:text-6xl md:text-7xl lg:text-[5.25rem]">
            I build reliable software,{' '}
            <em className="text-gradient-brand pr-[0.06em] font-serif text-[1.08em] font-normal italic tracking-normal">
              end to end
            </em>
            .
          </h1>
        </Reveal>

        <Reveal immediate delay={0.28}>
          <p className="mt-6 max-w-xl text-lg leading-relaxed text-muted-foreground md:text-xl">
            I&apos;m Yeboster, a full-stack engineer working across TypeScript, Ruby and Rust, from the
            interface people use to the infrastructure it runs on.
          </p>
        </Reveal>

        <Reveal immediate delay={0.36} className="mt-10 flex w-full flex-col items-center justify-center gap-3 sm:w-auto sm:flex-row">
          <Button asChild size="lg" className="w-full sm:w-auto">
            <Link href="/portfolio">
              View selected work
              <ArrowRight
                aria-hidden
                className="transition-transform duration-300 group-hover/button:translate-x-0.5"
              />
            </Link>
          </Button>
          <Button asChild size="lg" variant="secondary" className="w-full sm:w-auto">
            <Link href="/contact">Get in touch</Link>
          </Button>
        </Reveal>
      </div>
    </section>
  )
}
