# now

## Overview

The `/now` route segment. It renders the "Now" page from `NowHero` and `FocusGrid` (in `src/components/now`) and provides its Open Graph image.

## Interface

- `[page.tsx:NowPage]` - default export. Renders `<main className="flex-1 overflow-x-clip">` containing `NowHero` and then `FocusGrid`.
- `[page.tsx:metadata]` - `title: 'Now'`, plus a `description` that interpolates `site.person` and `site.company`.
- `[opengraph-image.tsx:Image]` - default export. Returns `ogImage({ title: 'Now', subtitle: 'Current work, side projects and the stack I am using.' })`.
- `[opengraph-image.tsx:alt]`, `[opengraph-image.tsx:size]`, `[opengraph-image.tsx:contentType]` - `alt` is ``What ${site.person} is focused on now``. `size` and `contentType` are re-exported from `@/lib/og`.

## Invariants

- None

## Side Effects

- `[page.tsx:NowPage]` - None in this file.
- `[opengraph-image.tsx:Image]` - calls `ogImage` in `src/lib/og.tsx`, which reads `public/images/logo-light.svg` from disk and fetches the Inter font files from `github.com`.

## Verification

- Run: `pnpm verify`
