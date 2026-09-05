import { ogImage, size, contentType } from '@/lib/og'

export { size, contentType }
export const alt = 'What Yeboster is focused on now'

export default function Image() {
  return ogImage({ title: 'Now', subtitle: 'Current work, side projects, and the stack I am living in.' })
}
