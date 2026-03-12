'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React from 'react'

import { Logo } from '@/components/ui/logo'
import { ThemeToggle } from '@/components/theme-toggle'

export default function Navbar() {
  const currentPath = usePathname()
  const [open, setOpen] = React.useState(false)

  const ListItemWithActive = ({ children, href, mobile }: { children: React.ReactNode, href: string, mobile?: boolean }) => {
    const active = currentPath === href
    return (
      <ListItem href={href} mobile={mobile} active={active}>
        {children}
      </ListItem>
    )
  }

  return (
    <header className="px-4 lg:px-6 h-16 flex flex-col">
      <div className="flex w-full items-center">
        <div className="flex w-full py-4 sm:w-auto">
          <Link className="flex gap-2 items-center justify-center" href="/">
            <Logo width={24} />
            <span>Yeboster</span>
          </Link>
          <div className="ml-auto flex items-center gap-2 sm:hidden">
            <ThemeToggle />
            <button
              onClick={() => setOpen(!open)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-200 dark:hover:text-gray-400 focus:outline-none focus:bg-gray-100 focus:text-gray-500 dark:focus:bg-gray-800 transition duration-150 ease-in-out"
              aria-label="Main menu"
              aria-expanded={open}
            >
              <svg className={`${open ? 'hidden' : 'block'} h-6 w-6`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
              <svg className={`${open ? 'block' : 'hidden'} h-6 w-6`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>
        <nav className="hidden sm:flex items-center ml-auto gap-4 sm:gap-6">
          <ListItemWithActive href="/">Home</ListItemWithActive>
          <ListItemWithActive href="/about">About Me</ListItemWithActive>
          <ListItemWithActive href="/portfolio">Portfolio</ListItemWithActive>
          <ListItemWithActive href="/contact">Contact</ListItemWithActive>
          <ThemeToggle />
        </nav>
      </div>
      <div className={`${open ? 'is-visible' : ''} w-full fade-in bg-white dark:bg-gray-800 rounded-md z-50`}>
        <div className="pt-2 pb-3">
          <ListItemWithActive href="/" mobile>Home</ListItemWithActive>
          <ListItemWithActive href="/about" mobile>About Me</ListItemWithActive>
          <ListItemWithActive href="/portfolio" mobile>Portfolio</ListItemWithActive>
          <ListItemWithActive href="/contact" mobile>Contact</ListItemWithActive>
        </div>
      </div>
    </header>
  )
}

const ListItem = ({ children, href, mobile, active }: { children: React.ReactNode, href: string, mobile?: boolean, active?: boolean }) => {
  let classes = mobile
    ? "block pl-3 pr-4 py-2 text-sm font-medium hover:underline underline-offset-4"
    : "text-sm font-medium hover:underline underline-offset-4"

  if (active) classes += " underline"
  return (
    <Link href={href} className={classes}>
      {children}
    </Link>
  )
}
