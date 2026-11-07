# src/lib

## Overview

Shared, framework-level helpers for the Next.js site: the canonical site identity
(`site.ts`), shared motion variants (`motion.ts`), the Tailwind class merger
(`utils.ts`), a small React-element Markdown renderer (`markdown.tsx`), a
frontmatter parser (`frontmatter.ts`), file-backed content indexes for writing
posts (`writing.ts`, `post.ts`) and case studies (`projects.ts`), the static
portfolio project list (`projects-data.ts`), and the shared Open Graph card
renderer (`og.tsx`).

Content files read by `writing.ts` and `projects.ts` live outside this package in
`src/content/writing` and `src/content/projects` (see `src/content/README.md`).

## Interface

### Site identity — `site.ts`

- `siteUrl` — `'https://bon.so'` [site.ts:siteUrl]
- `site` — `as const` identity object: `siteUrl`, `name`, `person`, `role`, `pitch`,
  `company`, `location`, `timezone`, `email`, `booking`, `tagline`, `responseTime`,
  `availability { label, detail }`, `engagements` (string list), `resumePath`,
  `socials { github, gitlab, twitter, linkedin }` [site.ts:site]
- `defaultTitle` — `` `${site.person} — Rails, AI & Platform Engineer` `` [site.ts:defaultTitle]

### Styling and motion — `utils.ts`, `motion.ts`

- `cn(...inputs: ClassValue[]): string` — `twMerge(clsx(inputs))` (packages `clsx`, `tailwind-merge`) [utils.ts:cn]
- `ease` — `[0.16, 1, 0.3, 1] as const` [motion.ts:ease]
- `duration` — `{ fast: 0.3, base: 0.6, slow: 0.9 } as const` [motion.ts:duration]
- `fadeUp`, `fadeIn`, `scaleIn` — `Variants` (type from `motion/react`) with `hidden`/`visible` states using `duration.base` and `ease` [motion.ts:fadeUp] [motion.ts:fadeIn] [motion.ts:scaleIn]
- `stagger(staggerChildren = 0.08, delayChildren = 0): Variants` — container variants [motion.ts:stagger]
- `inView` — `{ once: true, margin: '-80px' } as const` viewport settings [motion.ts:inView]

### Markdown — `frontmatter.ts`, `markdown.tsx`

- `parseFrontmatter(raw: string): { data: Record<string, unknown>; content: string }` [frontmatter.ts:parseFrontmatter]
- `Heading` — type `{ id: string; text: string; level: 2 | 3 }` [markdown.tsx:Heading]
- `headings(source: string): Heading[]` — h2/h3 outline with the ids `Markdown` renders [markdown.tsx:headings]
- `Markdown({ source: string; className?: string })` — React component rendering headings, paragraphs, fenced code, blockquotes, bullet/numbered lists, tables, block/inline images, rules, and inline code/bold/italic/links [markdown.tsx:Markdown]

### Writing posts — `post.ts`, `writing.ts`

- `PostMeta` — type `{ slug, title, description, date: string; tags: string[]; draft: boolean; readingTime: number }` [post.ts:PostMeta]
- `Post` — type `PostMeta & { content: string }` [post.ts:Post]
- `formatDate(date: string, style: 'long' | 'short' = 'long'): string` [post.ts:formatDate]
- `readingTime(markdown: string): number` [post.ts:readingTime]
- `Post`, `PostMeta` — type re-exports from `./post` [writing.ts:Post] [writing.ts:PostMeta]
- `getPosts(): PostMeta[]` — included posts, newest first, without `content` [writing.ts:getPosts]
- `getPost(slug: string): Post | undefined` [writing.ts:getPost]

### Case studies — `projects.ts`

- `CaseStudyMeta` — type `{ slug, title, description, date: string; tags: string[]; draft: boolean }` [projects.ts:CaseStudyMeta]
- `CaseStudy` — type `CaseStudyMeta & { content: string }` [projects.ts:CaseStudy]
- `getCaseStudies(): CaseStudyMeta[]` — included case studies without `content` [projects.ts:getCaseStudies]
- `getCaseStudy(slug: string): CaseStudy | undefined` [projects.ts:getCaseStudy]
- `caseStudySlugs(): string[]` [projects.ts:caseStudySlugs]

