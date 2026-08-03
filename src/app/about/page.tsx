import type { Metadata } from 'next'
import AboutClient from '@/components/about-client'
export const metadata: Metadata = { title: 'About Me', description: "Learn about Yeboster's journey, principles, and approach to building software that matters." }
export default function AboutPage() { return <AboutClient /> }
