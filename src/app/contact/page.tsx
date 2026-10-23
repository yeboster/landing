import type { Metadata } from 'next'

import { ContactAside } from '@/components/contact/contact-aside'
import { ContactForm } from '@/components/contact/contact-form'
import { ContactHero } from '@/components/contact/contact-hero'
import { Reveal } from '@/components/motion/reveal'
import { site, siteUrl } from '@/lib/site'

export const metadata: Metadata = {
  title: 'Contact',
  description: `Get in touch about Rails, AI and platform work. I reply within ${site.responseTime}.`,
  // Setting `alternates` replaces the layout's, so the feed link is restated here.
  alternates: {
    canonical: `${siteUrl}/contact`,
    types: { 'application/rss+xml': [{ url: '/writing/rss.xml', title: `${site.person} — Writing` }] },
  },
}

export default function ContactPage() {
  return (
    <main className="flex-1 overflow-hidden">
      <ContactHero />

      {/* Form first: it's the main action, so it leads in both the layout and the reading order. */}
      <section aria-labelledby="contact-form-title" className="w-full pb-24 md:pb-32">
        <div className="container grid gap-12 lg:grid-cols-[minmax(0,1fr)_20rem] lg:gap-16 xl:grid-cols-[minmax(0,1fr)_22rem]">
          <Reveal immediate delay={0.25}>
            <div className="rounded-4xl border border-border bg-card p-6 shadow-soft sm:p-8 md:p-10">
              <h2 id="contact-form-title" className="text-2xl font-semibold tracking-tight sm:text-3xl">
                Tell me what you need
              </h2>
              <p className="mt-2 max-w-xl leading-relaxed text-muted-foreground">
                Most useful: the outcome you want, what is blocking it, and any deadline.
              </p>
              <div className="mt-8">
                <ContactForm />
              </div>
            </div>
          </Reveal>
          <ContactAside />
        </div>
      </section>
    </main>
  )
}
