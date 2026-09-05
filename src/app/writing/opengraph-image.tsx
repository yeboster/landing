import { ogImage, size, contentType } from '@/lib/og'

export { size, contentType }
export const alt = 'Writing — notes from the build'

export default function Image() {
  return ogImage({
    title: 'Writing',
    subtitle: 'Notes on Rails, Rust, Kubernetes, and the AI plumbing in between.',
  })
}
