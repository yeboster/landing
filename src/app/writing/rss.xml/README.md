# writing/rss.xml

## Overview

A route handler at `GET /writing/rss.xml`. It returns an RSS 2.0 feed of the writing section, built from `getPosts()` in `src/lib/writing.ts`.

## Interface

- `[route.ts:GET]` - `GET()` returns a `Response` with an RSS 2.0 XML body and the header `Content-Type: application/rss+xml; charset=utf-8`. The body has one `<item>` per non-draft post, containing `title`, `link`, `guid isPermaLink="true"`, `pubDate`, `description` and one `<category>` per tag.
- `[route.ts:escapeXml]` - module-private helper. Escapes `<`, `>`, `&`, `'` and `"`.

## Invariants

- `[route.ts:GET]` - posts with `draft` set are excluded (`getPosts().filter((post) => !post.draft)`).
- `[route.ts:GET]` - `escapeXml` is applied to post `title`, `description`, each tag and `site.name`. URLs built from `siteUrl` and `post.slug` are not escaped.
- `[route.ts:GET]` - `lastBuildDate` is `new Date(posts[0].date)` when there is at least one post, and otherwise `new Date()`.
- `[route.ts:GET]` - the channel's `atom:link rel="self"` points to `${siteUrl}/writing/rss.xml`.

## Side Effects

- `[route.ts:GET]` - `getPosts` in `src/lib/writing.ts` reads Markdown files from `src/content/writing` with `readdirSync` and `readFileSync`.

## Verification

- Run: `pnpm verify`
