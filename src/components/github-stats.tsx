'use client'

import { useEffect, useRef, useState } from 'react'
import { animate, useInView, useReducedMotion } from 'motion/react'
import { ArrowUpRight, FolderGit2, Star, Users } from 'lucide-react'

import { site } from '@/lib/site'

type Stats = { public_repos: number; followers: number; stars: number }

type State = { status: 'loading' } | { status: 'ready'; stats: Stats } | { status: 'error' }

const STATS = [
  { key: 'public_repos', label: 'Repos', icon: <FolderGit2 /> },
  { key: 'followers', label: 'Followers', icon: <Users /> },
  { key: 'stars', label: 'Stars', icon: <Star /> },
] as const

/**
 * Live GitHub counts. Holds its height through loading and failure, so the
 * card beside it never jumps, and a failure still points at the profile.
 */
export function GithubStats() {
  const [state, setState] = useState<State>({ status: 'loading' })
  const ref = useRef<HTMLDListElement>(null)
  const inView = useInView(ref, { once: true })
  const reduce = useReducedMotion()

  useEffect(() => {
    let active = true
    const load = async () => {
      try {
        // Aggregated + hourly-cached server-side; the client never downloads
        // the full repo list just to sum stars.
        const res = await fetch('/api/github-stats')
        if (!res.ok) throw new Error(`github-stats ${res.status}`)
        const stats = (await res.json()) as Stats
        if (active) setState({ status: 'ready', stats })
      } catch {
        if (active) setState({ status: 'error' })
      }
    }
    void load()
    return () => {
      active = false
    }
  }, [])

  if (state.status === 'error') {
    return (
      <div className="flex min-h-[108px] flex-col items-start justify-center gap-3 rounded-2xl border border-dashed border-border bg-subtle px-5 py-4">
        <p className="text-sm text-muted-foreground">Live stats are unavailable right now.</p>
        <a
          href={site.socials.github}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 text-sm font-medium text-foreground underline-offset-4 transition-colors hover:text-brand-ink hover:underline"
        >
          Browse on GitHub
          <ArrowUpRight aria-hidden="true" className="size-3.5" />
          <span className="sr-only"> (opens in a new tab)</span>
        </a>
      </div>
    )
  }

  const loading = state.status === 'loading'

  return (
    <div>
      <dl ref={ref} className="grid grid-cols-3 gap-3" aria-busy={loading || undefined}>
        {STATS.map(({ key, label, icon }) => (
          // dt comes first for assistive tech; `order` puts the number on top.
          <div key={key} className="flex min-w-0 flex-col rounded-2xl border border-border bg-subtle px-3 py-4 sm:px-4">
            <span aria-hidden="true" className="order-1 text-brand-ink [&_svg]:size-4">
              {icon}
            </span>
            <dt className="order-3 mt-1 truncate font-mono text-[10px] uppercase tracking-wider text-muted-foreground sm:text-[11px]">{label}</dt>
            <dd className="order-2 mt-2 text-2xl font-semibold tabular-nums tracking-tight">
              {loading ? (
                <span className="block h-8 w-12 animate-pulse rounded-md bg-muted" aria-hidden="true" />
              ) : (
                <Count value={state.stats[key]} animate={inView && !reduce} />
              )}
            </dd>
          </div>
        ))}
      </dl>
      {loading && <span className="sr-only">Loading GitHub stats</span>}
    </div>
  )
}

function Count({ value, animate: shouldAnimate }: { value: number; animate: boolean }) {
  const [display, setDisplay] = useState(shouldAnimate ? 0 : value)

  useEffect(() => {
    if (!shouldAnimate) {
      setDisplay(value)
      return
    }
    const controls = animate(0, value, {
      duration: 1.2,
      ease: 'easeOut',
      onUpdate: (latest) => setDisplay(Math.round(latest)),
    })
    return () => controls.stop()
  }, [shouldAnimate, value])

  return <>{display}</>
}
