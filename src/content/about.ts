import {
  Braces,
  Cloud,
  Code2,
  Coffee,
  Compass,
  FlaskConical,
  Heart,
  LayoutTemplate,
  Lightbulb,
  Rocket,
  Route,
  Server,
  Sparkles,
  Zap,
  type LucideIcon,
} from 'lucide-react'

// Content for the About page. Icons are rendered on the server only.

export type TimelineEntry = {
  label: string
  title: string
  description: string
  icon: LucideIcon
  /** Highlights the entry as the current chapter. */
  current?: boolean
}

export const journey: TimelineEntry[] = [
  {
    label: 'The path',
    title: 'From curiosity to craft',
    description:
      'It started with tinkering: small scripts, broken builds and a lot of reading. Little by little, those experiments grew into real products and production systems.',
    icon: Route,
  },
  {
    label: 'Now',
    title: 'Full-stack engineer',
    description:
      'Building products end to end with TypeScript, Ruby and Rust, and running them on Docker and Kubernetes. On the side, I ship projects like Meta Names, JokeHub and a GitOps-managed homelab cluster.',
    icon: Compass,
    current: true,
  },
  {
    label: 'The future',
    title: 'Builder & creator',
    description:
      'Bringing software engineering and data science closer together. I’m exploring machine learning to build tools that are genuinely useful, and learning a lot along the way.',
    icon: Sparkles,
  },
]

export type Principle = {
  title: string
  description: string
  icon: LucideIcon
}

export const principles: Principle[] = [
  {
    title: 'Clean Code',
    description:
      'Code is read far more often than it is written. I optimise for the next person who opens the file.',
    icon: Code2,
  },
  {
    title: 'Continuous Learning',
    description:
      'New languages, paradigms and tools keep my judgement sharp and my defaults honest.',
    icon: Lightbulb,
  },
  {
    title: 'Ship Fast',
    description: 'A bias for action. Ship small, learn quickly, iterate. Momentum compounds.',
    icon: Rocket,
  },
  {
    title: 'User First',
    description:
      'Every line of code serves someone on the other side of the screen. Their experience is the real spec.',
    icon: Heart,
  },
  {
    title: 'Deep Work',
    description:
      'Long, focused sessions beat scattered multitasking. Hard problems deserve undivided attention.',
    icon: Coffee,
  },
  {
    title: 'Simplicity',
    description:
      'The best solution is usually the simplest one that works. Complexity has to earn its place.',
    icon: Zap,
  },
]

export type ToolGroup = {
  area: string
  note: string
  icon: LucideIcon
  tools: string[]
}

export const toolbox: ToolGroup[] = [
  {
    area: 'Languages',
    note: 'Daily drivers',
    icon: Braces,
    tools: ['TypeScript', 'Ruby', 'Rust'],
  },
  {
    area: 'Frontend',
    note: 'Interfaces',
    icon: LayoutTemplate,
    tools: ['React', 'Next.js', 'Vue', 'Svelte'],
  },
  {
    area: 'Backend',
    note: 'Services & jobs',
    icon: Server,
    tools: ['Rails', 'Roda', 'Sidekiq'],
  },
  {
    area: 'Infrastructure',
    note: 'Ship & operate',
    icon: Cloud,
    tools: ['Docker', 'Kubernetes', 'AWS', 'CI/CD', 'GitOps'],
  },
  {
    area: 'Exploring',
    note: 'Currently learning',
    icon: FlaskConical,
    tools: ['Machine learning', 'Data science'],
  },
]
