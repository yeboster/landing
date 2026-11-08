# writing/[slug]

## Overview

The dynamic `/writing/[slug]` route segment. It renders one blog post from a Markdown file loaded through `src/lib/writing.ts`, along with its metadata, its JSON-LD `BlogPosting` schema and its Open Graph image.

## Interface

- `[page.tsx:generateStaticParams]` - returns `{ slug }` for each entry from `getPosts()`.
- `[page.tsx:generateMetadata]` - `async ({ params }) => Metadata`. Sets `title`, `description`, `alternates` (canonical `${siteUrl}/writing/${slug}` plus `types: feedAlternates`) and `openGraph` (`type: 'article'`, `publishedTime: post.date`, `tags: post.tags`).
- `[page.tsx:PostPage]` - default export, `async`. Renders a `<script type="application/ld+json">`, `PostHeader`, an optional `TableOfContentsDisclosure` and `TableOfContents`, `Markdown source={post.content}` and `PostFooter`.
- `[opengraph-image.tsx:generateStaticParams]` - same slug list as the page, from `getPosts()`.
- `[opengraph-image.tsx:Image]` - default export, `async`. Calls `ogImage({ title: post?.title ?? 'Writing', subtitle: post?.description || undefined })`.
- `[opengraph-image.tsx:alt]`, `[opengraph-image.tsx:size]`, `[opengraph-image.tsx:contentType]` - `alt` is `'Writing — bon.so'`. `size` and `contentType` are re-exported from `@/lib/og`.

## Invariants

- `[page.tsx:PostPage]` - calls `notFound()` when `getPost(slug)` returns nothing.
- `[page.tsx:generateMetadata]` - returns `{}` when the slug has no post.
- `[page.tsx:PostPage]` - the JSON-LD payload is `JSON.stringify(articleSchema).replace(/</g, '\\u003c')`. Per the code comment, this stops a title containing `</script>` from closing the tag early.
- `[page.tsx:PostPage]` - a table of contents is rendered only when `headings(post.content).length >= TOC_MIN_HEADINGS`.
- `[opengraph-image.tsx:Image]` - falls back to the title `'Writing'` when the slug does not resolve.

## Side Effects

- `[page.tsx:generateStaticParams]`, `[page.tsx:generateMetadata]`, `[page.tsx:PostPage]`, `[opengraph-image.tsx:generateStaticParams]`, `[opengraph-image.tsx:Image]` - `getPosts` and `getPost` in `src/lib/writing.ts` read Markdown files from `src/content/writing` with `readdirSync` and `readFileSync`. Drafts are included only when `process.env.NODE_ENV === 'development'`.
- `[opengraph-image.tsx:Image]` - `ogImage` in `src/lib/og.tsx` reads `public/images/logo-light.svg` from disk and fetches the Inter font files from `github.com`.

## Verification

- Run: `pnpm verify`
