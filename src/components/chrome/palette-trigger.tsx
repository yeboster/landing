'use client'

import { useEffect, useState } from 'react'
import { Search } from 'lucide-react'

import { openCommandPalette } from '@/components/command-palette-store'
import { cn } from '@/lib/utils'

/** "⌘" on Apple platforms, "Ctrl" elsewhere. Starts as ⌘ so server and client markup match. */
export function useModifierKey() {
  const [mod, setMod] = useState('⌘')
  useEffect(() => {
    if (!/Mac|iPhone|iPad|iPod/i.test(navigator.userAgent)) setMod('Ctrl')
  }, [])
  return mod
}

type PaletteTriggerProps = {
  /** `field` is the search-box look for wide screens; `icon` a bare icon button. */
  variant?: 'field' | 'icon'
  className?: string
}

/** Opens the ⌘K command palette. */
export function PaletteTrigger({ variant = 'field', className }: PaletteTriggerProps) {
  const mod = useModifierKey()

  if (variant === 'icon') {
    return (
      <button
        type="button"
        onClick={() => openCommandPalette()}
        aria-label="Search the site"
        aria-haspopup="dialog"
        className={cn(
          'inline-flex size-9 items-center justify-center rounded-full text-muted-foreground transition-colors duration-200 hover:bg-muted hover:text-foreground',
          className
        )}
      >
        <Search aria-hidden="true" className="size-[18px]" />
      </button>
    )
  }

  return (
    <button
      type="button"
      onClick={() => openCommandPalette()}
      aria-haspopup="dialog"
      aria-keyshortcuts="Meta+K Control+K"
      className={cn(
        'group inline-flex h-9 items-center gap-2 rounded-full border border-border bg-card/60 pl-3 pr-1.5 text-sm text-muted-foreground transition-colors duration-200 hover:border-foreground/20 hover:text-foreground',
        className
      )}
    >
      <Search aria-hidden="true" className="size-3.5" />
      <span className="hidden lg:inline">Search</span>
      <span className="sr-only lg:hidden">Search</span>
      <kbd className="ml-1 lg:ml-2 inline-flex h-6 items-center rounded-full border border-border bg-muted px-2 font-mono text-[10px] font-medium text-muted-foreground transition-colors group-hover:text-foreground">
        <span className="sr-only">Shortcut: </span>
        {mod} K
      </kbd>
    </button>
  )
}

/** Inline "press ⌘K" hint that also opens the palette when clicked. */
export function PaletteHint({ className, children }: { className?: string; children?: React.ReactNode }) {
  const mod = useModifierKey()
  return (
    <button
      type="button"
      onClick={() => openCommandPalette()}
      aria-haspopup="dialog"
      className={cn('inline-flex items-center gap-1.5 transition-colors hover:text-foreground', className)}
    >
      {children ?? 'press'}
      <kbd className="rounded border border-border bg-muted/60 px-1.5 py-px font-mono text-[11px]">{mod} K</kbd>
      to search
    </button>
  )
}
