import { site } from '@/lib/site'

/** "Paris", from "Paris, France": the short form reads better mid-sentence. */
export const city = site.location.split(',')[0]

/** Cycled beside the role in the hero. Each one is backed by the work below. */
export const specialisms = ['Rails engineer', 'TypeScript & Rust', 'Kubernetes & GitOps', 'AI feature builder']

/**
 * Facts a reader can check, in place of adjectives they cannot.
 * Each one restates something the CV and the project pages already claim.
 */
export const credibility = [
  { label: 'Currently', value: `${site.company}, ${city}: anti-fraud platform on Rails 8` },
  { label: 'Architected', value: 'TrustAI, the LLM framework behind our AI features' },
  { label: 'Shipped', value: 'GenAI features into production' },
  { label: 'Runs at home', value: 'A Talos Kubernetes cluster, reconciled by FluxCD' },
]

/** The professional card that leads the selected-work grid. */
export const currentWork = {
  description:
    'Anti-fraud platform on Rails 8 with Sidekiq. I architected the TrustAI LLM framework and shipped GenAI features on top of it.',
  tags: ['Rails 8', 'Sidekiq', 'LLM', 'React'],
}

export const manifesto = `${site.role} at ${site.company} in ${city}, building anti-fraud products and AI features on Rails. Off the clock: a Talos Kubernetes home cluster run via GitOps, and AI automation agents. Built together, made to last.`

export const nowStack = ['TypeScript', 'Rust', 'Kubernetes', 'Rails']

/** "A, B, and C": the engagement list as a sentence, casing untouched. */
export const engagementsSentence = new Intl.ListFormat('en', { type: 'conjunction' }).format(site.engagements)
