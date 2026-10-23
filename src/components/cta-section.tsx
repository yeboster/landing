import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

import { Reveal } from '@/components/motion/reveal'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

type CtaSectionProps = {
  title?: React.ReactNode
  description?: React.ReactNode
  href?: string
  label?: string
  className?: string
}

/** Closing call-to-action banner shared by every page. */
export function CtaSection({
  title = 'Have something worth building?',
  description = "I'm open to interesting projects, collaborations and good conversations about software.",
  href = '/contact',
  label = 'Start a conversation',
  className,
}: CtaSectionProps) {
  return (
    <section className={cn('py-20 md:py-28', className)}>
      <div className="container">
        <Reveal>
          <div className="relative isolate overflow-hidden rounded-4xl border bg-card px-6 py-16 text-center shadow-soft md:px-16 md:py-20">
            <div aria-hidden className="bg-grid mask-radial absolute inset-0 -z-10 opacity-70" />
            <div
              aria-hidden
              className="absolute left-1/2 top-full -z-10 h-[360px] w-[640px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-brand/25 blur-[100px]"
            />
            <h2 className="mx-auto max-w-2xl text-3xl font-semibold tracking-tight sm:text-4xl md:text-5xl">
              {title}
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-base text-muted-foreground md:text-lg">{description}</p>
            <Button asChild size="lg" className="mt-8">
              <Link href={href}>
                {label}
                <ArrowRight className="transition-transform duration-300 group-hover/button:translate-x-0.5" />
              </Link>
            </Button>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
