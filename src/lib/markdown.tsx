import { Fragment, type ReactNode } from 'react'

/**
 * A deliberately small Markdown renderer for the writing section.
 *
 * It emits React elements rather than an HTML string, so post content can
 * never inject markup — there is no `dangerouslySetInnerHTML` anywhere in the
 * path. It covers exactly what posts here use: headings, paragraphs, fenced
 * code, blockquotes, lists, rules, and inline emphasis/code/links. Anything
 * outside that set renders as literal text instead of failing.
 */

// The link arm allows one level of nested parens, so URLs like
// `.../Foo_(bar)` survive intact.
const INLINE = /(`[^`]+`)|(\*\*[^*]+\*\*)|(\*[^*]+\*)|(\[[^\]]+\]\((?:[^()]|\([^()]*\))*\))/g

/** Only http(s), fragments and site-relative paths — no `javascript:` targets. */
function safeHref(href: string) {
  return /^(https?:\/\/|\/|#|mailto:)/i.test(href) ? href : '#'
}

function inline(text: string, keyPrefix: string): ReactNode[] {
  const nodes: ReactNode[] = []
  let last = 0
  let match: RegExpExecArray | null
  INLINE.lastIndex = 0

  while ((match = INLINE.exec(text))) {
    if (match.index > last) nodes.push(text.slice(last, match.index))
    const token = match[0]
    const key = `${keyPrefix}-${match.index}`

    if (token.startsWith('`')) {
      nodes.push(
        <code key={key} className="rounded bg-gray-100 px-1.5 py-0.5 font-mono text-[0.9em] text-[#9f4f9d] dark:text-[#cb85c9] dark:bg-gray-800">
          {token.slice(1, -1)}
        </code>,
      )
    } else if (token.startsWith('**')) {
      nodes.push(<strong key={key} className="font-semibold text-gray-900 dark:text-gray-100">{token.slice(2, -2)}</strong>)
    } else if (token.startsWith('*')) {
      nodes.push(<em key={key}>{token.slice(1, -1)}</em>)
    } else {
      const [, label, href] = token.match(/^\[([^\]]+)\]\((.*)\)$/) ?? []
      const url = safeHref(href ?? '')
      const external = url.startsWith('http')
      nodes.push(
        <a
          key={key}
          href={url}
          {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
          className="font-medium text-[#9f4f9d] underline decoration-[#9f4f9d]/30 underline-offset-4 transition-colors hover:decoration-[#9f4f9d]"
        >
          {label}
        </a>,
      )
    }
    last = match.index + token.length
  }

  if (last < text.length) nodes.push(text.slice(last))
  return nodes
}

export function Markdown({ source }: { source: string }) {
  const lines = source.replace(/\r\n/g, '\n').split('\n')
  const blocks: ReactNode[] = []
  let paragraph: string[] = []
  let i = 0

  const flushParagraph = () => {
    if (!paragraph.length) return
    const text = paragraph.join(' ')
    blocks.push(
      <p key={`p-${blocks.length}`} className="text-lg leading-relaxed text-gray-600 dark:text-gray-300">
        {inline(text, `p${blocks.length}`)}
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

    // Fenced code block.
    if (line.startsWith('```')) {
      flushParagraph()
      const lang = line.slice(3).trim()
      const body: string[] = []
      i++
      while (i < lines.length && !lines[i].startsWith('```')) body.push(lines[i++])
      i++ // closing fence
      blocks.push(
        <pre
          key={`code-${blocks.length}`}
          className="overflow-x-auto rounded-xl border border-gray-200 bg-gray-50 p-5 text-sm leading-relaxed dark:border-gray-800 dark:bg-gray-900/60"
        >
          <code className="font-mono text-gray-800 dark:text-gray-200" {...(lang ? { 'data-lang': lang } : {})}>
            {body.join('\n')}
          </code>
        </pre>,
      )
      continue
    }

    // Headings — h2 and h3 only; the post title owns the single h1.
    const heading = line.match(/^(#{2,3})\s+(.*)$/)
    if (heading) {
      flushParagraph()
      const Tag = heading[1].length === 2 ? 'h2' : 'h3'
      blocks.push(
        <Tag
          key={`h-${blocks.length}`}
          className={
            Tag === 'h2'
              ? 'mt-4 scroll-mt-24 text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl dark:text-gray-100'
              : 'mt-2 scroll-mt-24 text-xl font-semibold tracking-tight text-gray-900 dark:text-gray-100'
          }
        >
          {inline(heading[2], `h${blocks.length}`)}
        </Tag>,
      )
      i++
      continue
    }

    // Horizontal rule.
    if (/^(---|\*\*\*)\s*$/.test(line)) {
      flushParagraph()
      blocks.push(<hr key={`hr-${blocks.length}`} className="border-gray-200 dark:border-gray-800" />)
      i++
      continue
    }

    // Blockquote.
    if (line.startsWith('> ')) {
      flushParagraph()
      const body: string[] = []
      while (i < lines.length && lines[i].startsWith('> ')) body.push(lines[i++].slice(2))
      blocks.push(
        <blockquote
          key={`q-${blocks.length}`}
          className="border-l-2 border-[#9f4f9d] pl-5 text-lg italic leading-relaxed text-gray-500 dark:text-gray-400"
        >
          {inline(body.join(' '), `q${blocks.length}`)}
        </blockquote>,
      )
      continue
    }

    // Lists, bulleted or numbered.
    const bullet = /^[-*]\s+/
    const numbered = /^\d+\.\s+/
    if (bullet.test(line) || numbered.test(line)) {
      flushParagraph()
      const ordered = numbered.test(line)
      const pattern = ordered ? numbered : bullet
      const items: string[] = []
      while (i < lines.length && pattern.test(lines[i])) items.push(lines[i++].replace(pattern, ''))
      const List = ordered ? 'ol' : 'ul'
      blocks.push(
        <List
          key={`l-${blocks.length}`}
          className={`space-y-2 pl-5 text-lg leading-relaxed text-gray-600 dark:text-gray-300 ${ordered ? 'list-decimal' : 'list-disc'} marker:text-[#9f4f9d]`}
        >
          {items.map((item, n) => (
            <li key={n}>{inline(item, `l${blocks.length}-${n}`)}</li>
          ))}
        </List>,
      )
      continue
    }

    paragraph.push(line)
    i++
  }
  flushParagraph()

  return <div className="space-y-6">{blocks.map((block, n) => <Fragment key={n}>{block}</Fragment>)}</div>
}
