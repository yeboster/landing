import { ogImage, size, contentType } from '@/lib/og'
import { site } from '@/lib/site'

export { size, contentType }
export const alt = `What ${site.person} is focused on now`

export default function Image() {
  return ogImage({ title: 'Now', subtitle: 'Current work, side projects and the stack I am using.' })
}
