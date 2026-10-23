'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useCallback, useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion, useMotionValueEvent, useScroll, useSpring, type Variants } from 'framer-motion'
import { ArrowUpRight, Github, Gitlab, Menu, Send, Twitter, X } from 'lucide-react'

import { ThemeToggle } from '@/components/theme-toggle'
import { Button } from '@/components/ui/button'
import { Logo } from '@/components/ui/logo'
import { duration, ease, stagger } from '@/lib/motion'
import { mailto, navLinks, siteConfig, socialLinks } from '@/lib/site'
import { cn } from '@/lib/utils'

const MENU_ID = 'mobile-menu'

const socialIcons = {
  github: Github,
  gitlab: Gitlab,
  telegram: Send,
  twitter: Twitter,
} as const

const menuItem: Variants = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { duration: duration.base, ease } },
}

function isActive(pathname: string, href: string) {
  return pathname === href || (href !== '/' && pathname.startsWith(`${href}/`))
}

function getFocusable(root: HTMLElement) {
  return Array.from(root.querySelectorAll<HTMLElement>('a[href], button:not([disabled])')).filter(
    (el) => el.getClientRects().length > 0
  )
}

export function Navbar() {
  const pathname = usePathname() ?? '/'
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  const headerRef = useRef<HTMLElement>(null)
  const menuButtonRef = useRef<HTMLButtonElement>(null)
  const firstMenuLinkRef = useRef<HTMLAnchorElement>(null)

  const { scrollY, scrollYProgress } = useScroll()
  const progress = useSpring(scrollYProgress, { stiffness: 220, damping: 40, restDelta: 0.001 })

  useMotionValueEvent(scrollY, 'change', (y) => setScrolled(y > 8))
  useEffect(() => setScrolled(window.scrollY > 8), [])

  const closeMenu = useCallback((restoreFocus = false) => {
    setOpen(false)
    if (restoreFocus) menuButtonRef.current?.focus()
  }, [])

  // Close on route change.
  useEffect(() => {
    setOpen(false)
  }, [pathname])

  // Close if the viewport grows past the mobile breakpoint.
  useEffect(() => {
    const mq = window.matchMedia('(min-width: 768px)')
    const onChange = (e: MediaQueryListEvent) => e.matches && setOpen(false)
    mq.addEventListener('change', onChange)
    return () => mq.removeEventListener('change', onChange)
  }, [])

  // While open: lock page scroll, move focus into the panel, handle Escape and trap Tab.
  useEffect(() => {
    if (!open) return

    const { overflow } = document.body.style
    document.body.style.overflow = 'hidden'
    const raf = requestAnimationFrame(() => firstMenuLinkRef.current?.focus())

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.preventDefault()
        closeMenu(true)
        return
      }
      if (e.key !== 'Tab' || !headerRef.current) return
      const focusable = getFocusable(headerRef.current)
      if (focusable.length === 0) return
      const first = focusable[0]
      const last = focusable[focusable.length - 1]
      const active = document.activeElement
      if (e.shiftKey && (active === first || !headerRef.current.contains(active))) {
        e.preventDefault()
        last.focus()
      } else if (!e.shiftKey && (active === last || !headerRef.current.contains(active))) {
        e.preventDefault()
        first.focus()
      }
    }

    document.addEventListener('keydown', onKeyDown)
    return () => {
      cancelAnimationFrame(raf)
      document.removeEventListener('keydown', onKeyDown)
      document.body.style.overflow = overflow
    }
  }, [open, closeMenu])

  const elevated = scrolled && !open

  return (
    <header ref={headerRef} className="fixed inset-x-0 top-0 z-50 h-16">
      {/* Glass surface: a sibling layer (not an ancestor) so the fixed mobile panel stays viewport-relative. */}
      <div
        aria-hidden="true"
        className={cn(
          'absolute inset-0 border-b bg-background/75 backdrop-blur-xl backdrop-saturate-150 transition-opacity duration-300 ease-out-expo',
          elevated ? 'opacity-100' : 'opacity-0'
        )}
      />

      {/* Mobile menu sheet: full screen, sits beneath the bar. */}
      <AnimatePresence>
        {open && (
          <motion.div
            key={MENU_ID}
            id={MENU_ID}
            className="fixed inset-0 z-0 bg-background/95 backdrop-blur-xl md:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, transition: { duration: 0.2, ease } }}
            transition={{ duration: duration.fast, ease }}
          >
            <nav aria-label="Mobile" className="container flex h-full flex-col overflow-y-auto pb-10 pt-24">
              <motion.ul initial="hidden" animate="visible" variants={stagger(0.05, 0.05)}>
                {navLinks.map((link, i) => {
                  const active = isActive(pathname, link.href)
                  return (
                    <motion.li key={link.href} variants={menuItem} className="border-b">
                      <Link
                        ref={i === 0 ? firstMenuLinkRef : undefined}
                        href={link.href}
                        aria-current={active ? 'page' : undefined}
                        onClick={() => closeMenu()}
                        className={cn(
                          'group flex items-center justify-between rounded-md py-4 text-3xl font-semibold tracking-tight transition-colors',
                          active ? 'text-foreground' : 'text-muted-foreground hover:text-foreground'
                        )}
                      >
                        <span className="flex items-center gap-3">
                          {link.label}
                          {active && <span aria-hidden="true" className="size-1.5 rounded-full bg-brand" />}
                        </span>
                        <ArrowUpRight
                          aria-hidden="true"
                          className="size-5 opacity-40 transition-all duration-300 ease-out-expo group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:opacity-100"
                        />
                      </Link>
                    </motion.li>
                  )
                })}
              </motion.ul>

              <motion.div
                className="mt-auto space-y-4 pt-10"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: duration.base, ease, delay: 0.25 }}
              >
                <p className="font-mono text-xs uppercase tracking-widest text-muted-foreground">Get in touch</p>
                <a
                  href={mailto()}
                  className="inline-block text-lg font-medium text-foreground underline-offset-4 hover:underline"
                >
                  {siteConfig.email}
                </a>
                <ul className="flex gap-1">
                  {(Object.keys(socialLinks) as (keyof typeof socialLinks)[]).map((key) => {
                    const social = socialLinks[key]
                    const Icon = socialIcons[key]
                    return (
                      <li key={key}>
                        <a
                          href={social.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex size-10 items-center justify-center rounded-full text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
                        >
                          <Icon aria-hidden="true" className="size-[18px]" />
                          <span className="sr-only">
                            {social.label} (opens in a new tab)
                          </span>
                        </a>
                      </li>
                    )
                  })}
                </ul>
              </motion.div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Bar */}
      <div className="container relative z-10 flex h-full items-center justify-between gap-4 md:grid md:grid-cols-[1fr_auto_1fr]">
        <Link
          href="/"
          aria-label={`${siteConfig.name}, home`}
          className="flex items-center gap-2.5 justify-self-start rounded-full text-foreground"
          onClick={() => closeMenu()}
        >
          <Logo size={24} priority />
          <span className="font-semibold tracking-tight">{siteConfig.name}</span>
        </Link>

        <nav aria-label="Primary" className="hidden md:block">
          <ul className="flex items-center gap-1">
            {navLinks.map((link) => {
              const active = isActive(pathname, link.href)
              return (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    aria-current={active ? 'page' : undefined}
                    className={cn(
                      'relative block rounded-full px-3.5 py-1.5 text-sm font-medium transition-colors duration-200',
                      active ? 'text-foreground' : 'text-muted-foreground hover:text-foreground'
                    )}
                  >
                    {active && (
                      <motion.span
                        layoutId="navbar-active"
                        aria-hidden="true"
                        className="absolute inset-0 rounded-full bg-muted"
                        transition={{ type: 'spring', stiffness: 420, damping: 36 }}
                      />
                    )}
                    <span className="relative">{link.label}</span>
                  </Link>
                </li>
              )
            })}
          </ul>
        </nav>

        <div className="flex items-center gap-1.5 justify-self-end">
          <ThemeToggle />
          <Button asChild size="sm" className="ml-1 hidden md:inline-flex">
            <Link href="/contact">
              Let&apos;s talk
              <ArrowUpRight
                aria-hidden="true"
                className="transition-transform duration-300 ease-out-expo group-hover/button:-translate-y-0.5 group-hover/button:translate-x-0.5"
              />
            </Link>
          </Button>

          <button
            ref={menuButtonRef}
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls={MENU_ID}
            aria-label={open ? 'Close menu' : 'Open menu'}
            className="relative inline-flex size-9 items-center justify-center rounded-full text-foreground transition-colors hover:bg-muted md:hidden"
          >
            <Menu
              aria-hidden="true"
              className={cn(
                'absolute size-5 transition-all duration-300 ease-out-expo',
                open ? 'rotate-90 scale-50 opacity-0' : 'rotate-0 scale-100 opacity-100'
              )}
            />
            <X
              aria-hidden="true"
              className={cn(
                'absolute size-5 transition-all duration-300 ease-out-expo',
                open ? 'rotate-0 scale-100 opacity-100' : '-rotate-90 scale-50 opacity-0'
              )}
            />
          </button>
        </div>
      </div>

      {/* Reading progress along the bottom edge. */}
      <motion.div
        aria-hidden="true"
        className={cn(
          'absolute inset-x-0 bottom-0 h-[2px] origin-left bg-brand/80 transition-opacity duration-300',
          elevated ? 'opacity-100' : 'opacity-0'
        )}
        style={{ scaleX: progress }}
      />
    </header>
  )
}
