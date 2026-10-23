import type { Metadata } from 'next'
import Link from 'next/link'

import { PaletteHint } from '@/components/chrome/palette-trigger'
import { Eyebrow } from '@/components/ui/eyebrow'

export const metadata: Metadata = { title: '404 — command not found' }

const routes = [
  { command: 'cd ~', href: '/', note: 'home' },
  { command: 'ls ~/work', href: '/portfolio', note: 'projects and case studies' },
  { command: 'cat ~/writing', href: '/writing', note: 'notes from the build' },
  { command: 'mail marco', href: '/contact', note: 'get in touch' },
]

function Prompt() {
  return (
    <span aria-hidden="true" className="select-none text-brand-ink">
      ❯
    </span>
  )
}

export default function NotFound() {
  return (
    <main className="relative flex flex-1 items-center overflow-hidden py-20 md:py-28">
      <div aria-hidden="true" className="bg-grid mask-radial pointer-events-none absolute inset-0" />

      <div className="container relative flex flex-col items-center text-center">
        <Eyebrow>Error 404</Eyebrow>
        <h1 className="mt-5 text-4xl font-semibold tracking-tight sm:text-5xl">
          This page <em className="font-serif font-normal italic">doesn&apos;t</em> exist.
        </h1>
        <p className="mt-4 max-w-md text-muted-foreground">
          The link may be broken, or I haven&apos;t built this page yet. One of these will get you back on track.
        </p>

        {/* The `dark` scope keeps the terminal dark in both themes while still using the tokens. */}
        <div className="dark mt-10 w-full max-w-xl overflow-hidden rounded-2xl border border-border bg-background text-left font-mono text-sm text-foreground shadow-lift">
          <div className="flex items-center gap-2 border-b border-border bg-card px-4 py-3">
            <span aria-hidden="true" className="flex gap-1.5">
              <span className="size-3 rounded-full bg-muted" />
              <span className="size-3 rounded-full bg-muted" />
              <span className="size-3 rounded-full bg-muted" />
            </span>
            <span className="ml-2 text-xs text-muted-foreground">marco@bon.so ~ zsh</span>
          </div>

          <div className="space-y-3 px-5 py-5">
            <p className="flex gap-2">
              <Prompt />
              <span>open page</span>
            </p>
            <p className="text-muted-foreground">zsh: command not found: 404</p>

            <ul className="space-y-1.5 pt-2" aria-label="Places to go instead">
              {routes.map((route) => (
                <li key={route.href}>
                  <Link
                    href={route.href}
                    className="group flex items-baseline gap-2 rounded-md py-0.5 transition-colors hover:text-brand-ink"
                  >
                    <Prompt />
                    <span className="underline decoration-border underline-offset-4 transition-colors group-hover:decoration-brand-ink">
                      {route.command}
                    </span>
                    <span className="text-xs text-muted-foreground"># {route.note}</span>
                  </Link>
                </li>
              ))}
            </ul>

            <p className="flex items-center gap-2 pt-1 text-muted-foreground">
              <Prompt />
              <span aria-hidden="true" className="inline-block h-4 w-2 animate-pulse bg-brand-ink/80" />
            </p>
          </div>
        </div>

        <p className="mt-6 hidden font-mono text-xs text-muted-foreground md:block">
          <PaletteHint>or press</PaletteHint>
        </p>
      </div>
    </main>
  )
}
