import type { Metadata } from 'next'
import PortfolioClient from '@/components/portfolio-client'
export const metadata: Metadata = { title: 'Portfolio', description: "Explore Yeboster's projects, technical stack, and open-source work across web, Rust, and Kubernetes." }
export default function PortfolioPage() { return <PortfolioClient /> }
