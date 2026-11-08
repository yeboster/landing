# portfolio/[slug]

## Overview

The dynamic `/portfolio/[slug]` route segment. It renders one case study from a Markdown file loaded through `src/lib/projects.ts`, along with that case study's metadata and Open Graph image.

## Interface

- `[page.tsx:generateStaticParams]` - returns `{ slug }` for each entry from `getCaseStudies()`.
- `[page.tsx:generateMetadata]` - `async ({ params }) => Metadata`. Sets `title`, `description`, `alternates` (canonical `${siteUrl}/portfolio/${slug}` plus `types: feedAlternates`) and `openGraph` (`type: 'article'`, `publishedTime: study.date`, `tags: study.tags`).
- `[page.tsx:CaseStudyPage]` - default export, `async`. Renders the case-study header, `CaseStudyMeta`, an optional `TableOfContents` and `TableOfContentsDisclosure`, `Markdown source={study.content}`, `CaseStudyNav` and `ContactCta`.
- `[opengraph-image.tsx:generateStaticParams]` - same slug list as the page, from `getCaseStudies()`.
- `[opengraph-image.tsx:Image]` - default export, `async`. Calls `ogImage({ title: study?.title ?? 'Case study', subtitle: study?.description || undefined })`.
- `[opengraph-image.tsx:alt]`, `[opengraph-image.tsx:size]`, `[opengraph-image.tsx:contentType]` - `alt` is `'Case study — bon.so'`. `size` and `contentType` are re-exported from `@/lib/og`.

## Invariants

- `[page.tsx:CaseStudyPage]` - calls `notFound()` when `getCaseStudy(slug)` returns nothing.
- `[page.tsx:generateMetadata]` - returns `{}` when the slug has no case study.
- `[page.tsx:CaseStudyPage]` - the matching project card from `getProject(slug)` is optional. The page renders `ProjectLogo` only when it exists, and the code comment states the page must not depend on it.
- `[page.tsx:CaseStudyPage]` - a table of contents is rendered only when `headings(study.content).length >= TOC_MIN_HEADINGS`.
- `[opengraph-image.tsx:Image]` - falls back to the title `'Case study'` when the slug does not resolve.

## Side Effects

- `[page.tsx:generateStaticParams]`, `[page.tsx:generateMetadata]`, `[page.tsx:CaseStudyPage]`, `[opengraph-image.tsx:generateStaticParams]`, `[opengraph-image.tsx:Image]` - `getCaseStudies` and `getCaseStudy` in `src/lib/projects.ts` read Markdown files from `src/content/projects` with `readdirSync` and `readFileSync`. Drafts are included only when `process.env.NODE_ENV === 'development'`.
- `[opengraph-image.tsx:Image]` - `ogImage` in `src/lib/og.tsx` reads `public/images/logo-light.svg` from disk and fetches the Inter font files from `github.com`.

## Verification

- Run: `pnpm verify`
