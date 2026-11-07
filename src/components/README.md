# components

## Overview

The site's React components. This directory holds 23 shared files: the global providers (theme, motion), the command palette and its store, the interactive and animated effects (cursor, aurora, dot grid, tilt, scramble, split, rotating and scroll-reveal text), the terminal card, GitHub stats, and the Konami-code Matrix easter egg. Page-specific sections live in the subdirectories below. Every export is named. Most files here are client components (`'use client'`); the exceptions are `availability-badge.tsx` and `tech-marquee.tsx`.

## Interface

### Providers and global state

- `ThemeProvider({ children })` and `useTheme(): { theme: 'light' | 'dark', toggleTheme, setTheme }`. `[theme-provider.tsx:ThemeProvider]` `[theme-provider.tsx:useTheme]`
- `ThemeToggle({ className? })`. `[theme-toggle.tsx:ThemeToggle]`
- `MotionProvider({ children })`: wraps children in `<MotionConfig reducedMotion="user">`. `[motion-provider.tsx:MotionProvider]`
- `PageTransition({ children })`: its doc comment says `app/template.tsx` mounts it. `[page-transition.tsx:PageTransition]`
- Command palette store: `isPaletteOpen`, `openCommandPalette`, `closeCommandPalette`, `subscribeToPalette(listener) => unsubscribe`, `usePaletteOpen()`. `[command-palette-store.ts:openCommandPalette]` `[command-palette-store.ts:closeCommandPalette]` `[command-palette-store.ts:subscribeToPalette]` `[command-palette-store.ts:usePaletteOpen]` `[command-palette-store.ts:isPaletteOpen]`
- `CommandPaletteHost({ posts? = [] })`: binds the keyboard shortcut and lazy-loads the palette. `[command-palette-host.tsx:CommandPaletteHost]`
- `CommandPalette({ posts? = [] })`: the modal dialog with a combobox. `[command-palette.tsx:CommandPalette]`

### Effects and widgets

- `Aurora({ children?, maxOffset? = 12, className? })`. `[aurora.tsx:Aurora]`
- `DotGrid` (`forwardRef<DotGridHandle>`, no props) and `DotGridHandle { setPointer(x | null, y | null) }`. `[dot-grid.tsx:DotGrid]` `[dot-grid.tsx:DotGridHandle]`
- `Cursor()`. `[cursor.tsx:Cursor]`
- `TiltCard({ children, maxTilt? = 3, perspective? = 900, surface? = false, className? })`. `[tilt-card.tsx:TiltCard]`
- `MagneticLink({ href, children, variant? = 'primary', size? = 'lg', className? })`. `[magnetic-link.tsx:MagneticLink]`
- `ScrollProgress()`. `[scroll-progress.tsx:ScrollProgress]`
- Text effects:
  - `SplitText({ text, stagger?, duration? = 0.45, by? = 'word', delay? = 0.05, gradient? = false, className? })` `[split-text.tsx:SplitText]`
  - `RotatingText({ words, interval? = 2600, className? })` `[rotating-text.tsx:RotatingText]`
  - `ScrambleText({ text, className? })` `[scramble-text.tsx:ScrambleText]`
  - `ScrollRevealText({ text, className? })` `[scroll-reveal-text.tsx:ScrollRevealText]`
- `TechMarquee({ className? })`. `[tech-marquee.tsx:TechMarquee]`
- `AvailabilityBadge()`: shows `site.availability.label`. `[availability-badge.tsx:AvailabilityBadge]`
- `TerminalCard()`: an interactive terminal with a fixed command set. `[terminal-card.tsx:TerminalCard]`
- `GithubStats()`. `[github-stats.tsx:GithubStats]`
- `KonamiMatrix()` and `MatrixRain({ onDismiss })`. `[konami-matrix.tsx:KonamiMatrix]` `[matrix-rain.tsx:MatrixRain]`

### Subdirectories

- [about](./about/README.md): sections for the about/résumé page and print-only pieces.
- [chrome](./chrome/README.md): navigation link lists, `isActivePath`, and the command palette trigger and hint.
- [contact](./contact/README.md): contact page sections and the FormSubmit enquiry form.
- [home](./home/README.md): home page sections and their copy in `data.ts`.
- [motion](./motion/README.md): the `Reveal`, `RevealGroup` and `RevealItem` animation wrappers.
- [now](./now/README.md): `/now` page sections, including the live Paris clock and weather.
- [portfolio](./portfolio/README.md): portfolio and case-study components.
- [ui](./ui/README.md): the `Button`, `ButtonLink`, `Card`, `Eyebrow`, `Logo`, `Section` and `SectionHeader` primitives.
- [writing](./writing/README.md): writing index, post page components and `RSS_PATH`.

