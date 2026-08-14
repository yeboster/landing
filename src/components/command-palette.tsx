'use client'

import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { useRouter } from 'next/navigation'
import { AnimatePresence, motion, useReducedMotion } from 'motion/react'
import {
  ArrowRight,
  Briefcase,
  Check,
  Copy,
  Github,
  Home as HomeIcon,
  Linkedin,
  Mail,
  Moon,
  Search,
  Sun,
  Twitter,
  User,
  Zap,
} from 'lucide-react'
import { site } from '@/lib/site'
import { useTheme } from './theme-provider'

// Module-level pub/sub so the navbar trigger and this component can share
// open state without lifting it into a context provider.
type Listener = () => void
let paletteOpen = false
let lastActiveElement: HTMLElement | null = null
const listeners = new Set<Listener>()

function emitChange(next: boolean) {
  paletteOpen = next
  listeners.forEach((listener) => listener())
}

/** Called by the navbar trigger button (and the Cmd+K shortcut). */
export function openCommandPalette() {
  if (typeof document !== 'undefined') {
    lastActiveElement = document.activeElement as HTMLElement | null
  }
  emitChange(true)
}

function usePaletteOpen() {
  const [open, setOpen] = useState(paletteOpen)
  useEffect(() => {
    const listener = () => setOpen(paletteOpen)
    listeners.add(listener)
    return () => {
      listeners.delete(listener)
    }
  }, [])
  return open
}

interface Action {
  id: string
  title: string
  keywords: string
  icon: typeof Search
  perform: () => void
  keepOpen?: boolean
}

