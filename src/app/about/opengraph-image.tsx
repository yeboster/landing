import { ogImage, size, contentType } from '@/lib/og'
import { site } from '@/lib/site'

export { size, contentType }
export const alt = `About ${site.person}`

export default function Image() {
  return ogImage({ title: 'About', subtitle: `${site.role} at ${site.company}, ${site.location}. Career, stack and how I work.` })
}
