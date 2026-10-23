import { ogImage, size, contentType } from '@/lib/og'
import { site } from '@/lib/site'

export { size, contentType }
export const alt = `${site.person} — Selected work`

export default function Image() {
  return ogImage({ title: 'Selected work', subtitle: 'Projects and open-source work across Rails, Rust and Kubernetes.' })
}
