import { ogImage, size, contentType } from '@/lib/og'

export { size, contentType }
export const alt = 'About Yeboster'

export default function Image() {
  return ogImage({ title: 'About Me', subtitle: 'The journey, the principles, and the approach to building software that matters.' })
}
