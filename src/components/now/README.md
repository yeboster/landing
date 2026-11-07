# now

## Overview

Sections for the `/now` page: a hero with a live Paris clock and weather, and a grid of current focus areas and stack. Content comes from `@/content/now` (`focus`, `stack`, `updated`, `FocusItem`).

## Interface

- `NowHero()`: hero with "Updated {updated}", a link to `https://nownownow.com`, `HeroGlow` (from `about/`) and `ParisNow`. `[now-hero.tsx:NowHero]`
- `FocusGrid()`: renders `focus` and `stack` from `@/content/now`. `[focus-grid.tsx:FocusGrid]`
- `ParisNow()`: client component (`'use client'`) showing the live time and weather. `[paris-now.tsx:ParisNow]`
- All exports are named.

## Invariants

- `focusIcons` is a `Record<FocusItem['kind'], ReactNode>` with keys `'work' | 'infra' | 'agents' | 'site'`. `[focus-grid.tsx:focusIcons]`
- The time is formatted with `Intl.DateTimeFormat('en-GB', { timeZone: site.timezone, hour, minute, second: '2-digit' })`. The text label "Paris" is hard-coded. `[paris-now.tsx:timeFormatter]` `[paris-now.tsx:ParisNow]`
- Before the first tick the time shows `'--:--:--'`; its initial state is `null`. `[paris-now.tsx:ParisNow]`
- Weather is set only when the response has a numeric `code` and a numeric `temperature`. `temp` is `Math.round(temperature)`. Unknown codes fall back to `{ emoji: '🌡️', label: 'unknown' }`. `[paris-now.tsx:weatherFromCode]` `[paris-now.tsx:ParisNow]`
- Fetch errors are swallowed (`.catch(() => {})`) and there is no error state; the weather span stays hidden. `[paris-now.tsx:ParisNow]`

## Side Effects

- `setInterval(tick, 1000)`, cleared on unmount. `[paris-now.tsx:ParisNow]`
- Network: `fetch('/api/paris-weather')` once on mount, guarded by an `active` flag. `[paris-now.tsx:ParisNow]`
- `FocusGrid` and `NowHero` have none of their own. `[focus-grid.tsx:FocusGrid]` `[now-hero.tsx:NowHero]`

## Verification

- Run: `pnpm verify` (runs `pnpm lint && pnpm build`)