## Invariants

- The palette store is module-level singleton state (`paletteOpen`, `lastActiveElement`, `listeners`). A doc comment says it is kept separate from `command-palette.tsx` so the triggers do not add the palette to the initial bundle. `[command-palette-store.ts:emitChange]`
- `CommandPaletteHost` loads `./command-palette` with `dynamic(..., { ssr: false })` and mounts it only after the first open. Cmd/Ctrl+K (`(e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k'`) toggles it. `[command-palette-host.tsx:CommandPaletteHost]`
- Palette groups render in the order `['Pages', 'Writing', 'Actions', 'Elsewhere']`. Option ids are `${uid}-${action.id}`, and the input is the dialog's only tab stop. `[command-palette.tsx:GROUP_ORDER]` `[command-palette.tsx:CommandPalette]`
- `useTheme` does not throw outside `ThemeProvider`. The default context is `{ theme: 'light', toggleTheme: () => {}, setTheme: () => {} }`. `[theme-provider.tsx:useTheme]`
- The `dark` class on `<html>` is the theme's source of truth. The server snapshot is always `'light'`. Only `'dark'` or `'light'` is accepted from storage. An OS theme change applies only when no theme is stored. `[theme-provider.tsx:readTheme]` `[theme-provider.tsx:storedTheme]` `[theme-provider.tsx:ThemeProvider]`
- `ThemeToggle` falls back to a plain `toggleTheme()` when reduced motion is on or `document.startViewTransition` is unavailable. `[theme-toggle.tsx:ThemeToggle]`
- Reduced motion:
  - `useReducedMotion()` disables or simplifies the effect in `Aurora`, `CommandPalette` (duration 0), `Cursor`, `DotGrid` (static draw), `MatrixRain` (skips the draw loop), `GithubStats`, `KonamiMatrix` (renders `null`), `MagneticLink`, `PageTransition`, `RotatingText`, `ScrollProgress` (renders `null`), `ScrollRevealText`, `SplitText`, `TerminalCard`, `ThemeToggle` and `TiltCard`. `[cursor.tsx:Cursor]` `[konami-matrix.tsx:KonamiMatrix]` `[scroll-progress.tsx:ScrollProgress]` `[dot-grid.tsx:DotGrid]`
  - `ScrambleText` checks `matchMedia('(prefers-reduced-motion: reduce)')` directly. `[scramble-text.tsx:ScrambleText]`
- Fine-pointer gating: `Aurora`, `Cursor`, `TiltCard` and `ScrambleText` require `matchMedia('(hover: hover) and (pointer: fine)')`. `[aurora.tsx:Aurora]` `[cursor.tsx:Cursor]` `[tilt-card.tsx:TiltCard]` `[scramble-text.tsx:ScrambleText]`
- `Aurora` listens on its parent element (`ref.current?.parentElement`), not on itself. `[aurora.tsx:Aurora]`
- `DotGrid` is `pointer-events-none`; its parent must forward coordinates through `setPointer` (`home/hero-stage.tsx` does this). `[dot-grid.tsx:DotGrid]`
- `RotatingText` uses each word as a React key. `[rotating-text.tsx:RotatingText]`
- `SplitText` caps the total stagger at `MAX_SPREAD = 0.4` s. `[split-text.tsx:MAX_SPREAD]`
- `TerminalCard`:
  - keeps at most `MAX_HISTORY = 100` lines `[terminal-card.tsx:MAX_HISTORY]`
  - types at `TYPE_INTERVAL_MS = 18` per character `[terminal-card.tsx:TYPE_INTERVAL_MS]`
  - `open <target>` accepts the keys of `ROUTES` (`about`, `portfolio`, `contact`, `now`, `home`) `[terminal-card.tsx:ROUTES]`
- `KonamiMatrix`:
  - matches `KONAMI_SEQUENCE` on `e.key.toLowerCase()` `[konami-matrix.tsx:KONAMI_SEQUENCE]`
  - ignores keys typed into `INPUT`, `TEXTAREA` or contentEditable targets `[konami-matrix.tsx:KonamiMatrix]`
  - lazy-loads `./matrix-rain` with `ssr: false` `[konami-matrix.tsx:MatrixRain]`
