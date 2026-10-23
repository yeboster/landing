import type { ReactNode } from 'react'

import { cn } from '@/lib/utils'

/**
 * A deliberately small Markdown renderer for posts and case studies.
 *
 * It emits React elements rather than an HTML string, so content can never
 * inject markup — there is no `dangerouslySetInnerHTML` anywhere in the path.
 * It covers what the content here uses: headings, paragraphs, fenced code,
 * blockquotes, lists, tables, images, rules, and inline emphasis/code/links.
 * Anything outside that set renders as literal text instead of failing.
 */

// Image before link so `![alt](src)` isn't read as `!` + a link. The URL arms
// allow one level of nested parens, so URLs like `.../Foo_(bar)` survive.
const INLINE =
  /(!\[[^\]]*\]\((?:[^()]|\([^()]*\))*\))|(`[^`]+`)|(\*\*[^*]+\*\*)|(\*[^*]+\*)|(\[[^\]]+\]\((?:[^()]|\([^()]*\))*\))/g

/** Only http(s), fragments, mailto and site-relative paths — no `javascript:` targets. */
function safeHref(href: string) {
  return /^(https?:\/\/|\/|#|mailto:)/i.test(href) ? href : '#'
}

function safeSrc(src: string) {
  return /^(https?:\/\/|\/)/i.test(src) ? src : undefined
}

/** Splits `url "title"` into its parts. */
function target(raw: string) {
  const [, url = '', title] = raw.trim().match(/^(\S+)(?:\s+"([^"]*)")?$/) ?? []
  return { url, title }
}

function inline(text: string, keyPrefix: string): ReactNode[] {
  const nodes: ReactNode[] = []
  // A fresh regex per call: link labels recurse, and a shared global regex
  // would have its `lastIndex` reset under the outer loop.
  const pattern = new RegExp(INLINE.source, 'g')
  let last = 0
  let match: RegExpExecArray | null

  while ((match = pattern.exec(text))) {
    if (match.index > last) nodes.push(text.slice(last, match.index))
    const token = match[0]
    const key = `${keyPrefix}-${match.index}`

    if (token.startsWith('![')) {
      const [, alt = '', raw = ''] = token.match(/^!\[([^\]]*)\]\((.*)\)$/) ?? []
      const src = safeSrc(target(raw).url)
      nodes.push(
        src ? (
          // eslint-disable-next-line @next/next/no-img-element -- Markdown images carry no dimensions for next/image.
          <img key={key} src={src} alt={alt} loading="lazy" decoding="async" className="inline-block max-h-[1.5em] align-middle" />
        ) : (
          alt
        ),
      )
    } else if (token.startsWith('`')) {
      nodes.push(
        <code
          key={key}
          className="rounded-md border border-border bg-muted/60 px-1.5 py-0.5 font-mono text-[0.85em] font-medium text-foreground"
        >
          {token.slice(1, -1)}
        </code>,
      )
    } else if (token.startsWith('**')) {
      nodes.push(
        <strong key={key} className="font-semibold text-foreground">
          {inline(token.slice(2, -2), key)}
        </strong>,
      )
    } else if (token.startsWith('*')) {
      nodes.push(<em key={key}>{inline(token.slice(1, -1), key)}</em>)
    } else {
      const [, label = '', raw = ''] = token.match(/^\[([^\]]+)\]\((.*)\)$/) ?? []
      const { url: href, title } = target(raw)
      const url = safeHref(href)
      const external = url.startsWith('http')
      nodes.push(
        <a
          key={key}
          href={url}
          title={title}
          {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
          className="font-medium text-brand-ink underline decoration-brand-ink/30 decoration-1 underline-offset-[5px] transition-colors hover:decoration-brand-ink"
        >
          {inline(label, key)}
          {external ? <span className="sr-only"> (opens in a new tab)</span> : null}
        </a>,
      )
    }
    last = match.index + token.length
  }

  if (last < text.length) nodes.push(text.slice(last))
  return nodes
}