### Portfolio project list — `projects-data.ts`

- `ProjectLinkKind` — type `'website' | 'source'` [projects-data.ts:ProjectLinkKind]
- `ProjectLink` — interface `{ kind: ProjectLinkKind; label: string; href: string }` [projects-data.ts:ProjectLink]
- `Project` — interface with `slug`, `title`, `description`, `alt`, `href`, `hrefKind`, `tags`, and optional `image` (`StaticImageData`), `icon` (`LucideIcon`), `liveUrl`, `role`, `featured`, `highlight` [projects-data.ts:Project]
- `projects: Project[]` — static list (slugs `meta-names`, `jokehub`, `todoist-actions`, `gitops-k8s-cluster`) [projects-data.ts:projects]
- `highlightedProjects` — `projects.filter((project) => project.highlight)` [projects-data.ts:highlightedProjects]
- `projectLinks(project: Project): ProjectLink[]` [projects-data.ts:projectLinks]
- `getProject(slug: string): Project | undefined` [projects-data.ts:getProject]

### Open Graph images — `og.tsx`

- `size` — `{ width: 1200, height: 630 }` [og.tsx:size]
- `contentType` — `'image/png'` [og.tsx:contentType]
- `ogImage({ title: string; subtitle?: string })` — async; returns a `next/og` `ImageResponse` card using `site.person`, the `siteUrl` host, `title`, optional `subtitle`, and `` `${site.role} at ${site.company}` `` / `site.name` [og.tsx:ogImage]

No subdirectories.

## Invariants

