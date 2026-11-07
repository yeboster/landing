# src

## Overview

All application source for the site. `src/app` holds the Next.js App Router routes and
route handlers. `src/components` holds the React components those routes render.
`src/content` holds typed page content, and `src/lib` holds shared helpers: site
identity, Markdown and frontmatter parsing, file-backed post and case-study loaders, the
project list, motion variants and the Open Graph renderer. `tsconfig.json` maps the
`@/*` import alias to `./src/*`.

## Subdirectories & Boundaries

- app: [./app/README.md](./app/README.md) - App Router root: root layout, `template`
  (page transition), home page, navbar, footer, 404, `robots`, `sitemap` and the default
  OG image, plus the route
  segments `about`, `contact`, `now`, `portfolio`, `writing` and the JSON route handlers
  under `api` (`GET /api/github-stats`, `GET /api/paris-weather`). Post and case-study
  pages are generated statically with `generateStaticParams`; `GET /writing/rss.xml`
  serves the RSS feed.
- components: [./components/README.md](./components/README.md) - Shared interactive
  components (theme provider and toggle, motion provider, command palette and its
  store, visual effects, `TerminalCard`, `GithubStats`) plus nine area folders:
  `about`, `chrome`, `contact`, `home`, `motion`, `now`, `portfolio`, `ui`, `writing`.
  The contact form POSTs from the browser to FormSubmit; `GithubStats` and `ParisNow`
  call the local `/api/*` routes.
- content: [./content/README.md](./content/README.md) - Typed constants for `/about`
  (`timeline`, `skills`, `principles`) and `/now` (`updated`, `focus`, `stack`). The
  Markdown folders `content/projects` and `content/writing` have no source code and no
  README; `src/lib/projects.ts` and `src/lib/writing.ts` read them from disk.
- lib: [./lib/README.md](./lib/README.md) - `site` identity constants, `cn`, motion
  variants, `parseFrontmatter`, the `Markdown` renderer and `headings`, `getPosts` /
  `getPost`, `getCaseStudies` / `getCaseStudy` / `caseStudySlugs`, the `projects` list
  and `ogImage`.
