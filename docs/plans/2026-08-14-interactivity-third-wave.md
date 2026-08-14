# Third-Wave Interactivity Implementation Plan

> **For Hermes:** Execute via Claude Code CLI in per-task chunks (build + commit after EACH task). See `static-site-improvements` skill, "Delegating site work to Claude Code CLI".

**Goal:** Make bon.so genuinely interactive — keyboard-first navigation, pointer-reactive visuals, and a playful typeable terminal — on top of the already-shipped animation tiers.

**Architecture:** Five independent client-component islands added to the existing Next 15 / motion v12 / Tailwind 3.4 app. No new npm dependencies (hand-rolled palette + cursor + canvas). Every island honors `prefers-reduced-motion` and disables itself on touch devices where pointer-driven.

**Tech Stack:** Next 15 (app router), React 19, motion v12 (`motion/react`), Tailwind 3.4, existing brand accent `#9f4f9d`.

**Invariants (must not break):**
- `transitionEnd: { filter: 'none' }` in SplitText's visible variant (gradient-text Chrome bug).
- All existing reduced-motion guards.
- `src/lib/site.ts` remains the single source of identity (email, socials) — import from it, never hardcode.
- No new dependencies in package.json.
- Per-chunk: `rm -rf .next && node node_modules/next/dist/bin/next build` must exit 0 with `✓ Generating static pages` before committing. Commit ONLY the task's files (never `git add -A`).

---

### Task 1: Command palette (Cmd+K)

**Objective:** Keyboard-first overlay to navigate, toggle theme, copy email, open socials.

**Files:**
- Create: `src/components/command-palette.tsx`
- Modify: `src/app/layout.tsx` (mount `<CommandPalette />` next to `<ScrollProgress />`)
- Modify: `src/app/navbar.tsx` (add a search/`⌘K` trigger button, desktop + mobile)
- Modify: `src/app/globals.css` (kbd hint styling if needed)

**Spec:**
- Client component, `'use client'`. State: `open`, `query`, `activeIndex`.
- Global `keydown` listener: `Cmd+K` / `Ctrl+K` toggles; `Escape` closes; `ArrowUp/Down` move selection; `Enter` executes.
- Actions array (filtered fuzzy-ish by `query`, case-insensitive substring on title + keywords):
  - Pages: Home, About, Portfolio, Now, Contact (router.push)
  - "Toggle theme" — READ `src/components/theme-toggle.tsx` + `theme-provider.tsx` FIRST and reuse the exact same theme-setting mechanism.
  - "Copy email" — `navigator.clipboard.writeText(site.email)`, show transient "Copied ✓" inside the palette.
  - Socials from `site.socials` (GitHub, LinkedIn, Twitter) — `window.open(url, '_blank', 'noopener')`.
- UI: fixed inset overlay (`bg-black/50 backdrop-blur-sm`), centered top-third panel (`max-w-lg`, rounded-xl, border accent on focus-within), input with auto-focus, list with `activeIndex` row highlighted `bg-[#9f4f9d]/10`, footer hint row (`↑↓ navigate · ↵ select · esc close`).
- AnimatePresence: overlay fade + panel `scale 0.97→1, y -8→0, opacity`, 0.18s.
- a11y: `role="dialog" aria-modal="true"`, `role="listbox"` + `role="option" aria-selected`, focus trapped-ish (autofocus input, Escape returns focus to trigger), body scroll locked while open (`document.body.style.overflow`).
- Navbar trigger: small pill button with `Search` lucide icon + `<kbd>⌘K</kbd>`, `hover:border-[#9f4f9d]/50`. On mobile show icon-only. Button click dispatches the same open action — export a tiny `useCommandPalette` store (module-level zustand-less pattern: `let listeners` + `subscribe`/`emit`, or lift state to layout via context — pick the simpler, keep it self-contained in command-palette.tsx).
- Reduced motion: skip panel animation, still fully functional.

**Verify:** build passes; `grep -n 'CommandPalette' src/app/layout.tsx` hits; no new deps (`git diff package.json` empty).

**Commit:** `feat: Cmd+K command palette (navigation, theme, copy email, socials)`

---

### Task 2: Custom cursor

**Objective:** Accent dot + trailing ring that reacts to interactive elements. Desktop only.

**Files:**
- Create: `src/components/cursor.tsx`
- Modify: `src/app/layout.tsx` (mount `<Cursor />`)
- Modify: `src/app/globals.css` (hide native cursor only when custom active)

