'use client'
import { useEffect, useRef, useState } from 'react'
import { animate, useInView, useReducedMotion } from 'motion/react'
import { Star, Users, FolderGit2 } from 'lucide-react'

type Stats = { public_repos: number; followers: number; stars: number }

export function GithubStats() {
  const [stats, setStats] = useState<Stats | null>(null)
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true })
  const reduce = useReducedMotion()

  useEffect(() => {
    let active = true
    const load = async () => {
      try {
        const p = await fetch('https://api.github.com/users/yeboster')
        if (!p.ok) throw new Error()
        const profile = await p.json() as { public_repos: number; followers: number }
        const r = await fetch('https://api.github.com/users/yeboster/repos?per_page=100')
        const repos = r.ok ? await r.json() as Array<{ stargazers_count: number }> : []
        if (active) setStats({ public_repos: profile.public_repos, followers: profile.followers, stars: repos.reduce((s, x) => s + x.stargazers_count, 0) })
      } catch {
        if (active) setStats(null)
      }
    }
    void load()
    return () => { active = false }
  }, [])

  if (!stats) return null

  return (
    <div ref={ref} className="grid grid-cols-3 gap-3">
      <Stat icon={FolderGit2} label="Repos" value={stats.public_repos} animate={inView && !reduce} />
      <Stat icon={Users} label="Followers" value={stats.followers} animate={inView && !reduce} />
      <Stat icon={Star} label="Stars" value={stats.stars} animate={inView && !reduce} />
    </div>
  )
}

function Stat({ icon: Icon, label, value, animate: shouldAnimate }: { icon: typeof Star; label: string; value: number; animate: boolean }) {
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

  return (
    <div className="rounded-xl border border-gray-200 bg-white/70 px-3 py-3 dark:border-gray-700 dark:bg-gray-800/70">
      <Icon className="h-4 w-4 text-[#9f4f9d]" />
      <strong className="mt-1 block text-lg tabular-nums">{display}</strong>
      <span className="text-xs text-gray-500 dark:text-gray-400">{label}</span>
    </div>
  )
}
