import type { Metadata } from 'next'
import { site } from '@/lib/site'
import PortfolioClient from '@/components/portfolio-client'
import { caseStudySlugs } from '@/lib/projects'
export const metadata: Metadata = { title: 'Work', description: `${site.person}'s projects and case studies — Rust smart contracts, TypeScript, and a GitOps Kubernetes cluster.` }
export default function PortfolioPage() { return <PortfolioClient caseStudies={caseStudySlugs()} /> }
