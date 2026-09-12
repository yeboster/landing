/**
 * Canonical identity for the whole site.
 *
 * Every fact that appears on more than one page lives here — name, role,
 * employer, location, availability, response time. When the portfolio says
 * "Rails 8" and the About page says "Rails 5–7", the reader stops trusting
 * both; a single source is the cheapest way to stop that happening.
 */

export const siteUrl = 'https://bon.so'

export const site = {
  siteUrl,

  /** Brand/monogram: the logo lockup, the footer, the social handles. */
  name: 'Yeboster',
  /** Real name — the thing a hiring manager actually searches for. */
  person: 'Marco Vaccari',
  /** The role, in the words a job description would use. */
  role: 'Software Engineer',
  /**
   * One sentence, outcome first. Drives the hero and the page description,
   * so it has to survive being read with no other context.
   */
  pitch: 'I build anti-fraud and AI systems with Rails, TypeScript, and Rust.',

  company: 'Trustpair',
  location: 'Paris, France',
  timezone: 'Europe/Paris',

  email: 'contact@yeboster.com',
  booking: 'https://cal.com/marcovaccari',
  tagline: 'Build Together to Live Forever',

  /** How long a reply takes. Stated as a promise, so keep it true. */
  responseTime: 'two business days',

  availability: {
    label: 'Open to freelance & collaborations',
    detail: 'Anti-fraud, AI and platform work on Rails. I reply within two business days.',
  },

  /** Kinds of work worth an email — filters vague leads before they arrive. */
  engagements: [
    'Rails & backend architecture',
    'LLM / AI features in production',
    'Kubernetes & platform engineering',
  ],

  /** The printable CV is the About page, which carries print-only styling. */
  resumePath: '/about',

  socials: {
    github: 'https://github.com/yeboster',
    gitlab: 'https://gitlab.com/yeboster',
    twitter: 'https://twitter.com/yeboster',
    linkedin: 'https://fr.linkedin.com/in/yeboster',
  },
} as const

/** Title used when a page does not set its own. */
export const defaultTitle = `${site.person} — Rails, AI & Platform Engineer`
