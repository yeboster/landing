# motion

## Overview

Scroll-reveal and entrance-animation wrappers built on `motion/react`, using the shared variants from `@/lib/motion` (`fadeUp`, `inView`, `stagger`). Most section components in `src/components` use them.

## Interface

- `Reveal({ children?, className?, id?, delay? = 0, immediate? = false, variants? = fadeUp, as? = 'div' })`. `[reveal.tsx:Reveal]`
- `RevealGroup({ ..., interval? = 0.08, delay? = 0, immediate? = false, as? = 'div' })`: staggers its `RevealItem` children with `stagger(interval, delay)`. `[reveal.tsx:RevealGroup]`
- `RevealItem({ children?, className?, id?, variants? = fadeUp, as? = 'div' })`: sets only `variants`. The parent `RevealGroup` drives the animation. `[reveal.tsx:RevealItem]`
- Client component (`'use client'`); all exports are named.

## Invariants

- `as` is one of `'div' | 'section' | 'ul' | 'ol' | 'li' | 'span' | 'p' | 'h1' | 'h2' | 'h3' | 'article'`. `[reveal.tsx:Tag]`
- With `immediate`, the wrapper uses `{ animate: 'visible' }`. Otherwise it uses `{ whileInView: 'visible', viewport: inView }`. `[reveal.tsx:trigger]`
- `withDelay` returns `variants` unchanged when `delay` is falsy or there is no `visible` object. Otherwise it merges `delay` into `visible.transition`. `[reveal.tsx:withDelay]`
- This file has no reduced-motion check of its own. `MotionProvider` (`<MotionConfig reducedMotion="user">`) in the parent directory is the component that applies the reduced-motion preference. `[reveal.tsx:Reveal]` `[../motion-provider.tsx:MotionProvider]`

## Side Effects

- When `immediate` is false, Motion's `whileInView` watches for viewport entry. The file adds no listeners or timers of its own. `[reveal.tsx:Reveal]` `[reveal.tsx:RevealGroup]`

## Verification

- Run: `pnpm verify` (runs `pnpm lint && pnpm build`)
