'use client'

import { useEffect, useState } from 'react'

/**
 * Tiny module-level pub/sub for palette open state.
 *
 * Lives apart from the palette UI so the navbar trigger and the keyboard
 * host can import it without pulling the palette's ~9 kB of markup, icons
 * and animation code into the initial bundle.
 */
type Listener = () => void

let paletteOpen = false
let lastActiveElement: HTMLElement | null = null
const listeners = new Set<Listener>()

function emitChange(next: boolean) {
  paletteOpen = next
  listeners.forEach((listener) => listener())
}

export function isPaletteOpen() {
  return paletteOpen
}

/** Called by the navbar trigger button (and the Cmd+K shortcut). */
export function openCommandPalette() {
  if (typeof document !== 'undefined') {
    lastActiveElement = document.activeElement as HTMLElement | null
  }
  emitChange(true)
}

export function closeCommandPalette() {
  emitChange(false)
  lastActiveElement?.focus?.()
}

export function subscribeToPalette(listener: Listener) {
  listeners.add(listener)
  return () => {
    listeners.delete(listener)
  }
}

export function usePaletteOpen() {
  const [open, setOpen] = useState(paletteOpen)
  useEffect(() => subscribeToPalette(() => setOpen(paletteOpen)), [])
  return open
}
