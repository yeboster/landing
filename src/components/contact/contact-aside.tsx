import { ArrowUpRight, CalendarClock, Check, Clock, Linkedin, Twitter } from 'lucide-react'

import { RevealGroup, RevealItem } from '@/components/motion/reveal'
import { ButtonLink } from '@/components/ui/button'
import { site } from '@/lib/site'

import { CopyEmail } from './copy-email'

const socials = [
  { label: 'LinkedIn', note: 'Work history and the professional version of all this', href: site.socials.linkedin, icon: <Linkedin aria-hidden /> },
  { label: 'Twitter', note: 'Shorter notes on whatever I am building or breaking', href: site.socials.twitter, icon: <Twitter aria-hidden /> },
]

function Label({ id, children }: { id: string; children: React.ReactNode }) {
  return (
    <h2 id={id} className="font-mono text-[11px] font-medium uppercase tracking-[0.14em] text-muted-foreground">
      {children}
    </h2>
  )
}

/** Everything that isn't the form: what's a fit, how fast I reply, and the other ways in. */
export function ContactAside() {
  return (
    <RevealGroup as="div" immediate delay={0.3} className="flex flex-col gap-10 lg:sticky lg:top-24 lg:self-start">
      <RevealItem>
        <section aria-labelledby="contact-fit">
        <Label id="contact-fit">Good fit</Label>
        <ul className="mt-4 space-y-3">
          {site.engagements.map((engagement) => (
            <li key={engagement} className="flex items-start gap-3 text-[15px] text-foreground">
              <span className="mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full bg-brand-soft text-brand-ink">
                <Check aria-hidden className="size-3" strokeWidth={3} />
              </span>
              {engagement}
            </li>
          ))}
        </ul>
        <p className="mt-5 flex items-center gap-2 font-mono text-xs text-muted-foreground">
          <Clock aria-hidden className="size-3.5" />
          Replies within {site.responseTime}
        </p>
        </section>
      </RevealItem>

      {site.booking ? (
        <RevealItem>
        <section aria-labelledby="contact-call">
          <div className="rounded-3xl border border-border bg-card p-6 shadow-sm">
            <span className="flex size-10 items-center justify-center rounded-xl border border-border bg-subtle text-brand-ink">
              <CalendarClock aria-hidden className="size-5" />
            </span>
            <h2 id="contact-call" className="mt-4 text-lg font-semibold tracking-tight">
              Prefer to talk?
            </h2>
            <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
              Skip the form. Twenty minutes, no pitch deck required.
            </p>
            <ButtonLink href={site.booking} external variant="secondary" size="sm" className="mt-5">
              Book a call
              <ArrowUpRight aria-hidden />
            </ButtonLink>
          </div>
          </section>
      </RevealItem>
      ) : null}

      <RevealItem>
        <section aria-labelledby="contact-email">
        <Label id="contact-email">Email</Label>
        <div className="mt-4">
          <CopyEmail />
        </div>
        </section>
      </RevealItem>

      <RevealItem>
        <section aria-labelledby="contact-elsewhere">
        <Label id="contact-elsewhere">Elsewhere</Label>
        <ul className="mt-2 divide-y divide-border">
          {socials.map((social) => (
            <li key={social.label}>
              <a
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-4 py-3.5 [&>svg]:size-4"
              >
                <span className="flex size-9 shrink-0 items-center justify-center rounded-xl border border-border bg-card text-muted-foreground transition-colors group-hover:border-brand/30 group-hover:text-brand-ink [&_svg]:size-4">
                  {social.icon}
                </span>
                <span className="min-w-0 flex-1">
                  <span className="block text-sm font-medium text-foreground">{social.label}</span>
                  <span className="block truncate text-xs text-muted-foreground">{social.note}</span>
                </span>
                <ArrowUpRight
                  aria-hidden
                  className="text-muted-foreground transition-transform duration-300 ease-out-expo group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-brand-ink"
                />
                <span className="sr-only"> (opens in a new tab)</span>
              </a>
            </li>
          ))}
        </ul>
        </section>
      </RevealItem>
    </RevealGroup>
  )
}
