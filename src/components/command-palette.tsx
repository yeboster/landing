'use client'

import { useCallback, useEffect, useId, useMemo, useRef, useState } from 'react'
import { useRouter } from 'next/navigation'
import { AnimatePresence, motion, useReducedMotion } from 'motion/react'
import {
  ArrowRight,
  Briefcase,
  CalendarDays,
  Check,
  Copy,
  CornerDownLeft,
  FileText,
  Github,
  Home as HomeIcon,
  Linkedin,
  Mail,
  Moon,
  PenLine,
  Search,
  Sun,
  Twitter,
  User,
  Zap,
} from 'lucide-react'

import type { PostMeta } from '@/lib/post'
import { ease } from '@/lib/motion'
import { site } from '@/lib/site'
import { cn } from '@/lib/utils'
import { closeCommandPalette, usePaletteOpen } from './command-palette-store'
import { useTheme } from './theme-provider'

type Group = 'Pages' | 'Writing' | 'Actions' | 'Elsewhere'

interface Action {
  id: string
  title: string
  group: Group
  keywords: string
  icon: typeof Search
  perform: () => void
  keepOpen?: boolean
  /** Opens outside the site; shown with an arrow and announced. */
  external?: boolean
}

const GROUP_ORDER: Group[] = ['Pages', 'Writing', 'Actions', 'Elsewhere']

function openExternal(url: string) {
  window.open(url, '_blank', 'noopener,noreferrer')
}

/**
 * ⌘K palette: a modal dialog with a combobox. Focus stays in the search
 * input; the highlighted option is exposed through `aria-activedescendant`,
 * and Tab is held inside the dialog until it closes.
 */
