# chrome

## Overview

Site-chrome helpers: the navigation link lists with their active-path rule, and the buttons and hint that open the command palette through the shared palette store.

## Interface

- `type NavLink = { href: string; label: string }`. `[nav-config.ts:NavLink]`
- `primaryNav: NavLink[]`: Work `/portfolio`, About `/about`, Writing `/writing`, Contact `/contact`. `[nav-config.ts:primaryNav]`
- `footerNav: NavLink[]`: Work, About, Writing, Now `/now`, Résumé (`site.resumePath`), Contact. `[nav-config.ts:footerNav]`
- `isActivePath(pathname, href): boolean`. `[nav-config.ts:isActivePath]`
- `useModifierKey(): string`: returns `'⌘'` or `'Ctrl'`. `[palette-trigger.tsx:useModifierKey]`
- `PaletteTrigger({ variant?: 'field' | 'icon', className? })`: the default variant is `'field'`. `[palette-trigger.tsx:PaletteTrigger]`
- `PaletteHint({ className?, children? })`: renders `children` (default `'press'`), then a `<kbd>` with `{mod} K` from `useModifierKey()` (so `⌘ K`, or `Ctrl K` on non-Apple user agents), then "to search". `[palette-trigger.tsx:PaletteHint]`
- `palette-trigger.tsx` is a client component (`'use client'`).

## Invariants

- `isActivePath`: for `href === '/'` the path must equal `'/'` exactly. Otherwise it matches `pathname === href || pathname.startsWith(`${href}/`)`. `[nav-config.ts:isActivePath]`
- `useModifierKey` starts as `'⌘'`, so server and client markup match. After mount it switches to `'Ctrl'` when `navigator.userAgent` does not match `/Mac|iPhone|iPad|iPod/i`. `[palette-trigger.tsx:useModifierKey]`
- The `'field'` variant sets `aria-keyshortcuts="Meta+K Control+K"`. Both variants set `aria-haspopup="dialog"`. `[palette-trigger.tsx:PaletteTrigger]`

## Side Effects

- Both `PaletteTrigger` and `PaletteHint` call `openCommandPalette()` from `@/components/command-palette-store`, which changes the global palette store. `[palette-trigger.tsx:PaletteTrigger]` `[palette-trigger.tsx:PaletteHint]`
- `useModifierKey` reads `navigator.userAgent` once in a `useEffect`. `[palette-trigger.tsx:useModifierKey]`

## Verification

- Run: `pnpm verify` (runs `pnpm lint && pnpm build`)
