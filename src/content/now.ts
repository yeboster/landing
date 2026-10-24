import { site } from '@/lib/site'

/**
 * The /now page, in the spirit of nownownow.com. Bump `updated` whenever the
 * focus list changes, or the page quietly goes stale.
 */

export const updated = 'August 2026'

export type FocusItem = {
  /** Picks the icon; see `focusIcons` in components/now/focus-grid.tsx. */
  kind: 'work' | 'infra' | 'agents' | 'site'
  title: string
  description: string
}

export const focus: FocusItem[] = [
  {
    kind: 'work',
    title: `${site.company}, Paris`,
    description: `${site.role} building anti-fraud products on Rails 8 with Sidekiq. Architected the TrustAI LLM framework and shipped GenAI features.`,
  },
  {
    kind: 'infra',
    title: 'Home Kubernetes cluster',
    description: 'Running a Talos/Kubernetes home cluster, managed via GitOps with FluxCD, Helm and Kustomize.',
  },
  {
    kind: 'agents',
    title: 'AI automation agents',
    description: 'Building agents that automate parts of my own workflow, from code review to infra maintenance.',
  },
  {
    kind: 'site',
    title: 'bon.so',
    description: 'This site: a Next.js playground for trying out new interaction and motion ideas.',
  },
]

export const stack = ['TypeScript', 'Rust', 'Kubernetes', 'Rails']