- Frontmatter: line endings are normalised (`\r\n?` to `\n`); the source must match `/^---\n([\s\S]*?)\n---\n?([\s\S]*)$/` or the whole source is returned as `content` with empty `data`; keys must match `/^([A-Za-z_][\w-]*):\s*(.*)$/` (other lines are skipped); surrounding quotes are stripped; `'true'`/`'false'` become booleans; `[a, b]` values become trimmed string lists with empty items dropped. No nested YAML [frontmatter.ts:parseFrontmatter]
- Post and case-study files: only `*.md` not starting with `_` are read; `slug` is the filename without `.md` [writing.ts:allPosts] [projects.ts:all]
- `title` and `date` must be strings and `date` must pass `Date.parse`, otherwise `parse` throws (`` frontmatter needs a string `title` and `date` `` / `` `date` must be parseable ``) [writing.ts:parse] [projects.ts:parse]
- `description` defaults to `''`, `tags` to `[]` (items mapped through `String`), and `draft` is `true` only when the value is strictly `true` [writing.ts:parse] [projects.ts:parse]
- A content directory that `readdirSync` cannot read yields `[]` instead of an error [writing.ts:allPosts] [projects.ts:all]
- Drafts are included only when `process.env.NODE_ENV === 'development'` [writing.ts:includeDrafts] [projects.ts:includeDrafts]
- Posts are sorted by `Date.parse(date)` descending; case studies are not sorted (directory listing order) [writing.ts:allPosts] [projects.ts:all]
- `getPosts` and `getCaseStudies` strip `content` from every entry [writing.ts:getPosts] [projects.ts:getCaseStudies]
- `post.ts` imports nothing from `node:fs`; its header comment states it is kept apart from `writing.ts` so components can import it without `node:fs` in the browser bundle [post.ts:PostMeta]
- `readingTime` removes ```` ``` ```` fenced blocks, counts words matching `/[\p{L}\p{N}][\p{L}\p{N}'’-]*/gu`, divides by 230, rounds, and returns at least 1 [post.ts:readingTime]
- `formatDate` always uses locale `'en-US'` and `timeZone: 'UTC'` [post.ts:formatDate]
- Markdown link hrefs must match `/^(https?:\/\/|\/|#|mailto:)/i` or become `'#'`; image srcs must match `/^(https?:\/\/|\/)/i` or are not rendered as images (inline images fall back to alt text) [markdown.tsx:safeHref] [markdown.tsx:safeSrc]
- The renderer emits React elements; the file contains no `dangerouslySetInnerHTML` [markdown.tsx:Markdown]
- Links whose sanitised href starts with `http` get `target="_blank"`, `rel="noopener noreferrer"`, and an sr-only "(opens in a new tab)" span [markdown.tsx:inline]
- Inline tokens are matched in `INLINE` order (image, code, bold, italic, link); URLs allow one level of nested parentheses; a fresh `RegExp` is built per `inline` call [markdown.tsx:INLINE] [markdown.tsx:inline]
- Headings match `/^(#{1,4})\s+(.*?)\s*#*\s*$/` and render at level `max(2, hashes)`; ids come from `slugify` (fallback `'section'`) and repeats get a `-N` suffix via `idFactory`. `headings()` assigns ids to every heading (h4 included) so its ids match `Markdown`, but returns only levels 2 and 3 [markdown.tsx:HEADING] [markdown.tsx:slugify] [markdown.tsx:idFactory] [markdown.tsx:headings]
- Lines starting with ```` ``` ```` toggle code fences; headings inside fences are skipped by `headings()` [markdown.tsx:headings] [markdown.tsx:Markdown]
- A table starts when a line contains `|` and the next line contains `|` and matches `TABLE_SEPARATOR`; `\|` is a literal pipe; column alignment comes from `:` placement [markdown.tsx:isTableStart] [markdown.tsx:cells] [markdown.tsx:alignment]
- `projectLinks` puts `website` links before `source` links. The primary link (`href`) is labelled from `linkLabels[project.hrefKind]`; when `liveUrl` is set, a second link is added with kind and label always `'website'` [projects-data.ts:projectLinks]
- OG title `fontSize` is 72 when `title.length > 32`, otherwise 92 [og.tsx:ogImage]
- If either font fetch fails, `loadFonts` returns `undefined` and `ImageResponse` is created without `fonts` [og.tsx:loadFonts] [og.tsx:ogImage]

## Side Effects

- Filesystem (sync): `readdirSync` / `readFileSync(..., 'utf8')` of `join(process.cwd(), 'src/content/writing')`, on every `getPosts` / `getPost` call [writing.ts:POSTS_DIR] [writing.ts:allPosts] [writing.ts:parse]
- Filesystem (sync): `readdirSync` / `readFileSync(..., 'utf8')` of `join(process.cwd(), 'src/content/projects')`, on every `getCaseStudies` / `getCaseStudy` / `caseStudySlugs` call [projects.ts:PROJECTS_DIR] [projects.ts:all] [projects.ts:parse]
- Filesystem (module load): `readFileSync(join(process.cwd(), 'public/images/logo-light.svg'))`, base64-inlined as a data URI [og.tsx:logo]
- Network: `fetch` of `https://github.com/rsms/inter/raw/v3.19/docs/font-files/Inter-Bold.woff` and `.../Inter-Regular.woff` [og.tsx:loadFonts]
- Module-level cache: `fontsPromise ??= loadFonts()` is reused across `ogImage` calls, including a cached `undefined` after a failure [og.tsx:fontsPromise] [og.tsx:ogImage]
- Environment: reads `process.env.NODE_ENV` [writing.ts:includeDrafts] [projects.ts:includeDrafts]; resolves paths from `process.cwd()` [writing.ts:POSTS_DIR] [projects.ts:PROJECTS_DIR] [og.tsx:logo]
- Static image imports from `public/images/` (`meta-names.png`, `kubernetes.png`, `todoist-actions.png`) [projects-data.ts:projects]
- Rendered Markdown `<img>` elements use `loading="lazy"` and `decoding="async"`; the browser fetches their srcs [markdown.tsx:inline] [markdown.tsx:Markdown]
- `site.ts`, `motion.ts`, `utils.ts`, `frontmatter.ts`, `post.ts`: None

## Verification

- Run: `pnpm verify`
