import type { Metadata } from 'next'
import HomeClient from '@/components/home-client'
export const metadata: Metadata = { title: 'Developer & Builder', description: 'Yeboster is a full-stack developer building useful products with TypeScript, Ruby, Rust, and Kubernetes.' }
export default function HomePage() { return <HomeClient /> }