export function CommandPalette() {
  const open = usePaletteOpen()
  const router = useRouter()
  const { theme, toggleTheme } = useTheme()
  const reduce = useReducedMotion()
  const [query, setQuery] = useState('')
  const [activeIndex, setActiveIndex] = useState(0)
  const [copied, setCopied] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)

  const close = useCallback(() => {
    emitChange(false)
    setQuery('')
    setActiveIndex(0)
    setCopied(false)
    lastActiveElement?.focus?.()
  }, [])

  const actions = useMemo<Action[]>(() => {
    const pages: Action[] = [
      { id: 'home', title: 'Home', keywords: 'home page index', icon: HomeIcon, perform: () => router.push('/') },
      { id: 'about', title: 'About', keywords: 'about me bio', icon: User, perform: () => router.push('/about') },
      { id: 'portfolio', title: 'Portfolio', keywords: 'portfolio projects work', icon: Briefcase, perform: () => router.push('/portfolio') },
      { id: 'now', title: 'Now', keywords: 'now status currently', icon: Zap, perform: () => router.push('/now') },
      { id: 'contact', title: 'Contact', keywords: 'contact email reach out', icon: Mail, perform: () => router.push('/contact') },
    ]
    const theme_: Action = {
      id: 'theme',
      title: theme === 'dark' ? 'Switch to light theme' : 'Switch to dark theme',
      keywords: 'theme dark light mode toggle appearance',
      icon: theme === 'dark' ? Sun : Moon,
      perform: toggleTheme,
    }
    const email: Action = {
      id: 'copy-email',
      title: copied ? 'Copied ✓' : 'Copy email',
      keywords: 'email copy contact address',
      icon: copied ? Check : Copy,
      keepOpen: true,
      perform: () => {
        navigator.clipboard.writeText(site.email).then(() => {
          setCopied(true)
          setTimeout(() => setCopied(false), 2000)
        })
      },
    }
    const socials: Action[] = [
      { id: 'social-github', title: 'Open GitHub', keywords: 'github social profile code', icon: Github, perform: () => window.open(site.socials.github, '_blank', 'noopener') },
      { id: 'social-linkedin', title: 'Open LinkedIn', keywords: 'linkedin social profile career', icon: Linkedin, perform: () => window.open(site.socials.linkedin, '_blank', 'noopener') },
      { id: 'social-twitter', title: 'Open Twitter', keywords: 'twitter social profile x', icon: Twitter, perform: () => window.open(site.socials.twitter, '_blank', 'noopener') },
    ]
    return [...pages, theme_, email, ...socials]
  }, [router, theme, toggleTheme, copied])

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    if (!q) return actions
    return actions.filter((a) => `${a.title} ${a.keywords}`.toLowerCase().includes(q))
  }, [actions, query])

  useEffect(() => {
    setActiveIndex(0)
  }, [query])

  const runAction = useCallback((action: Action) => {
    action.perform()
    if (!action.keepOpen) close()
  }, [close])

  // Global Cmd+K / Ctrl+K toggle — always listening, even while closed.
  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault()
        if (paletteOpen) {
          close()
        } else {
          openCommandPalette()
        }
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [close])

  // Escape / arrow / enter navigation while open.
  useEffect(() => {
    if (!open) return
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === 'Escape') {
        e.preventDefault()
        close()
      } else if (e.key === 'ArrowDown') {
        e.preventDefault()
        setActiveIndex((i) => (filtered.length ? (i + 1) % filtered.length : 0))
      } else if (e.key === 'ArrowUp') {
        e.preventDefault()
        setActiveIndex((i) => (filtered.length ? (i - 1 + filtered.length) % filtered.length : 0))
      } else if (e.key === 'Enter') {
        e.preventDefault()
        const action = filtered[activeIndex]
        if (action) runAction(action)
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [open, filtered, activeIndex, close, runAction])

  // Focus input + lock body scroll while open.
  useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden'
      inputRef.current?.focus()
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [open])

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[200] flex items-start justify-center bg-black/50 px-4 pt-[15vh] backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: reduce ? 0 : 0.18 }}
          onClick={close}
        >
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label="Command palette"
            className="w-full max-w-lg overflow-hidden rounded-xl border border-gray-200 bg-white shadow-2xl focus-within:border-[#9f4f9d]/50 dark:border-gray-700 dark:bg-gray-800"
            initial={{ opacity: 0, scale: 0.97, y: -8 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.97, y: -8 }}
            transition={{ duration: reduce ? 0 : 0.18 }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center gap-3 border-b border-gray-200 px-4 dark:border-gray-700">
              <Search className="h-4 w-4 shrink-0 text-gray-400" />
              <input
                ref={inputRef}
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Type a command or search..."
                aria-label="Command palette search"
                className="w-full bg-transparent py-3.5 text-sm text-gray-900 outline-none placeholder:text-gray-400 dark:text-gray-100"
              />
            </div>
            <ul role="listbox" className="max-h-80 overflow-y-auto py-2">
              {filtered.length === 0 && (
                <li className="px-4 py-6 text-center text-sm text-gray-400">No results</li>
              )}
              {filtered.map((action, i) => {
                const Icon = action.icon
                return (
                  <li
                    key={action.id}
                    role="option"
                    aria-selected={i === activeIndex}
                    onMouseEnter={() => setActiveIndex(i)}
                    onClick={() => runAction(action)}
                    className={`mx-2 flex cursor-pointer items-center gap-3 rounded-lg px-3 py-2.5 text-sm transition-colors ${
                      i === activeIndex
                        ? 'bg-[#9f4f9d]/10 text-gray-900 dark:text-white'
                        : 'text-gray-600 dark:text-gray-300'
                    }`}
                  >
                    <Icon className="h-4 w-4 shrink-0" />
                    <span className="flex-1">{action.title}</span>
                    {i === activeIndex && <ArrowRight className="h-3.5 w-3.5 shrink-0 opacity-50" />}
                  </li>
                )
              })}
            </ul>
            <div className="flex items-center gap-4 border-t border-gray-200 px-4 py-2.5 text-xs text-gray-400 dark:border-gray-700">
              <span>↑↓ navigate</span>
              <span>↵ select</span>
              <span>esc close</span>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
