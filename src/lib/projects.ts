import { readFileSync, readdirSync } from 'node:fs'
import { join } from 'node:path'

import { parseFrontmatter } from './frontmatter'

/**
 * Case studies for portfolio projects.
 *
 * These are optional by design. A project on /portfolio links straight out to
 * its live site or repo, exactly as before; it gains a detail page only once a
 * matching Markdown file appears here, named for the project's slug. That
 * keeps the section free of thin one-paragraph pages — a case study exists
 * when there is something to say.
 */

const PROJECTS_DIR = join(process.cwd(), 'src/content/projects')

export type CaseStudyMeta = {
  slug: string
  title: string
  description: string
  date: string
  tags: string[]
  draft: boolean
}

export type CaseStudy = CaseStudyMeta & { content: string }

const includeDrafts = process.env.NODE_ENV === 'development'

function parse(file: string): CaseStudy {
  const slug = file.replace(/\.md$/, '')
  const { data, content } = parseFrontmatter(readFileSync(join(PROJECTS_DIR, file), 'utf8'))

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

function all(): CaseStudy[] {
  let files: string[]
  try {
    files = readdirSync(PROJECTS_DIR).filter((f) => f.endsWith('.md') && !f.startsWith('_'))
  } catch {
    return []
  }
  return files.map(parse).filter((study) => includeDrafts || !study.draft)
}

export function getCaseStudies(): CaseStudyMeta[] {
  return all().map((study) => {
    const { content: _content, ...meta } = study
    void _content
    return meta
  })
}

export function getCaseStudy(slug: string): CaseStudy | undefined {
  return all().find((study) => study.slug === slug)
}

/** Slugs with a published case study, for the portfolio cards to light up. */
export function caseStudySlugs(): string[] {
  return all().map((study) => study.slug)
}
