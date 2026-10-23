/**
 * Client-safe half of the writing module: the shape of a post and the date
 * formatter. Kept apart from `writing.ts` so components can import these
 * without dragging `node:fs` into the browser bundle.
 */

export type PostMeta = {
  slug: string
  title: string
  description: string
  date: string
  tags: string[]
  draft: boolean
  /** Whole minutes at an average reading pace, never less than 1. */
  readingTime: number
}

export type Post = PostMeta & { content: string }

const formats: Record<'long' | 'short', Intl.DateTimeFormatOptions> = {
  long: { year: 'numeric', month: 'long', day: 'numeric' },
  short: { year: 'numeric', month: 'short', day: '2-digit' },
}

/** `long`: "September 5, 2026". `short`: "Sep 05, 2026", for mono metadata. */
export function formatDate(date: string, style: 'long' | 'short' = 'long') {
  return new Date(date).toLocaleDateString('en-US', { ...formats[style], timeZone: 'UTC' })
}

const WORDS_PER_MINUTE = 230

/** Counts prose words only, so a long code block doesn't inflate the estimate. */
export function readingTime(markdown: string) {
  const prose = markdown.replace(/```[\s\S]*?```/g, ' ')
  const words = prose.match(/[\p{L}\p{N}][\p{L}\p{N}'’-]*/gu)?.length ?? 0
  return Math.max(1, Math.round(words / WORDS_PER_MINUTE))
}
