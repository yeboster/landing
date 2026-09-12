import type { StaticImageData } from 'next/image'
import { Laugh, type LucideIcon } from 'lucide-react'

import metaNamesLogo from '../../public/images/meta-names.png'
import kubernetesLogo from '../../public/images/kubernetes.png'
import todoistActionsLogo from '../../public/images/todoist-actions.png'

/**
 * The project list, shared by /portfolio and the homepage featured-work strip.
 *
 * `slug` is load-bearing: a matching Markdown file in `src/content/projects`
 * turns the card into a case study, and the homepage only links out to a card
 * that has real detail behind it.
 */

export interface Project {
  /** Matches a file in src/content/projects; the card links to a case study when one exists. */
  slug: string
  title: string
  description: string
  image?: StaticImageData
  icon?: LucideIcon
  alt: string
  href: string
  liveUrl?: string
  tags: string[]
  featured?: boolean
  /**
   * Shown on the homepage strip, in order. The strip pairs these with a card
   * for current professional work, so it reads as three pieces of evidence.
   */
  highlight?: boolean
}

export const projects: Project[] = [
  {
    slug: 'meta-names',
    title: 'Meta Names',
    description: 'A Web3 DNS system on Partisia Blockchain. Full stack — smart contracts in Rust, SDK in TypeScript, front-end in Svelte.',
    image: metaNamesLogo,
    alt: 'Meta Names Logo',
    href: 'https://metanames.app',
    tags: ['Rust', 'TypeScript', 'Svelte', 'Blockchain'],
    featured: true,
    highlight: true,
  },
  {
    slug: 'jokehub',
    title: 'JokeHub',
    description: 'A hub for jokes — browse, share, and enjoy curated humor. Live at jokehub.org.',
    icon: Laugh,
    alt: 'JokeHub',
    href: 'https://github.com/yeboster/jokehub',
    liveUrl: 'https://jokehub.org',
    tags: ['TypeScript', 'Web App'],
  },
  {
    slug: 'todoist-actions',
    title: 'Todoist Actions',
    description: 'Workflow automation for custom behaviors on projects and tasks. A personal collection of daily-use workflows.',
    image: todoistActionsLogo,
    alt: 'Todoist Actions',
    href: 'https://github.com/yeboster/todoist-actions',
    tags: ['Automation', 'Productivity'],
  },
  {
    slug: 'gitops-k8s-cluster',
    title: 'GitOps K8s Cluster',
    description: 'Kubernetes cluster orchestrated via GitOps. Bootstrapped with Ansible, managed with FluxCD.',
    image: kubernetesLogo,
    alt: 'Kubernetes Logo',
    href: 'https://github.com/yeboster/k8s',
    tags: ['Kubernetes', 'Ansible', 'FluxCD'],
    highlight: true,
  },
]

/** Projects that carry the homepage strip, alongside current professional work. */
export const highlightedProjects = projects.filter((project) => project.highlight)