**Spec:**
- Dot: 8px `bg-[#9f4f9d] rounded-full fixed pointer-events-none z-[100]`, driven directly by motion values (`useMotionValue`, set on `mousemove`).
- Ring: 32px border `border-[#9f4f9d]/50`, spring-trailing (`useSpring` stiffness 250, damping 22, mass 0.6), same position values.
- Hover grow: on `mouseover`/`mouseout` walk `e.target.closest('a, button, [role="button"], input, textarea, [data-cursor]')` → scale ring to 1.6 + dot to 0.5 (spring), restore on out.
- Press: `mousedown` scale ring 0.85, restore on `mouseup`.
- Visibility: hidden until first mousemove (avoids 0,0 artifact); fade out on `mouseleave` of document.
- Gating: render `null` when `useReducedMotion()` OR `!window.matchMedia('(hover: hover) and (pointer: fine)')` (subscribe in useEffect, default false → touch devices never see it).
- Native cursor: add `html.custom-cursor, html.custom-cursor * { cursor: none }` in globals.css; the component toggles `document.documentElement.classList.add('custom-cursor')` only when active. NEVER hide the native cursor on touch/reduced-motion.
- `mix-blend-difference` on the ring is allowed if it reads well over the violet accent; otherwise plain.

**Verify:** build passes; component returns null on touch (check the matchMedia guard exists).

**Commit:** `feat: custom cursor with spring-trailing ring (desktop only)`

---

### Task 3: Pointer-reactive dot grid in hero

**Objective:** Canvas layer behind the homepage hero where dots glow violet near the pointer.

