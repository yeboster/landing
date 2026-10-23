'use client'

import { useEffect, useState } from 'react'
import { Moon, Sun } from 'lucide-react'

import { cn } from '@/lib/utils'
import { useTheme } from './theme-provider'

/**
 * Icon visibility is driven purely by the `dark` class on <html> (set pre-paint),
 * so server and client markup always match. The swap uses a CSS keyframe
 * (tailwindcss-animate) rather than a transition, because the provider
 * disables transitions for one frame while switching themes.
 */
export function ThemeToggle({ className }: { className?: string }) {
  const { theme, toggleTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => setMounted(true), [])

  const label = mounted ? `Switch to ${theme === 'dark' ? 'light' : 'dark'} theme` : 'Toggle theme'

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={label}
      title={mounted ? label : undefined}
      className={cn(
        'relative inline-flex size-9 shrink-0 items-center justify-center rounded-full text-muted-foreground',
        'transition-colors duration-200 hover:bg-muted hover:text-foreground active:scale-95',
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background',
        className
      )}
    >
      <Sun
        aria-hidden="true"
        className="size-[18px] duration-500 ease-out-expo animate-in fade-in zoom-in-50 spin-in-[-90deg] dark:hidden"
      />
      <Moon
        aria-hidden="true"
        className="hidden size-[18px] duration-500 ease-out-expo animate-in fade-in zoom-in-50 spin-in-90 dark:block"
      />
    </button>
  )
}
