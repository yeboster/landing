'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useId, useRef, useState } from 'react'
import { AnimatePresence, motion, useMotionValueEvent, useReducedMotion, useScroll } from 'motion/react'
import { Menu, X } from 'lucide-react'

import { isActivePath, primaryNav } from '@/components/chrome/nav-config'
import { PaletteTrigger } from '@/components/chrome/palette-trigger'
import { ScrambleText } from '@/components/scramble-text'
import { ThemeToggle } from '@/components/theme-toggle'
import { Logo } from '@/components/ui/logo'
import { ease } from '@/lib/motion'
import { site } from '@/lib/site'
import { cn } from '@/lib/utils'

/** Below this the bar is always shown and transparent. */
const TOP_ZONE = 80
/** Ignore scroll jitter smaller than this before hiding or revealing. */
const SCROLL_DELTA = 6

export default function Navbar() {
  const pathname = usePathname()
  const reduce = useReducedMotion()
  const menuId = useId()
  const [open, setOpen] = useState(false)
  const [hidden, setHidden] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const headerRef = useRef<HTMLElement>(null)
  const toggleRef = useRef<HTMLButtonElement>(null)
  const firstLinkRef = useRef<HTMLAnchorElement>(null)
  const { scrollY } = useScroll()

  // Glass once the page moves; hide on scroll down, reveal on scroll up. The
  // bar stays put under reduced motion, while the menu is open, and while
  // keyboard focus is inside it.
  useMotionValueEvent(scrollY, 'change', (latest) => {
    setScrolled(latest > 8)
    const focusInside = headerRef.current?.contains(document.activeElement) ?? false
    if (reduce || open || focusInside || latest < TOP_ZONE) {
      setHidden(false)
      return
    }
    const delta = latest - (scrollY.getPrevious() ?? latest)
    if (delta > SCROLL_DELTA) setHidden(true)
    else if (delta < -SCROLL_DELTA) setHidden(false)
  })

  // A restored scroll position (back/forward, reload) should start as glass.
  useEffect(() => {
    setScrolled(window.scrollY > 8)
  }, [])

  // Close the mobile menu on navigation.
  useEffect(() => {
    setOpen(false)
  }, [pathname])

  // While the menu is open: lock page scroll, move focus into it, close on
  // Escape (returning focus to the toggle) and when the viewport grows past md.
  useEffect(() => {
    if (!open) return
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    firstLinkRef.current?.focus()

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key !== 'Escape') return
      setOpen(false)
      toggleRef.current?.focus()
    }
    const desktop = window.matchMedia('(min-width: 768px)')
    const onResize = (e: MediaQueryListEvent) => e.matches && setOpen(false)

    window.addEventListener('keydown', onKeyDown)
    desktop.addEventListener('change', onResize)
    return () => {
      document.body.style.overflow = previousOverflow
      window.removeEventListener('keydown', onKeyDown)
      desktop.removeEventListener('change', onResize)
    }
  }, [open])

  const glass = scrolled || open

  return (
    <>
      {/* Outside the header: its backdrop-filter would make this fixed layer
          size itself to the 64px bar instead of the viewport. */}
      <AnimatePresence>
        {open && (
          <motion.div
            aria-hidden="true"
            className="fixed inset-x-0 bottom-0 top-16 z-40 bg-background/40 backdrop-blur-sm md:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={() => setOpen(false)}
          />
        )}
      </AnimatePresence>

      <motion.header
        ref={headerRef}
        initial={false}
        animate={{ y: hidden ? '-100%' : 0 }}
        transition={{ duration: 0.3, ease }}
        onFocusCapture={() => setHidden(false)}
        // Tabbing out of the open menu closes it, like any disclosure. Only
        // when focus lands somewhere else: a click on bare page leaves
        // `relatedTarget` null and is handled by the backdrop instead.
        onBlur={(e) => {
          const next = e.relatedTarget as Node | null
          if (open && next && !e.currentTarget.contains(next)) setOpen(false)
        }}
        className={cn(
          'fixed inset-x-0 top-0 z-50 border-b transition-[background-color,border-color,box-shadow] duration-300 ease-out-expo',
          glass
            ? 'border-border/70 bg-background/75 shadow-soft backdrop-blur-xl backdrop-saturate-150'
            : 'border-transparent bg-transparent'
        )}
      >
        <div className="container flex h-16 items-center justify-between gap-6">
          <Link href="/" className="group -m-1.5 flex items-center gap-2.5 rounded-lg p-1.5">
            <Logo width={24} height={24} alt="" priority className="size-6 transition-transform duration-500 ease-out-expo group-hover:rotate-[-8deg]" />
            <span className="text-[15px] font-semibold tracking-tight text-foreground">{site.person}</span>
          </Link>

          <div className="hidden items-center gap-2 md:flex">
            <nav aria-label="Primary">
              <ul className="flex items-center gap-0.5">
                {primaryNav.map((link) => {
                  const active = isActivePath(pathname, link.href)
                  return (
                    <li key={link.href}>
                      <Link
                        href={link.href}
                        aria-current={active ? 'page' : undefined}
                        className={cn(
                          'relative isolate block rounded-full px-3.5 py-2 text-sm font-medium transition-colors duration-200',
                          active ? 'text-foreground' : 'text-muted-foreground hover:text-foreground'
                        )}
                      >
                        {active && (
                          <motion.span
                            aria-hidden="true"
                            layoutId="navbar-active"
                            className="absolute inset-0 -z-10 rounded-full bg-muted"
                            transition={{ duration: 0.35, ease }}
                          />
                        )}
                        <ScrambleText text={link.label} />
                      </Link>
                    </li>
                  )
                })}
              </ul>
            </nav>
            <span aria-hidden="true" className="mx-1 h-5 w-px bg-border" />
            <PaletteTrigger />
            <ThemeToggle />
          </div>

          <div className="flex items-center gap-1 md:hidden">
            <PaletteTrigger variant="icon" />
            <ThemeToggle />
            <button
              ref={toggleRef}
              type="button"
              onClick={() => setOpen((v) => !v)}
              aria-expanded={open}
              aria-controls={menuId}
              aria-label={open ? 'Close menu' : 'Open menu'}
              className="inline-flex size-9 items-center justify-center rounded-full text-foreground transition-colors duration-200 hover:bg-muted"
            >
              {open ? <X aria-hidden="true" className="size-5" /> : <Menu aria-hidden="true" className="size-5" />}
            </button>
          </div>
        </div>

        <AnimatePresence>
          {open && (
            <motion.nav
              id={menuId}
              aria-label="Mobile"
              className="absolute inset-x-0 top-full border-b border-border bg-background shadow-lift md:hidden"
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.22, ease }}
            >
              <ul className="container flex flex-col gap-1 py-4">
                {primaryNav.map((link, i) => {
                  const active = isActivePath(pathname, link.href)
                  return (
                    <motion.li
                      key={link.href}
                      initial={{ opacity: 0, y: -4 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.03 * i, duration: 0.22, ease }}
                    >
                      <Link
                        ref={i === 0 ? firstLinkRef : undefined}
                        href={link.href}
                        aria-current={active ? 'page' : undefined}
                        onClick={() => setOpen(false)}
                        className={cn(
                          'flex items-center justify-between rounded-xl px-4 py-3 text-base font-medium transition-colors',
                          active ? 'bg-muted text-foreground' : 'text-muted-foreground hover:bg-muted/60 hover:text-foreground'
                        )}
                      >
                        {link.label}
                        {active && <span aria-hidden="true" className="size-1.5 rounded-full bg-brand" />}
                      </Link>
                    </motion.li>
                  )
                })}
              </ul>
            </motion.nav>
          )}
        </AnimatePresence>
      </motion.header>
    </>
  )
}