**Files:**
- Create: `src/components/dot-grid.tsx`
- Modify: `src/components/home-client.tsx` (render `<DotGrid />` inside the hero `<section>`, AFTER `<Aurora>` so it layers above the blobs but keep it `pointer-events-none` and behind content z-wise — match Aurora's stacking pattern)
- Modify: `src/app/globals.css` (none expected)

**Spec:**
- Canvas absolutely positioned `inset-0 pointer-events-none`, sized to parent via `getBoundingClientRect` + `ResizeObserver`, DPR-aware (`canvas.width = rect.width * devicePixelRatio`, `ctx.scale(dpr, dpr)`).
- Grid: spacing ~28px, base dots 1px `rgba(159,79,157,0.10)` dark-mode-aware (read `document.documentElement.classList.contains('dark')` per frame or via a MutationObserver — pick per-frame, it's cheap; light mode use `rgba(159,79,157,0.12)`).
- Pointer: track on the hero SECTION (parent), not the canvas (canvas is pointer-events-none) — same pattern as Aurora's parallax. `onMouseMove` on section sets a ref `{x, y}`; `onMouseLeave` sets it null.
- Per frame (rAF loop): each dot within radius R (~140px) of pointer gets intensity `1 - dist/R`; render radius `1 + 2.2*i` and alpha up to `0.5*i` in `#9f4f9d`. Redraw whole grid each frame only while pointer is inside OR while any intensity > 0.01 (lerp intensity down 0.88/frame for a soft decay trail); otherwise skip draw (idle = zero CPU).
- Pause when offscreen: IntersectionObserver on the section disconnects the rAF loop.
- Reduced motion: draw the static base grid ONCE, no rAF loop, no pointer tracking.
- Cleanup on unmount: cancelAnimationFrame, disconnect observers, remove listeners.

**Verify:** build passes; `grep -n 'DotGrid' src/components/home-client.tsx` hits.

**Commit:** `feat: pointer-reactive dot grid canvas in hero`

---

### Task 4: Interactive terminal card on homepage

**Objective:** A typeable fake shell card — visitors run commands to explore Marco.

**Files:**
- Create: `src/components/terminal-card.tsx`
- Modify: `src/components/home-client.tsx` (new section between the marquee/GitHub-stats area and the final CTA — read the file and pick the natural slot; entrance via existing `fadeUp` + `whileInView` pattern)

**Spec:**
- Card: `rounded-xl border bg-gray-950 text-gray-100 font-mono text-sm shadow-xl` with macOS chrome (three dots red/yellow/green + title `marco@bon.so ~ zsh`). Always dark regardless of theme (it's a terminal).
- Boot sequence (auto-typed once on first whileInView): `$ whoami` → `Marco Vaccari — full-stack dev, Paris` then hands control to the visitor with a hint line: `type 'help' to explore`.
- Real input: bottom prompt row `❯` + contentEditable-free `<input>` styled invisible. Commands (case-insensitive, trimmed):
  - `help` — list commands
  - `whoami` — one-liner bio (from site.ts name/tagline if present)
  - `skills` — short stack list (mirror the about page's skills wording — READ about-client.tsx first, don't invent employers)
  - `projects` / `portfolio` — 3-4 lines naming portfolio entries + note "see /portfolio" (READ portfolio-client.tsx for real project names)
  - `contact` — prints site.email + "or run: open contact" ; `open contact|about|portfolio|now` router.push's
  - `socials` — prints site.socials URLs
  - `clear` — clears history
  - `sudo make me a sandwich` — `ok. 🥪` (one joke, that's it)
  - unknown → `command not found: <cmd> — try 'help'`
- History: array of `{type: 'cmd'|'out', text}` rendered with auto-scroll to bottom (`ref.scrollTop = scrollHeight` on update). Cap at 100 entries.
- Typing effect for OUTPUT of the boot sequence only (per-char interval ~18ms); user commands print instantly.
- Up-arrow recalls last command (single-level history is fine, full history stack is +10 lines — do the stack).
- Entrance: existing `fadeUp` variants + `whileInView`, consistent with neighboring sections.
- Reduced motion: skip boot typing effect — print lines instantly. Interactive input still works.
- Section header above the card: eyebrow + h2 in the page's established style, e.g. eyebrow `interactive`, title `Try the terminal` (match the page's casing/gradient conventions — accent word uses the `from-[#9f4f9d] via-[#c06fbe] to-[#9f4f9d]` gradient; if the h2 uses SplitText elsewhere, use SplitText).

**Verify:** build passes; commands list contains no fabricated employers/projects (cross-check against about/portfolio client files).

**Commit:** `feat: interactive terminal card on homepage`

---

### Task 5: Copy-email micro-interaction on contact page

**Objective:** One-click email copy with feedback, next to the existing contact channels.

**Files:**
- Modify: `src/components/contact-client.tsx` (add a copy button row/card — READ the file first and match its card/grid conventions and conditional grid-count pattern if applicable)

**Spec:**
- Button: `Copy email` with `Copy` lucide icon, `site.email` as the value. On click → `navigator.clipboard.writeText` → icon swaps to `Check` + label "Copied!" for 2s (timeout, cleaned up on unmount) → reverts.
- Failure path: clipboard API throws → fall back to `window.location.href = 'mailto:' + site.email`.
- Style: match existing channel cards (border, hover:border-[#9f4f9d]/50, icon chip group-hover pattern). If the channels grid is TiltCard-based, this is a plain card, not a TiltCard.
- aria-live="polite" on the label span so the Copied state is announced.

**Verify:** build passes; uses `site.email` (grep, no hardcoded address).

**Commit:** `feat: copy-email button with feedback on contact page`

---

### Task 6: Final sweep + push

**Objective:** Consistency audit and ship.

1. `grep -rn 'console.log' src/components/` — remove any debug logging added.
2. Confirm no `package.json`/`pnpm-lock.yaml` changes (`git diff main -- package.json` empty — should be, no new deps).
3. Confirm every new interactive component has a reduced-motion guard: `grep -l 'useReducedMotion\|prefers-reduced-motion' src/components/command-palette.tsx src/components/cursor.tsx src/components/dot-grid.tsx src/components/terminal-card.tsx` — all four must appear.
4. Full final build: `rm -rf .next && node node_modules/next/dist/bin/next build` — exit 0, `✓ Generating static pages`.
5. `git push origin main`.
6. Final message: files changed per task, commit SHAs, build result.

**Commit (if sweep changed anything):** `chore: third-wave interactivity sweep`

---

## Post-deploy live verification (supervisor does this, not the worker)

Wait ~60s after push, then cache-bust:

```bash
for p in / /contact; do curl -s "https://bon.so$p?cb=$(date +%s)"; done
```

- Homepage HTML contains `marco@bon.so` (terminal card SSR) or the terminal section heading.
- Layout chunk contains command palette trigger (kbd `⌘K` label is rendered server-side in navbar).
- Contact page contains `Copy email`.
- Then browser: hard reload, test Cmd+K opens palette, arrow+enter navigates, terminal accepts `help`, cursor ring appears on desktop, dot grid glows near pointer (screenshot with pointer mid-hero).
