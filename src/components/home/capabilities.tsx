import { Cloud, Code2, Server, Sparkles } from 'lucide-react'

import { Reveal, RevealGroup, RevealItem } from '@/components/motion/reveal'
import { Card, CardIcon } from '@/components/ui/card'
import { Section, SectionHeader } from '@/components/ui/section'
import { Spotlight } from './spotlight'

const capabilities = [
  {
    icon: <Code2 />,
    title: 'Product engineering',
    description:
      'Fast, accessible interfaces in TypeScript with React, Next.js, Vue and Svelte, built with care for the details people actually notice.',
    stack: ['TypeScript', 'React', 'Next.js', 'Svelte'],
  },
  {
    icon: <Server />,
    title: 'Backend & systems',
    description:
      'APIs, background jobs and services in Ruby and Rust, smart contracts included. Designed to be predictable and boring in production.',
    stack: ['Rails', 'Roda', 'Sidekiq', 'Rust'],
  },
  {
    icon: <Cloud />,
    title: 'Infrastructure & DevOps',
    description:
      'Containerized workloads on Kubernetes and AWS, shipped through CI/CD and managed declaratively with GitOps.',
    stack: ['Docker', 'Kubernetes', 'AWS', 'FluxCD'],
  },
]

export function Capabilities() {
  return (
    <Section aria-labelledby="capabilities-heading" className="pt-0 md:pt-0">
      <SectionHeader
        eyebrow="What I do"
        titleId="capabilities-heading"
        title={
          <>
            One engineer, the <em className="font-serif font-normal italic">whole</em> stack.
          </>
        }
        description="From the interface people touch to the systems and infrastructure behind it, I own software across its entire lifecycle."
      />

      <RevealGroup as="ul" interval={0.1} className="grid gap-4 md:grid-cols-3 md:gap-6">
        {capabilities.map((item, index) => (
          <RevealItem as="li" key={item.title}>
            <Card className="group flex h-full flex-col overflow-hidden">
              <Spotlight />
              <div className="relative flex h-full flex-col">
                <div className="flex items-start justify-between">
                  <CardIcon>{item.icon}</CardIcon>
                  <span aria-hidden className="font-mono text-xs text-muted-foreground">
                    {String(index + 1).padStart(2, '0')}
                  </span>
                </div>
                <h3 className="mt-8 text-xl font-semibold tracking-tight">{item.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground md:text-[15px]">
                  {item.description}
                </p>
                <div className="mt-auto pt-8">
                  <p className="border-t pt-5 font-mono text-xs text-muted-foreground">
                    <span className="sr-only">Key tools: </span>
                    {item.stack.join(' / ')}
                  </p>
                </div>
              </div>
            </Card>
          </RevealItem>
        ))}
      </RevealGroup>

      <Reveal className="mt-10 flex justify-center">
        <p className="inline-flex items-center gap-2 text-sm text-muted-foreground">
          <Sparkles aria-hidden className="size-4 text-brand" />
          Currently exploring machine learning and data science.
        </p>
      </Reveal>
    </Section>
  )
}