export function CommandPalette({ posts = [] }: { posts?: PostMeta[] }) {
  const open = usePaletteOpen()
  const router = useRouter()
  const { theme, toggleTheme } = useTheme()
  const reduce = useReducedMotion()
  const [query, setQuery] = useState('')
  const [activeIndex, setActiveIndex] = useState(0)
  const [copied, setCopied] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)
  const uid = useId()
  const listId = `${uid}-list`
  const optionId = (id: string) => `${uid}-${id}`

  const close = useCallback(() => {
    closeCommandPalette()
    setQuery('')
    setActiveIndex(0)
    setCopied(false)
  }, [])

  const actions = useMemo<Action[]>(() => {
    const go = (href: string) => () => router.push(href)
    return [
      { id: 'home', group: 'Pages', title: 'Home', keywords: 'home page index', icon: HomeIcon, perform: go('/') },
      { id: 'portfolio', group: 'Pages', title: 'Work', keywords: 'portfolio projects work case studies', icon: Briefcase, perform: go('/portfolio') },
      { id: 'about', group: 'Pages', title: 'About', keywords: 'about me bio cv resume résumé', icon: User, perform: go('/about') },
      { id: 'writing', group: 'Pages', title: 'Writing', keywords: 'writing blog posts notes articles', icon: PenLine, perform: go('/writing') },
      { id: 'now', group: 'Pages', title: 'Now', keywords: 'now status currently', icon: Zap, perform: go('/now') },
      { id: 'contact', group: 'Pages', title: 'Contact', keywords: 'contact email reach out hire', icon: Mail, perform: go('/contact') },
      // Published posts, so search reaches the writing itself and not just the index.
      ...posts.map<Action>((post) => ({
        id: `post-${post.slug}`,
        group: 'Writing',
        title: post.title,
        keywords: `writing post article ${post.tags.join(' ')} ${post.description}`,
        icon: FileText,
        perform: go(`/writing/${post.slug}`),
      })),
      {
        id: 'theme',
        group: 'Actions',
        title: theme === 'dark' ? 'Switch to light theme' : 'Switch to dark theme',
        keywords: 'theme dark light mode toggle appearance',
        icon: theme === 'dark' ? Sun : Moon,
        perform: toggleTheme,
      },
      {
        id: 'copy-email',
        group: 'Actions',
        title: copied ? 'Email copied' : 'Copy email address',
        keywords: `email copy contact address ${site.email}`,
        icon: copied ? Check : Copy,
        keepOpen: true,
        perform: () => {
          navigator.clipboard.writeText(site.email).then(() => {
            setCopied(true)
            setTimeout(() => setCopied(false), 2000)
          })
        },
      },
      { id: 'book', group: 'Actions', title: 'Book a call', keywords: 'book call meeting calendar cal.com schedule', icon: CalendarDays, external: true, perform: () => openExternal(site.booking) },
      { id: 'social-github', group: 'Elsewhere', title: 'GitHub', keywords: 'github social profile code', icon: Github, external: true, perform: () => openExternal(site.socials.github) },
      { id: 'social-linkedin', group: 'Elsewhere', title: 'LinkedIn', keywords: 'linkedin social profile career', icon: Linkedin, external: true, perform: () => openExternal(site.socials.linkedin) },
      { id: 'social-twitter', group: 'Elsewhere', title: 'Twitter', keywords: 'twitter social profile x', icon: Twitter, external: true, perform: () => openExternal(site.socials.twitter) },
    ]
  }, [router, theme, toggleTheme, copied, posts])

  // Filtered and in display order, so `activeIndex` maps straight onto what is shown.
  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    const matches = q ? actions.filter((a) => `${a.title} ${a.keywords}`.toLowerCase().includes(q)) : actions
    return GROUP_ORDER.flatMap((group) => matches.filter((a) => a.group === group))
  }, [actions, query])

  const groups = useMemo(
    () =>
      GROUP_ORDER.map((group) => ({ group, items: filtered.filter((a) => a.group === group) })).filter((g) => g.items.length > 0),
    [filtered]
  )

  const active = filtered[activeIndex]

  useEffect(() => {
    setActiveIndex(0)
  }, [query])

  // Keep the highlighted option in view while arrowing through a long list.
  useEffect(() => {
    if (!open || !active) return
    document.getElementById(`${uid}-${active.id}`)?.scrollIntoView({ block: 'nearest' })
  }, [open, active, uid])

  const runAction = useCallback(
    (action: Action) => {
      action.perform()
      if (!action.keepOpen) close()
    },
    [close]
  )

  useEffect(() => {
    if (!open) return
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === 'Escape') {
        e.preventDefault()
        close()
      } else if (e.key === 'Tab') {
        // The input is the dialog's only tab stop: keep focus inside.
        e.preventDefault()
        inputRef.current?.focus()
      } else if (e.key === 'ArrowDown') {
        e.preventDefault()
        setActiveIndex((i) => (filtered.length ? (i + 1) % filtered.length : 0))
      } else if (e.key === 'ArrowUp') {
        e.preventDefault()
        setActiveIndex((i) => (filtered.length ? (i - 1 + filtered.length) % filtered.length : 0))
      } else if (e.key === 'Enter') {
        e.preventDefault()
        if (active) runAction(active)
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [open, filtered, active, close, runAction])

  // Focus the input and lock page scroll while open.
  useEffect(() => {
    if (!open) return
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    inputRef.current?.focus()
    return () => {
      document.body.style.overflow = previousOverflow
    }
  }, [open])

  const transition = { duration: reduce ? 0 : 0.18, ease }

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[200] flex items-start justify-center bg-background/60 px-4 pt-[12vh] backdrop-blur-sm sm:pt-[16vh]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={transition}
          onClick={close}
          data-print="hide"
        >
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label="Command palette"
            className="w-full max-w-xl overflow-hidden rounded-2xl border border-border bg-card shadow-lift ring-1 ring-foreground/5"
            initial={{ opacity: 0, scale: 0.98, y: -6 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.98, y: -6 }}
            transition={transition}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center gap-3 border-b border-border px-4">
              <Search aria-hidden="true" className="size-4 shrink-0 text-muted-foreground" />
              <input
                ref={inputRef}
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search pages, posts and actions…"
                role="combobox"
                aria-expanded="true"
                aria-controls={listId}
                aria-autocomplete="list"
                aria-activedescendant={active ? optionId(active.id) : undefined}
                aria-label="Search the site"
                autoComplete="off"
                spellCheck={false}
                className="h-14 w-full bg-transparent text-[15px] text-foreground outline-none placeholder:text-muted-foreground"
              />
              <kbd className="hidden shrink-0 rounded-md border border-border bg-muted px-1.5 py-0.5 font-mono text-[10px] text-muted-foreground sm:inline">
                esc
              </kbd>
            </div>

            <div id={listId} role="listbox" aria-label="Results" className="max-h-[min(22rem,60vh)] overflow-y-auto overscroll-contain p-2">
              {filtered.length === 0 && (
                <p role="presentation" className="px-4 py-10 text-center text-sm text-muted-foreground">
                  No results for “{query.trim()}”
                </p>
              )}
              {groups.map(({ group, items }) => (
                <div key={group} role="group" aria-labelledby={`${uid}-${group}`} className="pb-1 last:pb-0">
                  <div
                    id={`${uid}-${group}`}
                    role="presentation"
                    className="px-3 pb-1 pt-2 font-mono text-[10px] font-medium uppercase tracking-[0.14em] text-muted-foreground"
                  >
                    {group}
                  </div>
                  {items.map((action) => {
                    const index = filtered.indexOf(action)
                    const selected = index === activeIndex
                    const Icon = action.icon
                    return (
                      <div
                        key={action.id}
                        id={optionId(action.id)}
                        role="option"
                        aria-selected={selected}
                        // Keep focus in the input when an option is clicked.
                        onMouseDown={(e) => e.preventDefault()}
                        onMouseMove={() => !selected && setActiveIndex(index)}
                        onClick={() => runAction(action)}
                        className={cn(
                          'flex cursor-pointer items-center gap-3 rounded-lg px-3 py-2.5 text-sm transition-colors duration-150',
                          selected ? 'bg-muted text-foreground' : 'text-muted-foreground'
                        )}
                      >
                        <Icon aria-hidden="true" className={cn('size-4 shrink-0', selected && 'text-brand-ink')} />
                        <span className="min-w-0 flex-1 truncate">{action.title}</span>
                        {action.external && <span className="sr-only">(opens in a new tab)</span>}
                        {selected && (
                          <span aria-hidden="true" className="flex items-center gap-1 text-muted-foreground">
                            {action.external ? <ArrowRight className="size-3.5 -rotate-45" /> : <CornerDownLeft className="size-3.5" />}
                          </span>
                        )}
                      </div>
                    )
                  })}
                </div>
              ))}
            </div>

            <div className="flex items-center gap-4 border-t border-border bg-subtle/60 px-4 py-2.5 font-mono text-[11px] text-muted-foreground">
              <span className="flex items-center gap-1.5">
                <Kbd>↑</Kbd>
                <Kbd>↓</Kbd>
                navigate
              </span>
              <span className="flex items-center gap-1.5">
                <Kbd>↵</Kbd>
                select
              </span>
              <span className="ml-auto hidden sm:inline">{site.name}</span>
            </div>
            <p className="sr-only" role="status" aria-live="polite">
              {copied ? 'Email address copied to the clipboard' : ''}
            </p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

function Kbd({ children }: { children: React.ReactNode }) {
  return (
    <kbd className="inline-flex min-w-5 items-center justify-center rounded border border-border bg-card px-1 py-px font-mono text-[10px] text-muted-foreground">
      {children}
    </kbd>
  )
}
