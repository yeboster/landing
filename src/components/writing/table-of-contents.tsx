import { ChevronDown } from 'lucide-react'

import type { Heading } from '@/lib/markdown'
import { cn } from '@/lib/utils'

/** Only worth the space once a post has enough sections to get lost in. */
export const TOC_MIN_HEADINGS = 3

function Links({ items }: { items: Heading[] }) {
  return (
    <ol className="space-y-2.5 border-l border-border text-sm">
      {items.map((item) => (
        <li key={item.id} className={cn(item.level === 3 && 'pl-3')}>
          <a
            href={`#${item.id}`}
            className="-ml-px block border-l border-transparent pl-4 leading-snug text-muted-foreground transition-colors hover:border-brand hover:text-foreground"
          >
            {item.text}
          </a>
        </li>
      ))}
    </ol>
  )
}

/** Sticky outline beside the article on wide screens. */
export function TableOfContents({ items, className }: { items: Heading[]; className?: string }) {
  return (
    <nav aria-labelledby="toc-title" className={className}>
      <p id="toc-title" className="mb-4 font-mono text-[11px] font-medium uppercase tracking-[0.14em] text-muted-foreground">
        On this page
      </p>
      <Links items={items} />
    </nav>
  )
}

/** The same outline, collapsed, for screens too narrow for a side column. No JS needed. */
export function TableOfContentsDisclosure({ items, className }: { items: Heading[]; className?: string }) {
  return (
    <details className={cn('group rounded-2xl border border-border bg-card', className)}>
      <summary className="flex cursor-pointer list-none items-center justify-between px-5 py-3.5 font-mono text-[11px] font-medium uppercase tracking-[0.14em] text-muted-foreground [&::-webkit-details-marker]:hidden">
        On this page
        <ChevronDown aria-hidden className="size-4 transition-transform duration-300 group-open:rotate-180" />
      </summary>
      <nav aria-label="On this page" className="px-5 pb-5">
        <Links items={items} />
      </nav>
    </details>
  )
}
