import { ogImage, size, contentType } from '@/lib/og'
import { site } from '@/lib/site'

export { size, contentType }
export const alt = `${site.person} — ${site.role} at ${site.company}`

export default function Image() {
  return ogImage({ title: site.person, subtitle: site.pitch })
}
