'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import { motion, AnimatePresence, useMotionValueEvent, useScroll, useReducedMotion } from 'motion/react'
import { Menu, Search, X } from 'lucide-react'

import { Logo } from '@/components/ui/logo'
import { ThemeToggle } from '@/components/theme-toggle'
import { openCommandPalette } from '@/components/command-palette'
import { ScrambleText } from '@/components/scramble-text'

const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/about', label: 'About Me' },
  { href: '/portfolio', label: 'Portfolio' },
  { href: '/now', label: 'Now' },
  { href: '/contact', label: 'Contact' },
]

export default function Navbar() {
  const currentPath = usePathname()
  const [open, setOpen] = useState(false)
  const [hidden, setHidden] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const { scrollY } = useScroll()
  const reduce = useReducedMotion()

  // Smart show/hide: reveal on scroll up, hide on scroll down.
  // Disabled when reduced motion is preferred (always show).
  useMotionValueEvent(scrollY, 'change', (latest) => {
    if (reduce) return
    const previous = scrollY.getPrevious() ?? 0
    if (latest > previous && latest > 80) {
      // scrolling down past the threshold → hide
      setHidden(true)
    } else {
      // scrolling up (or at top) → reveal
      setHidden(false)
    }
    setScrolled(latest > 40)
  })

  // Close mobile menu on route change
  useEffect(() => {
    setOpen(false)
  }, [currentPath])

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [open])

  return (
    <motion.header
      animate={hidden ? { y: '-100%' } : { y: 0 }}
      transition={{ type: 'spring', stiffness: 260, damping: 30, mass: 0.5 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? 'bg-white/70 dark:bg-gray-900/70 backdrop-blur-xl border-b border-gray-900/5 dark:border-white/10'
          : 'bg-transparent border-b border-transparent'
      }`}
    >
      <div className="max-w-6xl mx-auto px-4 lg:px-6">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link className="flex gap-2 items-center" href="/">
            <Logo width={24} height={24} />
            <span className="font-semibold">Yeboster</span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => {
              const active = currentPath === link.href
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`relative px-3 py-2 text-sm font-medium rounded-lg transition-colors duration-200 ${
                    active
                      ? 'text-gray-900 dark:text-white'
                      : 'text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
                  }`}
                >
                  <ScrambleText text={link.label} />
                  {active && (
                    <motion.div
                      className="absolute inset-0 bg-gray-100 dark:bg-gray-800/60 rounded-lg -z-10"
                      layoutId="navbar-active"
                      transition={{ type: 'spring', stiffness: 350, damping: 30 }}
                    />
                  )}
                </Link>
              )
            })}
            <button
              onClick={() => openCommandPalette()}
              className="ml-2 inline-flex items-center gap-2 rounded-lg border border-gray-200 dark:border-gray-700 px-3 py-1.5 text-sm text-gray-500 dark:text-gray-400 hover:border-[#9f4f9d]/50 hover:text-gray-900 dark:hover:text-white transition-colors"
              aria-label="Open command palette"
            >
              <Search className="w-4 h-4" />
              <kbd className="font-mono text-xs text-gray-400 dark:text-gray-500">⌘K</kbd>
            </button>
            <div className="ml-2">
              <ThemeToggle />
            </div>
          </nav>

          {/* Mobile Controls */}
          <div className="flex items-center gap-2 md:hidden">
            <button
              onClick={() => openCommandPalette()}
              className="inline-flex items-center justify-center w-10 h-10 rounded-lg text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              aria-label="Open command palette"
            >
              <Search className="w-5 h-5" />
            </button>
            <ThemeToggle />
            <button
              onClick={() => setOpen(!open)}
              className="inline-flex items-center justify-center w-10 h-10 rounded-lg text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              aria-label="Toggle menu"
              aria-expanded={open}
            >
              {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {open && (
          <>
            {/* Backdrop */}
            <motion.div
              className="fixed inset-0 bg-black/20 backdrop-blur-sm md:hidden"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={() => setOpen(false)}
              style={{ top: '64px' }}
            />
            {/* Panel */}
            <motion.nav
              className="absolute top-full left-0 right-0 bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl border-b border-white/20 dark:border-gray-700/30 shadow-xl md:hidden"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.25, ease: 'easeOut' }}
            >
              <div className="px-4 py-3 space-y-1">
                {navLinks.map((link, i) => {
                  const active = currentPath === link.href
                  return (
                    <motion.div
                      key={link.href}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.05, duration: 0.2 }}
                    >
                      <Link
                        href={link.href}
                        className={`block px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
                          active
                            ? 'bg-gray-100 dark:bg-gray-800/60 text-gray-900 dark:text-white'
                            : 'text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800/40'
                        }`}
                      >
                        {link.label}
                      </Link>
                    </motion.div>
                  )
                })}
              </div>
            </motion.nav>
          </>
        )}
      </AnimatePresence>
    </motion.header>
  )
}
