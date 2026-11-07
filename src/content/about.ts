/**
 * Career, skills and principles for /about, which is also the printable CV.
 * These are real dates, roles and places: edit them here, never in the page.
 */

export type TimelineEntry = {
  period: string
  role: string
  org: string
  place?: string
  description: string
  /** The role I hold today; highlighted on the timeline. */
  current?: boolean
}

export const timeline: TimelineEntry[] = [
  {
    period: '2022 — Now',
    role: 'Ruby on Rails Developer',
    org: 'Trustpair',
    place: 'Paris',
    description: 'Building anti-fraud products and AI features on Rails 8 with Sidekiq, plus React on the front end.',
    current: true,
  },
  {
    period: '2020 — 2022',
    role: 'Web Developer',
    org: 'Develon Group',
    description:
      'Built and maintained web apps with Ruby on Rails 4/5 and JavaScript/TypeScript (Adonis, NestJS, Nuxt), deployed with Docker and Kubernetes.',
  },
  {
    period: '2020',
    role: 'Cybersecurity Student',
    org: 'CyberChallenge.IT',
    place: 'Udine',
    description: 'Training in software security, cryptography, web security and hardware security.',
  },
  {
    period: '2018 — 2019',
    role: 'Software Developer',
    org: 'Satelicom',
    place: 'Vicenza',
    description: 'Built web applications with Ruby on Rails (up to 5.2) and Android apps in Kotlin and Java.',
  },
  {
    period: '2013 — 2018',
    role: 'Computer Science',
    org: 'ITT G. Chilesotti',
    place: 'Thiene',
    description: 'Technical secondary school, computer science track.',
  },
  {
    period: 'Alongside',
    role: 'Builder',
    org: 'Side projects',
    description:
      'bon.so (Next.js), a Talos/Kubernetes home cluster managed via GitOps with FluxCD, Helm and Kustomize, and AI automation agents.',
  },
]

export type SkillGroup = { title: string; items: string[] }

export const skills: SkillGroup[] = [
  { title: 'Languages', items: ['Ruby', 'TypeScript', 'Rust', 'Python'] },
  {
    title: 'Frameworks',
    items: ['Rails 4 → 8', 'Sidekiq', 'Next.js', 'NestJS', 'Nuxt', 'React', 'SvelteKit', 'Vue', 'Tailwind CSS'],
  },
  { title: 'Functional', items: ['Elixir', 'Elm'] },
  { title: 'Infrastructure', items: ['Kubernetes', 'FluxCD', 'Helm', 'Kustomize', 'Docker', 'Linux', 'Cloud'] },
  { title: 'Security', items: ['Pen-testing', 'Web security'] },
  { title: 'Blockchain', items: ['Rust smart contracts'] },
]

export type Principle = { title: string; description: string }

export const principles: Principle[] = [
  { title: 'Readable code', description: 'Code is written for the next person who has to change it.' },
  { title: 'Keep learning', description: 'I learn a new tool by building something real with it.' },
  { title: 'Ship, then improve', description: 'Release a small working version first, then improve it with real feedback.' },
  { title: 'User first', description: 'Start from the problem the user has, not from the technology.' },
  { title: 'Deep work', description: 'Long focused blocks on one problem, not constant context switching.' },
  { title: 'Simplicity', description: 'Choose the simplest design that solves the problem. Add complexity only when it is needed.' },
]
