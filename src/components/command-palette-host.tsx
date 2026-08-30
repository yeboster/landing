'use client'

import dynamic from 'next/dynamic'
import { useEffect, useState } from 'react'
import {
  closeCommandPalette,
  isPaletteOpen,
  openCommandPalette,
  subscribeToPalette,
} from './command-palette-store'

const CommandPalette = dynamic(
  () => import('./command-palette').then((m) => m.CommandPalette),
  { ssr: false },
)

/**
 * Owns the global Cmd+K / Ctrl+K shortcut and mounts the palette lazily:
 * the palette chunk is fetched the first time it is opened, so visitors who
 * never use it never download it.
 */
export function CommandPaletteHost() {
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault()
        if (isPaletteOpen()) closeCommandPalette()
        else openCommandPalette()
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    const unsubscribe = subscribeToPalette(() => {
      if (isPaletteOpen()) setLoaded(true)
    })
    if (isPaletteOpen()) setLoaded(true)
    return () => {
      window.removeEventListener('keydown', handleKeyDown)
      unsubscribe()
    }
  }, [])

  return loaded ? <CommandPalette /> : null
}
