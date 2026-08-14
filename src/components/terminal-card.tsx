'use client'

import { useEffect, useRef, useState, type KeyboardEvent } from 'react'
import { useRouter } from 'next/navigation'
import { motion, useReducedMotion, type Variants } from 'motion/react'
import { site } from '@/lib/site'

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.15, duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] },
  }),
}

type Line = { type: 'cmd' | 'out'; text: string }

const HELP_LINES = [
  'Available commands:',
  '  help              show this list',
  '  whoami            who am I',
  '  skills            tech stack',
  '  projects          things I have built',
  '  contact           how to reach me',
  '  open <page>       jump to about | portfolio | contact | now',
  '  socials           social links',
  '  clear             clear the screen',
]

const SKILLS_LINES = [
  'Languages       Ruby, TypeScript, Rust, Python',
  'Frameworks      Rails 4->8, Sidekiq, Next.js, NestJS, Nuxt, React, SvelteKit, Vue, Tailwind CSS',
  'Infrastructure  Kubernetes, FluxCD, Helm, Kustomize, Docker, Linux, Cloud',
  'Security        Pen-testing, Web security',
]

const PROJECTS_LINES = [
  'Meta Names        Web3 DNS on Partisia Blockchain - Rust, TypeScript, Svelte',
  'JokeHub           curated jokes - jokehub.org',
  'Todoist Actions   workflow automation for Todoist',
  'GitOps K8s        Kubernetes cluster via FluxCD',
  '',
  'see /portfolio for more',
]

const ROUTES: Record<string, string> = {
  about: '/about',
  portfolio: '/portfolio',
  contact: '/contact',
  now: '/now',
  home: '/',
}

const MAX_HISTORY = 100
const TYPE_INTERVAL_MS = 18

