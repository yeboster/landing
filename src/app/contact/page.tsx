import type { Metadata } from 'next'
import { ArrowUpRight, Check, Github, Mail, Send, Twitter } from 'lucide-react'

import { CopyEmailButton } from '@/components/contact/copy-email-button'
import { Reveal, RevealGroup, RevealItem } from '@/components/motion/reveal'
import { PageHero } from '@/components/page-hero'
import { Button } from '@/components/ui/button'
import { CardIcon } from '@/components/ui/card'
import { Section, SectionHeader } from '@/components/ui/section'
import { mailto, siteConfig, socialLinks } from '@/lib/site'
import { cn } from '@/lib/utils'

export const metadata: Metadata = {
  title: 'Contact',
  description: `Get in touch with ${siteConfig.name} about projects, collaborations or engineering questions, by email, Telegram, X or GitHub.`,
  alternates: { canonical: '/contact' },
}

type Channel = {
  title: string
  purpose: string
  handle: string
  href: string
  icon: React.ReactNode
  external: boolean
}

const channels: Channel[] = [
  {
    title: 'Email',
    purpose: 'Best for project inquiries and anything detailed.',
    handle: siteConfig.email,
    href: mailto('Project inquiry'),
    icon: <Mail />,
    external: false,
  },
  {
    title: socialLinks.telegram.label,
    purpose: 'Quick questions and informal chats.',
    handle: socialLinks.telegram.handle,
    href: socialLinks.telegram.href,
    icon: <Send />,
    external: true,
  },
  {
    title: socialLinks.twitter.label,
    purpose: 'Follow along with what I’m building.',
    handle: socialLinks.twitter.handle,
    href: socialLinks.twitter.href,
    icon: <Twitter />,
    external: true,
  },
  {
    title: socialLinks.github.label,
    purpose: 'Code, issues and open-source collaboration.',
    handle: socialLinks.github.handle,
    href: socialLinks.github.href,
    icon: <Github />,
    external: true,
  },
]

const goodFits = [
  'Building or scaling a web product, end to end',
  'Backend, APIs and infrastructure work',
  'Open-source collaborations and side projects',
  'A second pair of eyes on an architecture or codebase',
]

const messageChecklist = [
  'A few lines about you and what you’re working on',
  'What you want to achieve, and a rough timeline',
  'Any useful links: product, repository, docs',
]

function ChannelCard({ channel }: { channel: Channel }) {
  const externalProps = channel.external ? { target: '_blank', rel: 'noopener noreferrer' } : {}

  return (
    <a
      href={channel.href}
      {...externalProps}
      className={cn(
        'group relative flex h-full flex-col rounded-3xl border bg-card p-6 shadow-sm',
        'transition-all duration-500 ease-out-expo hover:-translate-y-1 hover:border-foreground/15 hover:shadow-lift',
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background'
      )}
    >
      <div className="flex items-start justify-between">
        <CardIcon>{channel.icon}</CardIcon>
        <ArrowUpRight
          aria-hidden
          className="size-5 text-muted-foreground transition-all duration-300 ease-out-expo group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-foreground"
        />
      </div>
      <h3 className="mt-6 text-lg font-semibold tracking-tight">
        {channel.title}
        {channel.external && <span className="sr-only"> (opens in new tab)</span>}
      </h3>
      <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">{channel.purpose}</p>
      <p className="mt-auto truncate pt-6 font-mono text-xs text-muted-foreground transition-colors duration-300 group-hover:text-foreground">
        {channel.handle}
      </p>
    </a>
  )
}

function CheckList({ title, items }: { title: string; items: string[] }) {
  return (
    <div>
      <h3 className="text-lg font-semibold tracking-tight">{title}</h3>
      <ul className="mt-5 space-y-3">
        {items.map((item) => (
          <li key={item} className="flex gap-3 text-sm leading-relaxed text-muted-foreground md:text-base">
            <span
              aria-hidden
              className="mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full bg-brand-soft text-brand md:mt-1"
            >
              <Check className="size-3" strokeWidth={3} />
            </span>
            {item}
          </li>
        ))}
      </ul>
    </div>
  )
}

export default function ContactPage() {
  return (
    <>
      <PageHero
        eyebrow="Contact"
        title={
          <>
            Let&apos;s build something <em className="font-serif font-normal italic">together</em>
          </>
        }
        description="Have a project in mind, a role to discuss, or an idea you want to think through? I'd be glad to hear from you."
      >
        <div className="flex flex-col items-center gap-6">
          <div className="flex flex-col items-center gap-3 sm:flex-row">
            <Button asChild size="lg">
              <a href={mailto()}>
                <Mail />
                Email me
              </a>
            </Button>
            <CopyEmailButton email={siteConfig.email} className="h-12" />
          </div>
          <p className="inline-flex items-center gap-2 text-sm text-muted-foreground">
            <span aria-hidden className="relative flex size-2">
              <span className="absolute inset-0 animate-pulse-dot rounded-full bg-brand" />
            </span>
            Open to new projects &amp; collaborations
          </p>
        </div>
      </PageHero>

      <Section className="pt-0 md:pt-0">
        <SectionHeader
          eyebrow="Channels"
          title="Pick whatever works for you"
          description="Email is best for anything detailed. For a quick question, a message on Telegram works just as well."
        />
        <RevealGroup className="mx-auto grid max-w-6xl gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {channels.map((channel) => (
            <RevealItem key={channel.title} className="h-full">
              <ChannelCard channel={channel} />
            </RevealItem>
          ))}
        </RevealGroup>
      </Section>

      <Section tone="subtle">
        <div className="mx-auto grid max-w-5xl gap-12 md:grid-cols-[1fr_1fr] md:gap-16">
          <Reveal>
            <CheckList title="Good fits" items={goodFits} />
          </Reveal>
          <Reveal delay={0.08}>
            <CheckList title="What to include in your message" items={messageChecklist} />
            <p className="mt-8 border-t pt-6 text-sm text-muted-foreground">
              I usually reply within a few days.
            </p>
          </Reveal>
        </div>
      </Section>
    </>
  )
}
