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

/** What an outbound project link points at. Stated in data so no UI has to guess from the URL. */
export type ProjectLinkKind = 'website' | 'source'

export interface ProjectLink {
  kind: ProjectLinkKind
  label: string
  href: string
}

export interface Project {
  /** Matches a file in src/content/projects; the card links to a case study when one exists. */
  slug: string
  title: string
  description: string
  image?: StaticImageData
  icon?: LucideIcon
  alt: string
  /** The project's primary outbound link. */
  href: string
  /** Whether `href` is the live product or its repository. */
  hrefKind: ProjectLinkKind
  /** A live site, when `href` is the repository. */
  liveUrl?: string
  tags: string[]
  /** Only set where existing copy states it; shown in the case-study hero. */
  role?: string
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
    description:
      'A Web3 DNS on Partisia Blockchain, built full stack: smart contracts in Rust, an SDK in TypeScript and front-end work in Svelte and React.',
    image: metaNamesLogo,
    alt: 'Meta Names logo',
    href: 'https://metanames.app',
    hrefKind: 'website',
    tags: ['Rust', 'TypeScript', 'Svelte', 'React', 'Blockchain'],
    role: 'Full stack',
    featured: true,
    highlight: true,
  },
  {
    slug: 'jokehub',
    title: 'JokeHub',
    description: 'A hub for jokes: browse, share and enjoy curated humor.',
    icon: Laugh,
    alt: 'JokeHub',
    href: 'https://github.com/yeboster/jokehub',
    hrefKind: 'source',
    liveUrl: 'https://jokehub.org',
    tags: ['TypeScript', 'Web App'],
  },
  {
    slug: 'todoist-actions',
    title: 'Todoist Actions',
    description: 'Workflow automation that adds custom behaviors to Todoist projects and tasks. A personal collection of workflows I use daily.',
    image: todoistActionsLogo,
    alt: 'Todoist Actions logo',
    href: 'https://github.com/yeboster/todoist-actions',
    hrefKind: 'source',
    tags: ['Automation', 'Productivity'],
  },
  {
    slug: 'gitops-k8s-cluster',
    title: 'GitOps K8s Cluster',
    description: 'A Kubernetes cluster run through GitOps: bootstrapped with Ansible, reconciled by FluxCD.',
    image: kubernetesLogo,
    alt: 'Kubernetes logo',
    href: 'https://github.com/yeboster/k8s',
    hrefKind: 'source',
    tags: ['Kubernetes', 'Ansible', 'FluxCD'],
    highlight: true,
  },
]

/** Projects that carry the homepage strip, alongside current professional work. */
export const highlightedProjects = projects.filter((project) => project.highlight)

const linkLabels: Record<ProjectLinkKind, string> = { website: 'Website', source: 'Source' }

/** Every outbound link for a project, website first, labelled from data. */
export function projectLinks(project: Project): ProjectLink[] {
  const links: ProjectLink[] = [{ kind: project.hrefKind, label: linkLabels[project.hrefKind], href: project.href }]
  if (project.liveUrl) links.push({ kind: 'website', label: linkLabels.website, href: project.liveUrl })
  return links.sort((a, b) => (a.kind === b.kind ? 0 : a.kind === 'website' ? -1 : 1))
}

export function getProject(slug: string): Project | undefined {
  return projects.find((project) => project.slug === slug)
}
