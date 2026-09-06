import { readFileSync, readdirSync } from 'node:fs'
import { join } from 'node:path'

import { parseFrontmatter } from './frontmatter'
import type { Post, PostMeta } from './post'

/**
 * File-backed writing index. Posts are Markdown files in `src/content/writing`,
 * read at build time — no database, no CMS, and the whole section is a
 * `git push` away from updated.
 */

const POSTS_DIR = join(process.cwd(), 'src/content/writing')

export type { Post, PostMeta }

/** Drafts are readable in `next dev` and never published by a production build. */
const includeDrafts = process.env.NODE_ENV === 'development'

function parse(file: string): Post {
  const slug = file.replace(/\.md$/, '')
  const { data, content } = parseFrontmatter(readFileSync(join(POSTS_DIR, file), 'utf8'))

  if (typeof data.title !== 'string' || typeof data.date !== 'string') {
    throw new Error(`${file}: frontmatter needs a string \`title\` and \`date\``)
  }
  if (Number.isNaN(Date.parse(data.date))) {
    throw new Error(`${file}: \`date\` must be parseable, got "${data.date}"`)
  }

  return {
    slug,
    title: data.title,
    description: typeof data.description === 'string' ? data.description : '',
    date: data.date,
    tags: Array.isArray(data.tags) ? data.tags.map(String) : [],
    draft: data.draft === true,
    content,
  }
}

function allPosts(): Post[] {
  let files: string[]
  try {
    files = readdirSync(POSTS_DIR).filter((f) => f.endsWith('.md') && !f.startsWith('_'))
  } catch {
    return [] // No content directory yet — an empty section, not a build failure.
  }
  return files
    .map(parse)
    .filter((post) => includeDrafts || !post.draft)
    .sort((a, b) => Date.parse(b.date) - Date.parse(a.date))
}

export function getPosts(): PostMeta[] {
  return allPosts().map((post) => {
    const { content: _content, ...meta } = post
    void _content
    return meta
  })
}

export function getPost(slug: string): Post | undefined {
  return allPosts().find((post) => post.slug === slug)
}

