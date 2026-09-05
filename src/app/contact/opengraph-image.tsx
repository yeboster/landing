import { ogImage, size, contentType } from '@/lib/og'

export { size, contentType }
export const alt = 'Contact Yeboster'

export default function Image() {
  return ogImage({ title: 'Contact', subtitle: 'Freelance work, collaborations, and interesting ideas.' })
}
