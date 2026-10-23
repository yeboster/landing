import { ogImage, size, contentType } from '@/lib/og'
import { site } from '@/lib/site'

export { size, contentType }
export const alt = `Contact ${site.person}`

export default function Image() {
  return ogImage({ title: 'Contact', subtitle: `${site.availability.label}. I reply within ${site.responseTime}.` })
}
