import { site } from '@/lib/site'

export type NavLink = { href: string; label: string }

/**
 * Primary navigation, in the order a hiring manager or a client wants it:
 * proof first, then who, then thinking, then contact.
 */
export const primaryNav: NavLink[] = [
  { href: '/portfolio', label: 'Work' },
  { href: '/about', label: 'About' },
  { href: '/writing', label: 'Writing' },
  { href: '/contact', label: 'Contact' },
]

/** The footer adds /now and the printable résumé, which don't earn a spot in the top bar. */
export const footerNav: NavLink[] = [
  { href: '/portfolio', label: 'Work' },
  { href: '/about', label: 'About' },
  { href: '/writing', label: 'Writing' },
  { href: '/now', label: 'Now' },
  { href: site.resumePath, label: 'Résumé' },
  { href: '/contact', label: 'Contact' },
]

/** A section is active on its own page and on anything nested under it. */
export function isActivePath(pathname: string, href: string) {
  if (href === '/') return pathname === '/'
  return pathname === href || pathname.startsWith(`${href}/`)
}
