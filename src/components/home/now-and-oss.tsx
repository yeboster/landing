import Link from 'next/link'
import { ArrowRight, ArrowUpRight, GitBranch, Zap } from 'lucide-react'

import { GithubStats } from '@/components/github-stats'
import { RevealGroup, RevealItem } from '@/components/motion/reveal'
import { TiltCard } from '@/components/tilt-card'
import { Card, CardIcon } from '@/components/ui/card'
import { Section, SectionHeader } from '@/components/ui/section'
import { site } from '@/lib/site'

import { city, nowStack } from './data'
import { TagList } from './tag-list'

const githubHandle = site.socials.github.replace(/^https?:\/\//, '')

const footerLink =
  'inline-flex items-center gap-1.5 rounded-sm text-sm font-medium text-muted-foreground transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand/50 [&_svg]:size-3.5'

/** Two equal-height cards: what I'm on, and the public record of it. */
function PanelCard({ icon, title, children, footer }: { icon: React.ReactNode; title: string; children: React.ReactNode; footer: React.ReactNode }) {
  return (
    <RevealItem as="li" className="h-full">
      <TiltCard maxTilt={2} className="h-full">
        <Card className="group flex h-full flex-col">
          <div className="flex items-center gap-4">
            <CardIcon>{icon}</CardIcon>
            <h3 className="text-xl font-semibold tracking-tight">{title}</h3>
          </div>
          <div className="mt-6 grow">{children}</div>
          <div className="mt-6 border-t border-border pt-5">{footer}</div>
        </Card>
      </TiltCard>
    </RevealItem>
  )
}

export function NowAndOss() {
  return (
    <Section aria-labelledby="now-title">
      <SectionHeader
        align="left"
        eyebrow="Now"
        titleId="now-title"
        title={
          <>
            What I&apos;m working on <em className="font-serif font-normal italic">today</em>
          </>
        }
      />

      <RevealGroup as="ul" className="grid grid-cols-1 items-stretch gap-6 md:grid-cols-2">
        <PanelCard
          icon={<Zap aria-hidden="true" />}
          title="Day job & side projects"
          footer={
            <Link href="/now" className={footerLink}>
              More detail on /now
              <ArrowRight aria-hidden="true" />
            </Link>
          }
        >
          <div className="space-y-3 text-sm leading-relaxed text-muted-foreground">
            <p>
              <span className="font-medium text-foreground">{site.role}</span> at{' '}
              <span className="font-medium text-foreground">{site.company}</span>, {city}: building anti-fraud products on
              Rails. Architected the TrustAI LLM framework, shipped GenAI and VoiceAI features.
            </p>
            <p>
              On the side: <span className="font-medium text-foreground">bon.so</span> (this site), a Talos/Kubernetes home
              cluster, and AI automation agents.
            </p>
          </div>
          <TagList tags={nowStack} className="mt-5" />
        </PanelCard>

        <PanelCard
          icon={<GitBranch aria-hidden="true" />}
          title="Open source, live"
          footer={
            <a href={site.socials.github} target="_blank" rel="noopener noreferrer" className={footerLink}>
              {githubHandle}
              <ArrowUpRight aria-hidden="true" />
              <span className="sr-only"> (opens in a new tab)</span>
            </a>
          }
        >
          <p className="mb-5 text-sm leading-relaxed text-muted-foreground">
            Public repos, followers and stars, pulled from GitHub and refreshed hourly.
          </p>
          <GithubStats />
        </PanelCard>
      </RevealGroup>
    </Section>
  )
}
