// Single source of truth for brand, navigation and contact details.

export const siteConfig = {
  name: 'Yeboster',
  tagline: 'Build together to live forever',
  title: 'Yeboster — Full-stack engineer & builder',
  description:
    'Full-stack engineer building reliable products with TypeScript, Ruby, Rust and Kubernetes. Selected work, principles and ways to get in touch.',
  url: 'https://yeboster.com',
  email: 'contact@yeboster.com',
  locale: 'en_US',
  twitterHandle: '@yeboster',
} as const

export const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/about', label: 'About' },
  { href: '/portfolio', label: 'Work' },
  { href: '/contact', label: 'Contact' },
] as const

export const socialLinks = {
  github: { label: 'GitHub', handle: 'yeboster', href: 'https://github.com/yeboster' },
  gitlab: { label: 'GitLab', handle: 'yeboster', href: 'https://gitlab.com/yeboster' },
  telegram: { label: 'Telegram', handle: '@yeboster', href: 'https://t.me/yeboster' },
  twitter: { label: 'X / Twitter', handle: '@yeboster', href: 'https://twitter.com/yeboster' },
} as const

export const mailto = (subject = 'Hello') =>
  `mailto:${siteConfig.email}?subject=${encodeURIComponent(subject)}`
