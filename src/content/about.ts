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
    description: 'Building anti-fraud products and AI features on Rails 8 with Sidekiq and some React.',
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
    role: 'Cyber Security Student',
    org: 'CyberChallengeIT',
    place: 'Udine',
    description: 'A 360° view of cybersecurity: software security, cryptography, web and hardware security.',
  },
  {
    period: '2018 — 2019',
    role: 'Software Developer',
    org: 'Satelicom',
    place: 'Vicenza',
    description: 'Web applications on Ruby on Rails up to 5.2, plus Android apps in Kotlin and Java.',
  },
  {
    period: '2013 — 2018',
    role: 'Computer science',
    org: 'ITT G. Chilesotti',
    place: 'Thiene',
    description: 'Where tinkering turned into a career, from first scripts to production systems.',
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
  { title: 'Clean code', description: 'Code that humans can read, not just machines.' },
  { title: 'Keep learning', description: 'Always exploring new technologies and pushing past what I know.' },
  { title: 'Ship, then improve', description: 'Bias towards action. Build, iterate, improve.' },
  { title: 'User first', description: 'Every line of code serves a person on the other side.' },
  { title: 'Deep work', description: 'Focused sessions over scattered multitasking.' },
  { title: 'Simplicity', description: 'The best solution is often the simplest one.' },
]
