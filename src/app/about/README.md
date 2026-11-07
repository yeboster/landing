# about

## Overview

The `/about` route segment. It renders the About page, which also serves as the printable CV, and its Open Graph image. All visible content comes from components in `src/components/about`. Copy values come from `site` in `src/lib/site.ts`.

## Interface

- `[page.tsx:AboutPage]` - default export. Renders `<main>` containing `PrintMasthead`, `AboutHero`, `CareerTimeline`, `SkillsSection`, `PrinciplesSection` and `AboutCta`, in that order.
- `[page.tsx:metadata]` - `title: 'About'`, plus a `description` built from `site.person`, `site.role` and `site.company`.
- `[opengraph-image.tsx:Image]` - default export. Returns `ogImage({ title: 'About', subtitle })` from `@/lib/og`.
- `[opengraph-image.tsx:alt]`, `[opengraph-image.tsx:size]`, `[opengraph-image.tsx:contentType]` - `alt` is ``About ${site.person}``. `size` and `contentType` are re-exported from `@/lib/og`.

## Invariants

- `[page.tsx:AboutPage]` - `<main>` carries `print:[&_*]:!transform-none print:[&_*]:!opacity-100`. Per the code comment, this keeps scroll-reveal content visible when printed. Without it, sections that were never scrolled into view would print at opacity 0.
- `[page.tsx:AboutPage]` - `<main>` uses `overflow-x-clip`, not `overflow-hidden`. The code comment says `overflow-hidden` would break the sticky career intro.

## Side Effects

- `[opengraph-image.tsx:Image]` - calls `ogImage` in `src/lib/og.tsx`. That module reads `public/images/logo-light.svg` from disk at module load (`readFileSync`) and fetches the Inter `.woff` files from `github.com/rsms/inter` (`loadFonts`).
- `[page.tsx:AboutPage]` - None in this file.

## Verification

- Run: `pnpm verify`
