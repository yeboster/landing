# ui

## Overview

Shared presentational primitives used across the page components: buttons and button links, cards, the eyebrow label, the theme-aware logo, and the section layout with its header. None of them has `'use client'`.

## Interface

- `type ButtonStyleProps = { variant?: Variant; size?: Size; className?: string }`. `[button.tsx:ButtonStyleProps]`
- `buttonClasses({ variant = 'primary', size = 'md', className } = {}): string`. `[button.tsx:buttonClasses]`
- `Button(props: ButtonStyleProps & ButtonHTMLAttributes)`. `[button.tsx:Button]`
- `ButtonLink({ href, external?, variant?, size?, ...anchorProps })`. `[button.tsx:ButtonLink]`
- `Card`: `forwardRef<HTMLDivElement>`, with props `HTMLAttributes<HTMLDivElement> & { interactive? = false }`. `[card.tsx:Card]`
- `CardIcon({ className?, children })`. `[card.tsx:CardIcon]`
- `Eyebrow(props: HTMLAttributes<HTMLSpanElement>)`. `[eyebrow.tsx:Eyebrow]`
- `Logo`: `forwardRef<HTMLImageElement>`, with props `LogoProps` (`Omit<ImageProps, 'src' | 'alt'>`, plus `alt?` and `className?`). `[logo.tsx:Logo]` `[logo.tsx:LogoProps]`
- `Section`: `forwardRef<HTMLElement>`, with props `HTMLAttributes<HTMLElement> & { tone?: 'default' | 'subtle' }`. `[section.tsx:Section]`
- `SectionHeader({ title, eyebrow?, description?, align? = 'center', titleId?, action?, className? })`. `[section.tsx:SectionHeader]`

## Invariants

- `Variant` is `'primary' | 'brand' | 'secondary' | 'ghost'`. `Size` is `'sm' | 'md' | 'lg' | 'icon'`. `[button.tsx:Variant]` `[button.tsx:Size]`
- `ButtonLink` renders a plain `<a>` when `external` is truthy or `href` matches `/^(https?:|mailto:)/`. Otherwise it renders `next/link`. A new tab is used when `external ?? href.startsWith('http')`; in that case it adds `target="_blank" rel="noopener noreferrer"` and the sr-only text " (opens in a new tab)". `[button.tsx:ButtonLink]`
- `Logo` uses the default alt text `${site.name} logo`. It renders two `next/image` elements, and the `dark` class decides which one is visible: `logo-dark.svg` (dark strokes for the light theme, class `dark:hidden`, receives the `ref`) and `logo-light.svg` (class `hidden dark:block`). `[logo.tsx:Logo]`
- `Section` with `tone === 'subtle'` adds `border-y border-border bg-subtle`, and its children are wrapped in `.container`. `[section.tsx:Section]`
- `SectionHeader` renders the eyebrow only when it is provided. The title `h2` gets `id={titleId}`, and the parts reveal with delays 0, 0.05, 0.1 and 0.15 through `Reveal` from `../motion/reveal.tsx`. `[section.tsx:SectionHeader]`

## Side Effects

- None. No file in this directory fetches, uses storage, adds listeners or sets timers. `[button.tsx:ButtonLink]` `[section.tsx:Section]`

## Verification

- Run: `pnpm verify` (runs `pnpm lint && pnpm build`)