- `MatrixRain` auto-dismisses after `AUTO_DISMISS_MS = 12000` and draws at 24 fps. `[matrix-rain.tsx:MatrixRain]`
- `GithubStats` expects `{ public_repos, followers, stars }` (numbers). A response that is not OK switches it to an error state that shows a link to `site.socials.github`. `[github-stats.tsx:GithubStats]`
- `TechMarquee` repeats the list `REPEATS_PER_COPY = 3` times per copy. Its doc comment requires one copy to be at least the viewport width (`min-w-[100vw]`). `[tech-marquee.tsx:REPEATS_PER_COPY]`

## Side Effects

- Network:
  - `fetch('/api/github-stats')` on mount `[github-stats.tsx:GithubStats]`
  - dynamic chunk imports of `./command-palette` and `./matrix-rain` `[command-palette-host.tsx:CommandPaletteHost]` `[konami-matrix.tsx:KonamiMatrix]`
- Storage: `localStorage` key `'theme'` (read, and written by `toggleTheme` and `setTheme` through `applyTheme(next, true)`). A window `storage` listener filtered on `e.key === 'theme'` syncs tabs. `[theme-provider.tsx:applyTheme]` `[theme-provider.tsx:storedTheme]` `[theme-provider.tsx:ThemeProvider]`
- DOM mutations:
  - `<html>` class `dark` and `style.colorScheme` `[theme-provider.tsx:applyTheme]`; `ThemeProvider` also sets `style.colorScheme = readTheme()` on mount `[theme-provider.tsx:ThemeProvider]`
  - scroll position: `scrollTop = scrollHeight` whenever `lines` changes `[terminal-card.tsx:TerminalCard]`; `scrollIntoView({ block: 'nearest' })` on the highlighted option `[command-palette.tsx:CommandPalette]`
  - `<html>` class `custom-cursor` `[cursor.tsx:Cursor]`
  - CSS vars `--tx`, `--ty` and `--tr` on `<html>`, a `<style>` element appended once to `document.head`, and `document.startViewTransition` `[theme-toggle.tsx:ThemeToggle]`
  - `document.body.style.overflow = 'hidden'` while the palette is open, with the previous value restored after `[command-palette.tsx:CommandPalette]`
- Global listeners:
  - window `keydown` `[command-palette-host.tsx:CommandPaletteHost]` `[command-palette.tsx:CommandPalette]` `[konami-matrix.tsx:KonamiMatrix]` `[matrix-rain.tsx:MatrixRain]`
  - window `resize` `[matrix-rain.tsx:MatrixRain]`
  - window `mousemove`, `mousedown` and `mouseup`, and document `mouseleave` and `mouseover` `[cursor.tsx:Cursor]`
  - parent-element `pointermove` and `pointerleave` `[aurora.tsx:Aurora]`
  - MediaQueryList `change` `[theme-provider.tsx:ThemeProvider]` `[cursor.tsx:Cursor]` `[tilt-card.tsx:TiltCard]` `[scramble-text.tsx:ScrambleText]`
- Navigation:
  - `router.push` to `/`, `/portfolio`, `/about`, `/writing`, `/now`, `/contact` and `/writing/${slug}` `[command-palette.tsx:CommandPalette]`
  - `router.push(path)` for `open <target>` `[terminal-card.tsx:runCommand]`
  - `window.open(url, '_blank', 'noopener,noreferrer')` `[command-palette.tsx:openExternal]`
- Clipboard: `navigator.clipboard.writeText(site.email)`. `[command-palette.tsx:CommandPalette]`
- Focus:
  - `closeCommandPalette` restores focus to the element that was active when the palette opened `[command-palette-store.ts:closeCommandPalette]`
  - `CommandPalette` focuses its input on open and again on every Tab press `[command-palette.tsx:CommandPalette]`
  - `TerminalCard` focuses its input when the card is clicked `[terminal-card.tsx:TerminalCard]`
  - `MatrixRain` moves focus to its exit button and restores it on unmount `[matrix-rain.tsx:MatrixRain]`
- Timers and animation frames:
  - `setInterval`: `[rotating-text.tsx:RotatingText]`
  - `setTimeout`: `[terminal-card.tsx:typeLine]` `[matrix-rain.tsx:MatrixRain]` `[command-palette.tsx:CommandPalette]` (2000 ms)
  - `requestAnimationFrame`: `[aurora.tsx:Aurora]` `[dot-grid.tsx:DotGrid]` `[matrix-rain.tsx:MatrixRain]` `[scramble-text.tsx:ScrambleText]`
- Canvas 2D drawing, plus `ResizeObserver`/`IntersectionObserver` in `DotGrid`. `[dot-grid.tsx:DotGrid]` `[matrix-rain.tsx:MatrixRain]`

## Verification

- Run: `pnpm verify` (runs `pnpm lint && pnpm build`)
