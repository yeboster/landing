import Link from 'next/link'
import { ArrowUp, ArrowUpRight, Github, Gitlab, Send, Twitter } from 'lucide-react'

import { Logo } from '@/components/ui/logo'
import { mailto, navLinks, siteConfig, socialLinks } from '@/lib/site'

const socialIcons = {
  github: Github,
  gitlab: Gitlab,
  telegram: Send,
  twitter: Twitter,
} as const

const socials = (Object.keys(socialLinks) as (keyof typeof socialLinks)[]).map((key) => ({
  key,
  ...socialLinks[key],
  Icon: socialIcons[key],
}))

const linkClass =
  'inline-flex items-center gap-2 rounded-sm text-sm text-muted-foreground transition-colors duration-200 hover:text-foreground'

function ColumnHeading({ id, children }: { id: string; children: React.ReactNode }) {
  return (
    <h2 id={id} className="font-mono text-xs font-medium uppercase tracking-widest text-foreground">
      {children}
    </h2>
  )
}

export function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="border-t bg-subtle">
      <div className="container py-14 md:py-16">
        <div className="grid gap-10 sm:grid-cols-2 md:grid-cols-12 md:gap-8">
          {/* Brand */}
          <div className="sm:col-span-2 md:col-span-5">
            <Link
              href="/"
              aria-label={`${siteConfig.name}, home`}
              className="inline-flex items-center gap-2.5 rounded-full text-foreground"
            >
              <Logo size={24} />
              <span className="font-semibold tracking-tight">{siteConfig.name}</span>
            </Link>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-muted-foreground">
              Full-stack engineer building reliable products, end to end.
            </p>
          </div>

          {/* Navigate */}
          <nav aria-labelledby="footer-navigate" className="md:col-span-2">
            <ColumnHeading id="footer-navigate">Navigate</ColumnHeading>
            <ul className="mt-4 space-y-3">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className={linkClass}>
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Elsewhere */}
          <div className="md:col-span-2">
            <ColumnHeading id="footer-elsewhere">Elsewhere</ColumnHeading>
            <ul aria-labelledby="footer-elsewhere" className="mt-4 space-y-3">
              {socials.map(({ key, label, href, Icon }) => (
                <li key={key}>
                  <a href={href} target="_blank" rel="noopener noreferrer" className={`group ${linkClass}`}>
                    <Icon aria-hidden="true" className="size-4 shrink-0" />
                    {label}
                    <ArrowUpRight
                      aria-hidden="true"
                      className="size-3 -translate-x-1 opacity-0 transition-all duration-300 ease-out-expo group-hover:translate-x-0 group-hover:opacity-100"
                    />
                    <span className="sr-only">(opens in a new tab)</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Get in touch */}
          <div className="sm:col-span-2 md:col-span-3">
            <ColumnHeading id="footer-contact">Get in touch</ColumnHeading>
            <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
              Have a project in mind or just want to say hi? My inbox is open.
            </p>
            <a
              href={mailto()}
              className="group mt-3 inline-flex items-center gap-1.5 rounded-sm text-sm font-medium text-foreground underline-offset-4 hover:underline"
            >
              {siteConfig.email}
              <ArrowUpRight
                aria-hidden="true"
                className="size-3.5 text-muted-foreground transition-transform duration-300 ease-out-expo group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-brand"
              />
            </a>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 flex flex-col gap-4 border-t pt-6 text-xs text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {year} {siteConfig.name}. All rights reserved.
          </p>
          <div className="flex items-center gap-5">
            <p className="font-serif text-sm italic">{siteConfig.tagline}.</p>
            <a
              href="#main"
              className="group inline-flex items-center gap-1 rounded-sm transition-colors hover:text-foreground"
            >
              Back to top
              <ArrowUp
                aria-hidden="true"
                className="size-3 transition-transform duration-300 ease-out-expo group-hover:-translate-y-0.5"
              />
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
