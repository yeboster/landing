'use client'

import { Moon, Sun } from 'lucide-react'
import { useReducedMotion } from 'motion/react'

import { cn } from '@/lib/utils'
import { useTheme } from './theme-provider'

let revealStyleInjected = false

/** The circular reveal for the View Transitions API, added on first use. */
function injectRevealStyle() {
  if (revealStyleInjected) return
  revealStyleInjected = true
  const style = document.createElement('style')
  style.textContent = `
::view-transition-old(root) { animation: none }
::view-transition-new(root) { animation: theme-reveal .5s cubic-bezier(0.16, 1, 0.3, 1) }
@keyframes theme-reveal {
  from { clip-path: circle(0px at var(--tx) var(--ty)) }
  to { clip-path: circle(var(--tr) at var(--tx) var(--ty)) }
}
`
  document.head.appendChild(style)
}

export function ThemeToggle({ className }: { className?: string }) {
  const { theme, toggleTheme } = useTheme()
  const reduce = useReducedMotion()

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (reduce || typeof document.startViewTransition !== 'function') {
      toggleTheme()
      return
    }
    injectRevealStyle()
    // Keyboard activation reports (0, 0): start from the button instead.
    const rect = e.currentTarget.getBoundingClientRect()
    const x = e.clientX || rect.left + rect.width / 2
    const y = e.clientY || rect.top + rect.height / 2
    // Radius to the farthest corner, so the circle ends exactly when it covers the screen.
    const r = Math.hypot(Math.max(x, window.innerWidth - x), Math.max(y, window.innerHeight - y))
    const root = document.documentElement
    root.style.setProperty('--tx', `${x}px`)
    root.style.setProperty('--ty', `${y}px`)
    root.style.setProperty('--tr', `${r}px`)
    document.startViewTransition(() => toggleTheme())
  }

  return (
    <button
      type="button"
      onClick={handleClick}
      className={cn(
        'relative inline-flex size-9 items-center justify-center rounded-full text-muted-foreground transition-colors duration-200 hover:bg-muted hover:text-foreground',
        className
      )}
      aria-label={theme === 'dark' ? 'Switch to light theme' : 'Switch to dark theme'}
    >
      {/* Swapped by the `dark` class, so the right icon shows before hydration. */}
      <Sun
        aria-hidden="true"
        className="absolute size-[18px] rotate-0 scale-100 opacity-100 transition-[transform,opacity] duration-300 ease-out-expo dark:-rotate-90 dark:scale-50 dark:opacity-0"
      />
      <Moon
        aria-hidden="true"
        className="absolute size-[18px] rotate-90 scale-50 opacity-0 transition-[transform,opacity] duration-300 ease-out-expo dark:rotate-0 dark:scale-100 dark:opacity-100"
      />
    </button>
  )
}
