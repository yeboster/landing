/**
 * Frontmatter for this site's fixed content schemas: `key: value` pairs, plus
 * inline `[a, b]` lists and true/false. Not a general YAML parser and not
 * trying to be — each content module validates the fields it needs right
 * after parsing, so a malformed file fails the build loudly rather than
 * publishing something wrong.
 */
export function parseFrontmatter(raw: string): {
  data: Record<string, unknown>
  content: string
} {
  const match = raw.match(/^---\n([\s\S]*?)\n---\n?([\s\S]*)$/)
  if (!match) return { data: {}, content: raw }

  const data: Record<string, unknown> = {}
  for (const line of match[1].split('\n')) {
    const pair = line.match(/^([A-Za-z_][\w-]*):\s*(.*)$/)
    if (!pair) continue
    const [, key] = pair
    let value: unknown = pair[2].trim().replace(/^["'](.*)["']$/, '$1')

    if (value === 'true') value = true
    else if (value === 'false') value = false
    else if (typeof value === 'string' && /^\[.*\]$/.test(value)) {
      value = value
        .slice(1, -1)
        .split(',')
        .map((item) => item.trim().replace(/^["'](.*)["']$/, '$1'))
        .filter(Boolean)
    }
    data[key] = value
  }
  return { data, content: match[2] }
}
