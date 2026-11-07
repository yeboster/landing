# writing

## Overview

The `/writing` route segment. It renders the post index from `getPosts()` in `src/lib/writing.ts` and its Open Graph image. The child segments hold individual post pages (`[slug]`) and the RSS feed (`rss.xml`).

## Interface

- `[page.tsx:WritingPage]` - default export. Renders `WritingHero`, then `PostList posts={posts}` when `getPosts()` returns any posts, and `WritingEmptyState` otherwise.
- `[page.tsx:metadata]` - sets `title: 'Writing'`, a `description`, and `alternates` (canonical `${siteUrl}/writing` plus the `application/rss+xml` feed `/writing/rss.xml`).
- `[opengraph-image.tsx:Image]` - default export. Returns `ogImage({ title: 'Writing', subtitle: 'Notes on Rails, Rust, Kubernetes, and the AI plumbing in between.' })`.
- `[opengraph-image.tsx:alt]`, `[opengraph-image.tsx:size]`, `[opengraph-image.tsx:contentType]` - `alt` is `'Writing — notes from the build'`. `size` and `contentType` are re-exported from `@/lib/og`.
- `[slug]`: [./[slug]/README.md](./[slug]/README.md) - the dynamic post page (`/writing/[slug]`), with JSON-LD `BlogPosting` and an Open Graph image.
- rss.xml: [./rss.xml/README.md](./rss.xml/README.md) - `GET /writing/rss.xml`, the RSS 2.0 feed of non-draft posts.

## Invariants

- `[page.tsx:metadata]` - setting `alternates` replaces the root layout's `alternates`, so the RSS feed link is restated here (per the code comment).
- `[page.tsx:WritingPage]` - when `posts.length` is `0`, `WritingEmptyState` is rendered instead of `PostList`.

## Side Effects

- `[page.tsx:WritingPage]` - `getPosts` in `src/lib/writing.ts` reads Markdown files from `src/content/writing` with `readdirSync` and `readFileSync`. Drafts are included only when `process.env.NODE_ENV === 'development'`.
- `[opengraph-image.tsx:Image]` - `ogImage` in `src/lib/og.tsx` reads `public/images/logo-light.svg` from disk and fetches the Inter font files from `github.com`.

## Verification

- Run: `pnpm verify`
