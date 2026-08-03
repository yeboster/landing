import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { ThemeProvider } from '@/components/theme-provider'
import { Footer } from './footer'
import Navbar from './navbar'
import { site, siteUrl } from '@/lib/site'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })
export const metadata: Metadata = { title: { default: `${site.name} — Developer & Builder`, template: `%s | ${site.name}` }, description: 'Full-stack developer building products with TypeScript, Ruby, Rust, and Kubernetes.', metadataBase: new URL(siteUrl), openGraph: { title: `${site.name} — Developer & Builder`, description: site.tagline, url: siteUrl, siteName: site.name, images: [{ url: '/og-image.png', width: 1200, height: 630, alt: `${site.name} — ${site.tagline}` }], locale: 'en_US', type: 'website' }, twitter: { card: 'summary_large_image', title: `${site.name} — Developer & Builder`, description: site.tagline, creator: '@yeboster', images: ['/og-image.png'] }, icons: { icon: '/favicon.ico', apple: '/apple-touch-icon.png' }, manifest: '/site.webmanifest' }

const personSchema = { '@context': 'https://schema.org', '@type': 'Person', name: site.name, url: siteUrl, sameAs: [site.socials.github, site.socials.twitter, site.socials.telegram] }
export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) { return <html lang="en" suppressHydrationWarning><head><script dangerouslySetInnerHTML={{ __html: `(function(){try{var t=localStorage.getItem('theme');if(t==='dark'||(!t&&window.matchMedia('(prefers-color-scheme: dark)').matches))document.documentElement.classList.add('dark')}catch(e){}})()` }} /><script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }} /></head><body className={inter.className}><ThemeProvider><div className="flex min-h-screen flex-col bg-gray-50 text-gray-900 transition-colors duration-300 dark:bg-gray-900 dark:text-gray-100"><Navbar /><div className="h-16" />{children}</div><Footer /></ThemeProvider></body></html> }