/** Inline Markdown reduced to its visible text, for ids and labels. */
function plain(text: string) {
  return text
    .replace(/!\[([^\]]*)\]\([^)]*\)/g, '$1')
    .replace(/\[([^\]]+)\]\([^)]*\)/g, '$1')
    .replace(/[`*]/g, '')
    .trim()
}

function slugify(text: string) {
  return (
    text
      .toLowerCase()
      .normalize('NFKD')
      .replace(/[̀-ͯ]/g, '')
      .replace(/[^a-z0-9\s-]/g, '')
      .trim()
      .replace(/[\s-]+/g, '-') || 'section'
  )
}

/** Hands out a unique id per heading, so two "Notes" sections still get distinct anchors. */
function idFactory() {
  const used = new Map<string, number>()
  return (text: string) => {
    const base = slugify(text)
    const seen = used.get(base) ?? 0
    used.set(base, seen + 1)
    return seen ? `${base}-${seen}` : base
  }
}

const HEADING = /^(#{1,4})\s+(.*?)\s*#*\s*$/

export type Heading = { id: string; text: string; level: 2 | 3 }

/**
 * The h2/h3 outline of a document, with the same ids `<Markdown>` renders,
 * for building a table of contents. Headings inside code fences are skipped.
 */
export function headings(source: string): Heading[] {
  const nextId = idFactory()
  const out: Heading[] = []
  let inFence = false
  for (const line of source.replace(/\r\n?/g, '\n').split('\n')) {
    if (line.startsWith('```')) inFence = !inFence
    if (inFence) continue
    const match = line.match(HEADING)
    if (!match) continue
    const level = Math.max(2, match[1].length)
    const text = plain(match[2])
    // Every heading takes an id, h4 included, so the dedupe counters stay in step with the renderer.
    const id = nextId(text)
    if (level === 2 || level === 3) out.push({ id, text, level })
  }
  return out
}

const HEADING_STYLES = {
  2: 'mt-14 text-2xl leading-tight sm:text-[1.75rem]',
  3: 'mt-10 text-xl leading-snug',
  4: 'mt-8 text-lg leading-snug',
} as const

const BULLET = /^[-*]\s+/
const NUMBERED = /^\d+\.\s+/
const TABLE_SEPARATOR = /^\s*\|?\s*:?-+:?\s*(\|\s*:?-+:?\s*)*\|?\s*$/

function isTableStart(line: string, next: string | undefined) {
  return line.includes('|') && next !== undefined && next.includes('|') && TABLE_SEPARATOR.test(next)
}

/** Cells of a `| a | b |` row. `\|` stays a literal pipe. */
function cells(row: string) {
  return row
    .trim()
    .replace(/^\|/, '')
    .replace(/(?<!\\)\|$/, '')
    .split(/(?<!\\)\|/)
    .map((cell) => cell.trim().replace(/\\\|/g, '|'))
}

const ALIGN = { left: 'text-left', center: 'text-center', right: 'text-right' } as const

function alignment(spec: string): keyof typeof ALIGN {
  const s = spec.trim()
  if (s.startsWith(':') && s.endsWith(':')) return 'center'
  if (s.endsWith(':')) return 'right'
  return 'left'
}

/** True when a line opens a block other than a paragraph. */
function startsBlock(line: string, next: string | undefined) {
  return (
    line.startsWith('```') ||
    /^#{1,4}\s/.test(line) ||
    /^(---|\*\*\*)\s*$/.test(line) ||
    /^>/.test(line) ||
    BULLET.test(line) ||
    NUMBERED.test(line) ||
    isTableStart(line, next)
  )
}

