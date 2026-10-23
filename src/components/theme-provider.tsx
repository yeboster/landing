'use client'

import React, { createContext, useCallback, useContext, useEffect, useMemo, useSyncExternalStore } from 'react'

type Theme = 'light' | 'dark'

interface ThemeContextType {
  theme: Theme
  toggleTheme: () => void
  setTheme: (theme: Theme) => void
}

const ThemeContext = createContext<ThemeContextType>({
  theme: 'light',
  toggleTheme: () => {},
  setTheme: () => {},
})

export function useTheme() {
  return useContext(ThemeContext)
}

/*
 * The `dark` class on <html> is the source of truth. The pre-paint script in
 * layout.tsx sets it from `localStorage['theme']` (or the OS preference)
 * before React loads, so the store only has to read it back. The server
 * snapshot is always 'light'; React re-renders with the real value right
 * after hydration, so markup never mismatches. Anything that must be right on
 * first paint (icons, logos) should switch with `dark:` classes instead.
 */
const listeners = new Set<() => void>()

function readTheme(): Theme {
  return document.documentElement.classList.contains('dark') ? 'dark' : 'light'
}

function applyTheme(theme: Theme, persist: boolean) {
  document.documentElement.classList.toggle('dark', theme === 'dark')
  document.documentElement.style.colorScheme = theme
  if (persist) {
    try {
      localStorage.setItem('theme', theme)
    } catch {
      // Private mode or storage disabled: the switch still works for this visit.
    }
  }
  listeners.forEach((listener) => listener())
}

function subscribe(listener: () => void) {
  listeners.add(listener)
  return () => {
    listeners.delete(listener)
  }
}

function storedTheme(): Theme | null {
  try {
    const value = localStorage.getItem('theme')
    return value === 'dark' || value === 'light' ? value : null
  } catch {
    return null
  }
}

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const theme = useSyncExternalStore<Theme>(subscribe, readTheme, () => 'light')

  useEffect(() => {
    document.documentElement.style.colorScheme = readTheme()

    // Follow the OS while the visitor has not picked a theme themselves.
    const media = window.matchMedia('(prefers-color-scheme: dark)')
    const onSystemChange = (e: MediaQueryListEvent) => {
      if (!storedTheme()) applyTheme(e.matches ? 'dark' : 'light', false)
    }
    // Keep other open tabs in sync.
    const onStorage = (e: StorageEvent) => {
      if (e.key === 'theme' && (e.newValue === 'dark' || e.newValue === 'light')) applyTheme(e.newValue, false)
    }
    media.addEventListener('change', onSystemChange)
    window.addEventListener('storage', onStorage)
    return () => {
      media.removeEventListener('change', onSystemChange)
      window.removeEventListener('storage', onStorage)
    }
  }, [])

  const setTheme = useCallback((next: Theme) => applyTheme(next, true), [])
  const toggleTheme = useCallback(() => applyTheme(readTheme() === 'dark' ? 'light' : 'dark', true), [])

  const value = useMemo(() => ({ theme, toggleTheme, setTheme }), [theme, toggleTheme, setTheme])

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
}
