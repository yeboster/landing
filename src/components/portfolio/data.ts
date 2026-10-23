import { Code2, GitBranch, Github, Server, Terminal, type LucideIcon } from 'lucide-react'

import { site } from '@/lib/site'

/**
 * Static copy for /portfolio. Rendered by Server Components only, so holding
 * icon components here never crosses the server/client boundary.
 */

export type Skill = { icon: LucideIcon; title: string; description: string; tags: string[] }

export const skills: Skill[] = [
  {
    icon: Code2,
    title: 'TypeScript',
    description: 'Full-stack TypeScript across React, Next.js, Vue and Svelte.',
    tags: ['React', 'Next.js', 'Vue', 'Svelte'],
  },
  {
    icon: Terminal,
    title: 'Ruby',
    description: 'Backend at scale, from Rails 4 to Rails 8, with Roda and Sidekiq.',
    tags: ['Rails', 'Roda', 'Sidekiq'],
  },
  {
    icon: Server,
    title: 'DevOps',
    description: 'Containers, clusters and pipelines to ship with confidence.',
    tags: ['Docker', 'K8s', 'AWS', 'CI/CD'],
  },
]

export type Profile = { icon: LucideIcon; title: string; description: string; href: string }

export const profiles: Profile[] = [
  {
    icon: Github,
    title: 'GitHub',
    description: 'Current projects and open-source contributions.',
    href: site.socials.github,
  },
  {
    icon: GitBranch,
    title: 'GitLab',
    description: 'Older projects, from before the move to GitHub.',
    href: site.socials.gitlab,
  },
]
