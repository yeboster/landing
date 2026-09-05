import { ogImage, size, contentType } from '@/lib/og'

export { size, contentType }
export const alt = 'Yeboster — Portfolio'

export default function Image() {
  return ogImage({ title: 'Portfolio', subtitle: 'Projects and open-source work across web, Rust and Kubernetes.' })
}
