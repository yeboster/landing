'use client'

import React, { createContext, useCallback, useContext, useEffect, useState } from 'react'

type Theme = 'light' | 'dark'

interface ThemeContextType {
  theme: Theme
  toggleTheme: () => void
}

const ThemeContext = createContext<ThemeContextType>({
  theme: 'light',
  toggleTheme: () => {},
})

export function useTheme() {
  return useContext(ThemeContext)
}

/**
 * Runs before paint (inlined in <head>) so the correct theme class is present
 * on first render and there is no flash of the wrong theme.
 */
export const themeInitScript = `(function(){try{var t=localStorage.getItem('theme');if(t==='dark'||(!t&&window.matchMedia('(prefers-color-scheme: dark)').matches)){document.documentElement.classList.add('dark')}}catch(e){}})();`

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<Theme>('light')

  // The init script has already applied the class; sync React state with it.
  useEffect(() => {
    setTheme(document.documentElement.classList.contains('dark') ? 'dark' : 'light')
  }, [])

  const toggleTheme = useCallback(() => {
    setTheme((prev) => {
      const next = prev === 'light' ? 'dark' : 'light'
      const root = document.documentElement
      // Suppress transitions for one frame so every surface switches at once.
      root.classList.add('disable-transitions')
      root.classList.toggle('dark', next === 'dark')
      requestAnimationFrame(() => root.classList.remove('disable-transitions'))
      try {
        localStorage.setItem('theme', next)
      } catch {}
      return next
    })
  }, [])

  return <ThemeContext.Provider value={{ theme, toggleTheme }}>{children}</ThemeContext.Provider>
}
