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
}

export type Post = PostMeta & { content: string }

export function formatDate(date: string) {
  return new Date(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    timeZone: 'UTC',
  })
}
