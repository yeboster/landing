# Yeboster

Personal site and portfolio of Yeboster, a full-stack engineer. Live at [yeboster.com](https://yeboster.com).

## Stack

- [Next.js 14](https://nextjs.org/) (App Router, React Server Components)
- [Tailwind CSS](https://tailwindcss.com/) with HSL design tokens and class-based dark mode
- [Framer Motion](https://www.framer.com/motion/) for entrance and interaction animations
- [lucide-react](https://lucide.dev/) icons, `next/font` (Inter, Instrument Serif, JetBrains Mono)

## Getting started

```bash
pnpm install
pnpm dev     # http://localhost:3000
pnpm build   # production build
pnpm lint
```

## Project structure

```
src/
├── app/                  # Routes (Server Components) + navbar, footer, sitemap, robots
├── components/
│   ├── motion/           # <Reveal>, <RevealGroup>, MotionConfig provider
│   ├── ui/               # Primitives: Button, Card, Eyebrow, Section, Logo
│   ├── page-hero.tsx     # Shared sub-page hero + ambient backdrop
│   ├── cta-section.tsx   # Shared closing call-to-action
│   └── <page>/           # Page-specific client components
├── content/              # Typed content (projects, about) kept out of markup
└── lib/
    ├── site.ts           # Brand, navigation, socials and contact, single source of truth
    ├── motion.ts         # Shared easing, durations and variants
    └── utils.ts
```

## Conventions

- **Design tokens.** Colors are defined once as CSS variables in `src/app/globals.css`
  and exposed as Tailwind colors (`bg-background`, `text-muted-foreground`, `bg-brand`, …).
  Use tokens, not raw palette classes, so light and dark mode stay consistent.
  The brand hue is taken from the logo.
- **Server first.** Pages are Server Components and export `metadata`. Interactivity
  lives in small client components; `<Reveal>` lets server-rendered content animate in.
- **Motion.** Use the shared variants in `src/lib/motion.ts`. All animation respects
  `prefers-reduced-motion`.
- **Content.** Edit `src/lib/site.ts` for links and contact details and `src/content/`
  for page content.

## License

© Yeboster. All rights reserved.
