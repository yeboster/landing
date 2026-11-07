# content

## Overview

Typed, static site content kept apart from page and component code. `about.ts`
holds the career timeline, skill groups and principles rendered on `/about`
(which its header comment describes as also being the printable CV); `now.ts`
holds the `/now` page focus list, stack and last-updated label. Both files only
export constants and types; they are imported by components under
`src/components/about` and `src/components/now`.

The two subdirectories hold Markdown only (no source code) and are read at
build/request time by loaders in `src/lib`, not by code in this directory.

## Interface

- `[about.ts:TimelineEntry]` - type `{ period, role, org, place?, description, current? }`; `current` marks the role highlighted on the timeline.
- `[about.ts:timeline]` - `TimelineEntry[]`; imported by `[src/components/about/career-timeline.tsx]`.
- `[about.ts:SkillGroup]` - type `{ title: string; items: string[] }`.
- `[about.ts:skills]` - `SkillGroup[]`; imported by `[src/components/about/skills-section.tsx]`.
- `[about.ts:Principle]` - type `{ title: string; description: string }`.
- `[about.ts:principles]` - `Principle[]`; imported by `[src/components/about/principles-section.tsx]`.
- `[now.ts:updated]` - string label for the `/now` page; imported by `[src/components/now/now-hero.tsx]`.
- `[now.ts:FocusItem]` - type `{ kind: 'work' | 'infra' | 'agents' | 'site'; title; description }`.
- `[now.ts:focus]` - `FocusItem[]`; imported by `[src/components/now/focus-grid.tsx]`.
- `[now.ts:stack]` - `string[]`; imported by `[src/components/now/focus-grid.tsx]`.
- `projects/` (Markdown only, no contract file) - case-study files read by `[src/lib/projects.ts:PROJECTS_DIR]`; files `_template.md`, `gitops-k8s-cluster.md`, `meta-names.md`.
- `writing/` (Markdown only, no contract file) - posts read by `[src/lib/writing.ts:POSTS_DIR]`; currently contains only `_template.md`.

## Invariants

- `[about.ts]` header comment: career dates, roles and places are edited in this file, never in the page.
- `[now.ts:updated]` doc comment: bump `updated` whenever the `focus` list changes.
- `[now.ts:FocusItem.kind]` must be one of `'work' | 'infra' | 'agents' | 'site'`; `[src/components/now/focus-grid.tsx:focusIcons]` is a `Record<FocusItem['kind'], ReactNode>`, so adding a `kind` requires adding an icon there for the type check to pass.
- `[now.ts:focus]` entry with `kind: 'work'` builds its `title` and `description` from `[src/lib/site.ts:site]` (`site.company`, `site.role`) rather than hard-coding them.
- Markdown in `projects/` and `writing/`: only files ending in `.md` and not starting with `_` are loaded (`[src/lib/projects.ts:all]`, `[src/lib/writing.ts:allPosts]`), so `_template.md` is never published.
- Markdown frontmatter must have string `title` and a `Date.parse`-able string `date`, otherwise `parse` throws (`[src/lib/projects.ts:parse]`, `[src/lib/writing.ts:parse]`).
- Files with frontmatter `draft: true` are included only when `NODE_ENV === 'development'` (`[src/lib/projects.ts:includeDrafts]`, `[src/lib/writing.ts:includeDrafts]`).

## Side Effects

- None. `[about.ts]` and `[now.ts]` only declare constants and types; `[now.ts]` imports `[src/lib/site.ts:site]` at module load.
- (Outside this directory) `[src/lib/projects.ts:all]` and `[src/lib/writing.ts:allPosts]` read `projects/` and `writing/` from disk with `readdirSync`/`readFileSync`.

## Verification

- Run: `pnpm verify`
