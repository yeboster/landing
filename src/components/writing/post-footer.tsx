import { ArrowRight, Rss } from 'lucide-react'

import { Reveal } from '@/components/motion/reveal'
import { ButtonLink } from '@/components/ui/button'
import { site } from '@/lib/site'

import { BackLink } from './post-header'
import { RSS_PATH } from './writing-hero'

/** End-of-post CTA: the reader who got this far is the one worth talking to. */
export function PostFooter() {
  return (
    <footer className="mt-16 border-t border-border pt-12">
      <Reveal className="rounded-3xl border border-border bg-subtle p-6 sm:p-8">
        <h2 className="text-xl font-semibold tracking-tight sm:text-2xl">Working on something like this?</h2>
        <p className="mt-2 leading-relaxed text-muted-foreground">
          Tell me what you are building and where it is stuck. I reply within {site.responseTime}.
        </p>
        <div className="mt-6 flex flex-wrap items-center gap-3">
          <ButtonLink href="/contact" variant="primary">
            Get in touch
            <ArrowRight aria-hidden className="transition-transform group-hover/button:translate-x-0.5" />
          </ButtonLink>
          <a
            href={RSS_PATH}
            className="inline-flex h-11 items-center gap-2 rounded-full px-4 text-sm text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
          >
            <Rss aria-hidden className="size-4" />
            Follow via RSS
          </a>
        </div>
      </Reveal>
      <div className="mt-10">
        <BackLink href="/writing">All writing</BackLink>
      </div>
    </footer>
  )
}