export function Markdown({ source, className }: { source: string; className?: string }) {
  const lines = source.replace(/\r\n?/g, '\n').split('\n')
  const blocks: ReactNode[] = []
  const headingId = idFactory()
  let paragraph: string[] = []
  let i = 0

  const key = (kind: string) => `${kind}-${blocks.length}`

  const flushParagraph = () => {
    if (!paragraph.length) return
    blocks.push(
      <p key={key('p')} className="mt-6">
        {inline(paragraph.join(' '), `p${blocks.length}`)}
      </p>,
    )
    paragraph = []
  }

  while (i < lines.length) {
    const line = lines[i]

    if (line.trim() === '') {
      flushParagraph()
      i++
      continue
    }

    if (paragraph.length && !startsBlock(line, lines[i + 1])) {
      paragraph.push(line.trim())
      i++
      continue
    }

    // Fenced code block.
    if (line.startsWith('```')) {
      flushParagraph()
      const lang = line.slice(3).trim()
      const body: string[] = []
      i++
      while (i < lines.length && !lines[i].startsWith('```')) body.push(lines[i++])
      i++ // closing fence
      blocks.push(
        <figure key={key('code')} className="mt-8 overflow-hidden rounded-2xl border border-border bg-card shadow-sm">
          {lang ? (
            <figcaption className="flex items-center gap-2 border-b border-border bg-subtle px-4 py-2 font-mono text-[11px] uppercase tracking-[0.14em] text-muted-foreground">
              <span aria-hidden className="size-1.5 rounded-full bg-brand" />
              {lang}
            </figcaption>
          ) : null}
          {/* Focusable so keyboard users can scroll long lines sideways. */}
          <pre tabIndex={0} className="overflow-x-auto p-5 font-mono text-[13px] leading-6 text-foreground/90 sm:text-sm sm:leading-7">
            <code {...(lang ? { 'data-lang': lang } : {})}>{body.join('\n')}</code>
          </pre>
        </figure>,
      )
      continue
    }

    // Headings. The page title owns the only h1, so `#` renders as an h2.
    const heading = line.match(HEADING)
    if (heading) {
      flushParagraph()
      const level = Math.max(2, heading[1].length) as 2 | 3 | 4
      const Tag = `h${level}` as const
      const text = plain(heading[2])
      const id = headingId(text)
      blocks.push(
        <Tag
          key={key('h')}
          id={id}
          className={cn('group scroll-mt-24 font-semibold tracking-tight text-foreground', HEADING_STYLES[level])}
        >
          {inline(heading[2], `h${blocks.length}`)}
          <a
            href={`#${id}`}
            aria-label={`Link to section: ${text}`}
            className="ml-2 inline-block font-mono text-[0.75em] font-normal text-muted-foreground no-underline opacity-0 transition-opacity duration-200 hover:text-brand-ink focus-visible:opacity-100 group-hover:opacity-100"
          >
            #
          </a>
        </Tag>,
      )
      i++
      continue
    }

    // Horizontal rule.
    if (/^(---|\*\*\*)\s*$/.test(line)) {
      flushParagraph()
      blocks.push(<hr key={key('hr')} className="my-12 border-border" />)
      i++
      continue
    }

    // Block image: a line holding nothing but `![alt](src "caption")`.
    const image = line.match(/^!\[([^\]]*)\]\((.*)\)\s*$/)
    if (image && !paragraph.length) {
      const { url, title } = target(image[2])
      const src = safeSrc(url)
      if (src) {
        blocks.push(
          <figure key={key('img')} className="mt-8">
            {/* eslint-disable-next-line @next/next/no-img-element -- Markdown images carry no dimensions for next/image. */}
            <img src={src} alt={image[1]} loading="lazy" decoding="async" className="w-full rounded-2xl border border-border bg-subtle" />
            {title ? <figcaption className="mt-3 text-center font-mono text-xs text-muted-foreground">{title}</figcaption> : null}
          </figure>,
        )
        i++
        continue
      }
    }

    // Blockquote. A bare `>` line separates paragraphs inside the quote.
    if (line.startsWith('>')) {
      flushParagraph()
      const paragraphs: string[][] = [[]]
      while (i < lines.length && lines[i].startsWith('>')) {
        const content = lines[i++].replace(/^>\s?/, '')
        if (content.trim() === '') paragraphs.push([])
        else paragraphs[paragraphs.length - 1].push(content.trim())
      }
      blocks.push(
        <blockquote key={key('q')} className="mt-8 border-l-2 border-brand pl-6 text-[1.1em] italic text-foreground/75">
          {paragraphs
            .filter((p) => p.length)
            .map((p, n) => (
              <p key={n} className={n ? 'mt-4' : undefined}>
                {inline(p.join(' '), `q${blocks.length}-${n}`)}
              </p>
            ))}
        </blockquote>,
      )
      continue
    }

    // Table: a header row, a `---|---` separator, then body rows.
    if (isTableStart(line, lines[i + 1])) {
      flushParagraph()
      const head = cells(line)
      const align = cells(lines[i + 1]).map(alignment)
      i += 2
      const rows: string[][] = []
      while (i < lines.length && lines[i].includes('|') && lines[i].trim() !== '') rows.push(cells(lines[i++]))
      const n = blocks.length
      blocks.push(
        <div key={key('t')} tabIndex={0} className="mt-8 overflow-x-auto rounded-2xl border border-border bg-card">
          <table className="w-full border-collapse text-[0.875em] leading-relaxed">
            <thead className="bg-subtle">
              <tr>
                {head.map((cell, c) => (
                  <th
                    key={c}
                    scope="col"
                    className={cn(
                      'border-b border-border px-4 py-2.5 font-mono text-[11px] font-medium uppercase tracking-[0.14em] text-muted-foreground',
                      ALIGN[align[c] ?? 'left'],
                    )}
                  >
                    {inline(cell, `t${n}-h${c}`)}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {rows.map((row, r) => (
                <tr key={r} className="border-b border-border last:border-0">
                  {head.map((_, c) => (
                    <td key={c} className={cn('px-4 py-3 align-top', ALIGN[align[c] ?? 'left'])}>
                      {inline(row[c] ?? '', `t${n}-${r}-${c}`)}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>,
      )
      continue
    }

    // Lists, bulleted or numbered.
    if (BULLET.test(line) || NUMBERED.test(line)) {
      flushParagraph()
      const ordered = NUMBERED.test(line)
      const pattern = ordered ? NUMBERED : BULLET
      const items: string[] = []
      while (i < lines.length) {
        const current = lines[i]
        if (pattern.test(current)) {
          items.push(current.replace(pattern, ''))
          i++
          continue
        }
        // A wrapped item continues on the next line, indented. Without this the
        // tail of a long bullet becomes its own paragraph, which reads as a
        // rendering bug rather than a list.
        const isContinuation =
          items.length > 0 &&
          /^\s{2,}\S/.test(current) &&
          !startsBlock(current.trim(), undefined) &&
          !BULLET.test(current) &&
          !NUMBERED.test(current)
        if (isContinuation) {
          items[items.length - 1] += ` ${current.trim()}`
          i++
          continue
        }
        break
      }
      const List = ordered ? 'ol' : 'ul'
      blocks.push(
        <List
          key={key('l')}
          className={cn(
            'mt-6 space-y-3 pl-6',
            ordered
              ? 'list-decimal marker:font-mono marker:text-[0.85em] marker:text-muted-foreground'
              : 'list-disc marker:text-brand',
          )}
        >
          {items.map((item, n) => (
            <li key={n} className="pl-1.5">
              {inline(item, `l${blocks.length}-${n}`)}
            </li>
          ))}
        </List>,
      )
      continue
    }

    paragraph.push(line.trim())
    i++
  }
  flushParagraph()

  return (
    <div
      className={cn(
        // Measure comes from the parent column (max-w-2xl ≈ 70ch); this sets
        // the reading rhythm. Body text sits a step below full contrast so
        // headings and code stand out without shouting.
        'text-base leading-7 text-foreground/80 sm:text-[1.0625rem] sm:leading-8',
        '[&>:first-child]:mt-0 [&>h2+*]:mt-4 [&>h3+*]:mt-3 [&>h4+*]:mt-2',
        className,
      )}
    >
      {blocks}
    </div>
  )
}
