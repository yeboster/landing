import { ogImage, size, contentType } from '@/lib/og'

export { size, contentType }
export const alt = 'Yeboster — Developer & Builder'

export default function Image() {
  return ogImage({ title: 'Build Together to Live Forever', subtitle: 'Full-stack developer building products with TypeScript, Ruby, Rust and Kubernetes.' })
}
