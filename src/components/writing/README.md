# writing

## Overview

Components for the writing index and post pages: hero, post list, post header and footer, metadata line and tags, table of contents, and an empty state. Post types and helpers come from `@/lib/post` (`PostMeta`, `formatDate`) and `@/lib/markdown` (`Heading`).

## Interface

- `WritingHero()` and `RSS_PATH = '/writing/rss.xml'`. `[writing-hero.tsx:WritingHero]` `[writing-hero.tsx:RSS_PATH]`
- `PostList({ posts: PostMeta[] })`. `[post-list.tsx:PostList]`
- `PostHeader({ post: PostMeta })` and `BackLink({ href, children })`. `[post-header.tsx:PostHeader]` `[post-header.tsx:BackLink]`
- `PostFooter()`. `[post-footer.tsx:PostFooter]`
- `PostMetaLine({ post: Pick<PostMeta, 'date' | 'readingTime' | 'draft'>, dateStyle? = 'short', className? })`, `DraftBadge()` and `TagList({ tags, className? })`. `[post-meta.tsx:PostMetaLine]` `[post-meta.tsx:DraftBadge]` `[post-meta.tsx:TagList]`
- `TableOfContents({ items: Heading[], className? })`, `TableOfContentsDisclosure({ items, className? })` and `TOC_MIN_HEADINGS = 3`. `[table-of-contents.tsx:TableOfContents]` `[table-of-contents.tsx:TableOfContentsDisclosure]` `[table-of-contents.tsx:TOC_MIN_HEADINGS]`
- `WritingEmptyState()`. `[empty-state.tsx:WritingEmptyState]`
- No file has `'use client'`; all exports are named.

## Invariants

- `RSS_PATH` is linked with a plain `<a>`, not `next/link`; the code comment says this avoids a `next/link` prefetch. `[writing-hero.tsx:RSS_PATH]`
- `PostList` renders posts in the order it receives them, linking to `/writing/${post.slug}`. `[post-list.tsx:PostList]`
- `PostMetaLine` renders `<time dateTime={post.date}>` with `formatDate(post.date, dateStyle)`, the text "{readingTime} min read", and `DraftBadge` only when `post.draft` is set. `[post-meta.tsx:PostMetaLine]`
- `TagList` (in `post-meta.tsx`) returns `null` for empty `tags`. This is a separate component from `portfolio/tag-list.tsx` and `home/tag-list.tsx`. `[post-meta.tsx:TagList]`
- `TOC_MIN_HEADINGS` is exported but not enforced in this directory. `[table-of-contents.tsx:TOC_MIN_HEADINGS]`
- In the table of contents, headings with `level === 3` get `pl-3`, and links point to `#${item.id}`. `[table-of-contents.tsx:Links]`

## Side Effects

- No file here adds side effects itself; the only navigation is through links and hash anchors. `[post-list.tsx:PostList]` `[table-of-contents.tsx:TableOfContents]`
- `WritingHero` renders `Aurora`, which adds pointer listeners and calls `requestAnimationFrame` (see `../README.md`). `[writing-hero.tsx:WritingHero]`

## Verification

- Run: `pnpm verify` (runs `pnpm lint && pnpm build`)
