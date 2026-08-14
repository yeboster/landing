'use client'

import { useTheme } from './theme-provider'
import { Moon, Sun } from 'lucide-react'
import { useReducedMotion } from 'motion/react'

let circleStyleInjected = false

function injectCircleStyle() {
  if (circleStyleInjected) return
  circleStyleInjected = true
  const style = document.createElement('style')
  style.textContent = `
::view-transition-old(root) { animation: none }
::view-transition-new(root) { animation: theme-circle .55s ease-in }
@keyframes theme-circle {
  from { clip-path: circle(0px at var(--tx) var(--ty)) }
  to { clip-path: circle(150% at var(--tx) var(--ty)) }
}
`
  document.head.appendChild(style)
}

export function ThemeToggle() {
  const { theme, toggleTheme } = useTheme()
  const reduce = useReducedMotion()

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    const supportsViewTransition = typeof document.startViewTransition === 'function'
    if (reduce || !supportsViewTransition) {
      toggleTheme()
      return
    }
    injectCircleStyle()
    const root = document.documentElement
    root.style.setProperty('--tx', `${e.clientX}px`)
    root.style.setProperty('--ty', `${e.clientY}px`)
    document.startViewTransition(() => toggleTheme())
  }

  return (
    <button
      onClick={handleClick}
      className="relative inline-flex items-center justify-center w-10 h-10 rounded-full bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#9f4f9d]"
      aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
    >
      <Sun className={`h-5 w-5 transition-all duration-300 absolute ${theme === 'dark' ? 'opacity-0 rotate-90 scale-0' : 'opacity-100 rotate-0 scale-100'}`} />
      <Moon className={`h-5 w-5 transition-all duration-300 absolute ${theme === 'light' ? 'opacity-0 -rotate-90 scale-0' : 'opacity-100 rotate-0 scale-100'}`} />
    </button>
  )
}
