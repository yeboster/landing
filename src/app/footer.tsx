import Link from 'next/link'
import { ArrowUpRight, CalendarDays, Github, Gitlab, Linkedin, Mail, MapPin, Twitter } from 'lucide-react'

import { footerNav } from '@/components/chrome/nav-config'
import { PaletteHint } from '@/components/chrome/palette-trigger'
import { Logo } from '@/components/ui/logo'
import { site } from '@/lib/site'

const socials = [
  { href: site.socials.github, label: 'GitHub', icon: <Github aria-hidden="true" /> },
  { href: site.socials.gitlab, label: 'GitLab', icon: <Gitlab aria-hidden="true" /> },
  { href: site.socials.linkedin, label: 'LinkedIn', icon: <Linkedin aria-hidden="true" /> },
  { href: site.socials.twitter, label: 'Twitter', icon: <Twitter aria-hidden="true" /> },
]

const linkClass =
  'group inline-flex items-center gap-2.5 rounded text-sm text-muted-foreground transition-colors duration-200 hover:text-foreground [&_svg]:size-4 [&_svg]:shrink-0'

function ColumnTitle({ id, children }: { id: string; children: React.ReactNode }) {
  return (
    <h3 id={id} className="font-mono text-[11px] font-medium uppercase tracking-[0.14em] text-muted-foreground">
      {children}
    </h3>
  )
}

function NewTab() {
  return <span className="sr-only"> (opens in a new tab)</span>
}

export function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer aria-labelledby="footer-title" className="relative border-t border-border bg-subtle">
      {/* Brand hairline along the top edge. */}
      <div aria-hidden="true" className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-brand/50 to-transparent" />
      <h2 id="footer-title" className="sr-only">
        Site footer
      </h2>

      <div className="container py-14 md:py-16">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-12 lg:gap-8">
          <div className="sm:col-span-2 lg:col-span-5">
            <Link href="/" className="inline-flex items-center gap-2.5 rounded-lg">
              <Logo width={28} height={28} alt="" className="size-7" />
              <span className="text-base font-semibold tracking-tight text-foreground">{site.person}</span>
            </Link>
            <p className="mt-4 text-sm text-muted-foreground">
              {site.role} at <span className="text-foreground">{site.company}</span>
            </p>
            <p className="mt-1.5 flex items-center gap-1.5 text-sm text-muted-foreground">
              <MapPin aria-hidden="true" className="size-3.5" />
              {site.location}
            </p>
            <p className="mt-6 hidden font-mono text-xs text-muted-foreground md:block">
              <PaletteHint>Lost? Press</PaletteHint>
            </p>
          </div>

          <nav aria-labelledby="footer-navigate" className="lg:col-span-2">
            <ColumnTitle id="footer-navigate">Navigate</ColumnTitle>
            <ul className="mt-4 space-y-3">
              {footerNav.map((link) => (
                <li key={link.label}>
                  <Link href={link.href} className={linkClass}>
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="lg:col-span-2">
            <ColumnTitle id="footer-elsewhere">Elsewhere</ColumnTitle>
            <ul aria-labelledby="footer-elsewhere" className="mt-4 space-y-3">
              {socials.map((social) => (
                <li key={social.label}>
                  <a href={social.href} target="_blank" rel="noopener noreferrer" className={linkClass}>
                    {social.icon}
                    {social.label}
                    <NewTab />
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="sm:col-span-2 lg:col-span-3">
            <ColumnTitle id="footer-contact">Contact</ColumnTitle>
            <ul aria-labelledby="footer-contact" className="mt-4 space-y-3">
              <li>
                <a href={`mailto:${site.email}`} className={linkClass}>
                  <Mail aria-hidden="true" />
                  {site.email}
                </a>
              </li>
              <li>
                <a href={site.booking} target="_blank" rel="noopener noreferrer" className={linkClass}>
                  <CalendarDays aria-hidden="true" />
                  Book a call
                  <ArrowUpRight
                    aria-hidden="true"
                    className="!size-3.5 opacity-60 transition-transform duration-300 ease-out-expo group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                  />
                  <NewTab />
                </a>
              </li>
            </ul>
            <p className="mt-4 text-xs text-muted-foreground">I reply within {site.responseTime}.</p>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-2 border-t border-border pt-6 text-xs text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {year} {site.person}. All rights reserved.
          </p>
          <p className="font-mono">
            {site.name} · {site.tagline}
          </p>
        </div>
      </div>
    </footer>
  )
}
