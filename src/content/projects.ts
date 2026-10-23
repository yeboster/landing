import type { StaticImageData } from 'next/image'

import metaNamesLogo from '../../public/images/meta-names.png'
import todoistActionsLogo from '../../public/images/todoist-actions.png'
import kubernetesLogo from '../../public/images/kubernetes.png'

export type ProjectLinks = {
  /** Public source repository. */
  source?: string
  /** Deployed product or marketing site. */
  live?: string
}

export type Project = {
  slug: string
  title: string
  /** One-line positioning, suitable for compact lists. */
  summary: string
  /** Two-sentence description for cards and detail views. */
  description: string
  /** Static import of the project logo. Rendered on a light plate, so opaque backgrounds are fine. */
  image?: StaticImageData
  tags: string[]
  links: ProjectLinks
  featured?: boolean
}

export const projects: Project[] = [
  {
    slug: 'meta-names',
    title: 'Meta Names',
    summary: 'Web3 naming service on Partisia Blockchain',
    description:
      'A decentralized DNS for Partisia Blockchain, built across the whole stack: smart contracts in Rust, a TypeScript SDK for integrators and a Svelte front-end.',
    image: metaNamesLogo,
    tags: ['Rust', 'TypeScript', 'Svelte', 'Smart contracts'],
    links: { live: 'https://metanames.app' },
    featured: true,
  },
  {
    slug: 'jokehub',
    title: 'JokeHub',
    summary: 'A curated home for good humor',
    description: 'A hub to browse, share and enjoy curated jokes, written in TypeScript and live on the web.',
    tags: ['TypeScript', 'Web app'],
    links: { live: 'https://jokehub.org', source: 'https://github.com/yeboster/jokehub' },
  },
  {
    slug: 'todoist-actions',
    title: 'Todoist Actions',
    summary: 'Workflow automation for Todoist',
    description:
      'Automations that add custom behaviour to Todoist projects and tasks: the personal workflows I rely on every day.',
    image: todoistActionsLogo,
    tags: ['Automation', 'Productivity'],
    links: { source: 'https://github.com/yeboster/todoist-actions' },
  },
  {
    slug: 'gitops-k8s',
    title: 'GitOps K8s Cluster',
    summary: 'A Kubernetes homelab, run through Git',
    description:
      'A homelab Kubernetes cluster declared in Git: bootstrapped with Ansible and continuously reconciled by FluxCD.',
    image: kubernetesLogo,
    tags: ['Kubernetes', 'GitOps', 'Ansible', 'FluxCD'],
    links: { source: 'https://github.com/yeboster/k8s' },
  },
]

/** The link a project card should open: the live product when there is one, otherwise its source. */
export function primaryLink(project: Project): { href: string; kind: keyof ProjectLinks } | undefined {
  if (project.links.live) return { href: project.links.live, kind: 'live' }
  if (project.links.source) return { href: project.links.source, kind: 'source' }
  return undefined
}