export function TerminalCard() {
  const router = useRouter()
  const reduce = useReducedMotion()
  const [lines, setLines] = useState<Line[]>([])
  const [input, setInput] = useState('')
  const [ready, setReady] = useState(false)
  const bootedRef = useRef(false)
  const commandsRef = useRef<string[]>([])
  const historyPointerRef = useRef(0)
  const scrollRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)
  const timeoutsRef = useRef<ReturnType<typeof setTimeout>[]>([])

  useEffect(() => {
    const timeouts = timeoutsRef.current
    return () => {
      timeouts.forEach(clearTimeout)
    }
  }, [])

  useEffect(() => {
    if (scrollRef.current) scrollRef.current.scrollTop = scrollRef.current.scrollHeight
  }, [lines])

  function pushLine(line: Line) {
    setLines((prev) => {
      const next = [...prev, line]
      return next.length > MAX_HISTORY ? next.slice(next.length - MAX_HISTORY) : next
    })
  }

  function typeLine(text: string, onDone?: () => void) {
    if (reduce) {
      pushLine({ type: 'out', text })
      onDone?.()
      return
    }
    let i = 0
    pushLine({ type: 'out', text: '' })
    const step = () => {
      i++
      setLines((prev) => {
        const next = [...prev]
        next[next.length - 1] = { type: 'out', text: text.slice(0, i) }
        return next
      })
      if (i < text.length) {
        timeoutsRef.current.push(setTimeout(step, TYPE_INTERVAL_MS))
      } else {
        onDone?.()
      }
    }
    timeoutsRef.current.push(setTimeout(step, TYPE_INTERVAL_MS))
  }

  function runBoot() {
    if (bootedRef.current) return
    bootedRef.current = true
    pushLine({ type: 'cmd', text: 'whoami' })
    typeLine('Marco Vaccari — full-stack dev, Paris.', () => {
      pushLine({ type: 'out', text: "type 'help' to explore" })
      setReady(true)
    })
  }

  function runCommand(raw: string) {
    const cmd = raw.trim()
    pushLine({ type: 'cmd', text: cmd })
    if (cmd) {
      commandsRef.current.push(cmd)
      historyPointerRef.current = commandsRef.current.length
    }
    const [name, ...rest] = cmd.toLowerCase().split(/\s+/)
    switch (name) {
      case '':
        break
      case 'help':
        HELP_LINES.forEach((text) => pushLine({ type: 'out', text }))
        break
      case 'whoami':
        pushLine({ type: 'out', text: `${site.name} (Marco Vaccari) — full-stack dev, Paris. ${site.tagline}.` })
        break
      case 'skills':
        SKILLS_LINES.forEach((text) => pushLine({ type: 'out', text }))
        break
      case 'projects':
      case 'portfolio':
        PROJECTS_LINES.forEach((text) => pushLine({ type: 'out', text }))
        break
      case 'contact':
        pushLine({ type: 'out', text: site.email })
        pushLine({ type: 'out', text: 'or run: open contact' })
        break
      case 'socials':
        pushLine({ type: 'out', text: `github    ${site.socials.github}` })
        pushLine({ type: 'out', text: `gitlab    ${site.socials.gitlab}` })
        pushLine({ type: 'out', text: `linkedin  ${site.socials.linkedin}` })
        pushLine({ type: 'out', text: `twitter   ${site.socials.twitter}` })
        break
      case 'open': {
        const target = rest[0]
        const path = target ? ROUTES[target] : undefined
        if (path) {
          pushLine({ type: 'out', text: `→ navigating to ${path}` })
          router.push(path)
        } else {
          pushLine({ type: 'out', text: 'usage: open <about|portfolio|contact|now>' })
        }
        break
      }
      case 'sudo':
        if (rest.join(' ') === 'make me a sandwich') {
          pushLine({ type: 'out', text: 'ok. 🥪' })
        } else {
          pushLine({ type: 'out', text: `command not found: ${cmd} — try 'help'` })
        }
        break
      case 'clear':
        setLines([])
        break
      default:
        pushLine({ type: 'out', text: `command not found: ${cmd} — try 'help'` })
    }
  }

  function handleKeyDown(e: KeyboardEvent<HTMLInputElement>) {
    if (e.key === 'Enter') {
      const value = input
      setInput('')
      runCommand(value)
    } else if (e.key === 'ArrowUp') {
      e.preventDefault()
      const stack = commandsRef.current
      if (!stack.length) return
      historyPointerRef.current = Math.max(0, historyPointerRef.current - 1)
      setInput(stack[historyPointerRef.current] ?? '')
    } else if (e.key === 'ArrowDown') {
      e.preventDefault()
      const stack = commandsRef.current
      if (!stack.length) return
      historyPointerRef.current = Math.min(stack.length, historyPointerRef.current + 1)
      setInput(stack[historyPointerRef.current] ?? '')
    }
  }

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-50px' }}
      custom={0}
      variants={fadeUp}
      onViewportEnter={runBoot}
      onClick={() => inputRef.current?.focus()}
      className="overflow-hidden rounded-xl border border-gray-800 bg-gray-950 font-mono text-sm text-gray-100 shadow-xl"
    >
      <div className="flex items-center gap-2 border-b border-gray-800 bg-gray-900 px-4 py-3">
        <span className="h-3 w-3 rounded-full bg-red-500" />
        <span className="h-3 w-3 rounded-full bg-yellow-500" />
        <span className="h-3 w-3 rounded-full bg-green-500" />
        <span className="ml-3 text-xs text-gray-400">marco@bon.so ~ zsh</span>
      </div>
      <div ref={scrollRef} className="max-h-80 space-y-1 overflow-y-auto px-4 py-4">
        {lines.map((line, i) => (
          <div
            key={i}
            className={line.type === 'cmd' ? 'flex gap-2 text-gray-100' : 'whitespace-pre-wrap break-words text-gray-400'}
          >
            {line.type === 'cmd' && <span className="text-[#c06fbe]">❯</span>}
            <span>{line.text}</span>
          </div>
        ))}
        {ready && (
          <div className="flex items-center gap-2">
            <span className="text-[#c06fbe]">❯</span>
            <input
              ref={inputRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              className="flex-1 bg-transparent text-gray-100 outline-none caret-[#9f4f9d]"
              aria-label="Terminal input"
              autoComplete="off"
              autoCapitalize="off"
              spellCheck={false}
            />
          </div>
        )}
      </div>
    </motion.div>
  )
}
