# contact

## Overview

The `/contact` route segment. It renders the Contact page, a hero plus the contact form and an aside, and its Open Graph image. The form and its submission logic live in `src/components/contact`, not in this directory.

## Interface

- `[page.tsx:ContactPage]` - default export. Renders `ContactHero`, then a section that wraps `ContactForm` in `Reveal`, followed by `ContactAside`.
- `[page.tsx:metadata]` - sets `title: 'Contact'`, a `description` that interpolates `site.responseTime`, and `alternates` (canonical `${siteUrl}/contact` plus the `application/rss+xml` feed `/writing/rss.xml`).
- `[opengraph-image.tsx:Image]` - default export. Returns `ogImage({ title: 'Contact', subtitle })`, where `subtitle` uses `site.availability.label` and `site.responseTime`.
- `[opengraph-image.tsx:alt]`, `[opengraph-image.tsx:size]`, `[opengraph-image.tsx:contentType]` - `alt` is ``Contact ${site.person}``. `size` and `contentType` are re-exported from `@/lib/og`.

## Invariants

- `[page.tsx:metadata]` - setting `alternates` replaces the root layout's `alternates`, so the RSS feed link must be restated here (per the code comment).
- `[page.tsx:ContactPage]` - the form section comes before `ContactAside` in the DOM. The code comment says the form leads in both the layout and the reading order.

## Side Effects

- `[page.tsx:ContactPage]` - None in this file. Any network calls made by `ContactForm` are defined in `src/components/contact/contact-form`, outside this directory.
- `[opengraph-image.tsx:Image]` - calls `ogImage` in `src/lib/og.tsx`, which reads `public/images/logo-light.svg` from disk and fetches the Inter font files from `github.com`.

## Verification

- Run: `pnpm verify`
