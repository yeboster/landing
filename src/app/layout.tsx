import type { Metadata, Viewport } from 'next'
import { Inter } from 'next/font/google'
import { ThemeProvider } from '@/components/theme-provider'
import { MotionProvider } from '@/components/motion-provider'
import { ScrollProgress } from '@/components/scroll-progress'
import { CommandPaletteHost } from '@/components/command-palette-host'
import { Cursor } from '@/components/cursor'
import { KonamiMatrix } from '@/components/konami-matrix'
import { Footer } from './footer'
import Navbar from './navbar'
import { getPosts } from '@/lib/writing'
import { site, siteUrl } from '@/lib/site'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })
export const metadata: Metadata = { title: { default: `${site.name} — Developer & Builder`, template: `%s | ${site.name}` }, description: 'Full-stack developer building products with TypeScript, Ruby, Rust, and Kubernetes.', metadataBase: new URL(siteUrl), openGraph: { title: `${site.name} — Developer & Builder`, description: site.tagline, url: siteUrl, siteName: site.name, locale: 'en_US', type: 'website' }, twitter: { card: 'summary_large_image', title: `${site.name} — Developer & Builder`, description: site.tagline, creator: '@yeboster' }, icons: { icon: '/favicon.ico', apple: '/apple-touch-icon.png' }, manifest: '/site.webmanifest', alternates: { types: { 'application/rss+xml': [{ url: '/writing/rss.xml', title: `${site.name} — Writing` }] } } }
export const viewport: Viewport = { themeColor: [{ media: '(prefers-color-scheme: light)', color: '#f9fafb' }, { media: '(prefers-color-scheme: dark)', color: '#111827' }] }

const personSchema = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: 'Marco Vaccari',
  alternateName: site.name,
  url: siteUrl,
  jobTitle: 'Ruby on Rails Developer',
  worksFor: { '@type': 'Organization', name: 'Trustpair' },
  address: { '@type': 'PostalAddress', addressLocality: 'Paris', addressCountry: 'FR' },
  sameAs: [site.socials.github, site.socials.gitlab, site.socials.twitter, site.socials.linkedin],
}
export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) { return <html lang="en" suppressHydrationWarning><head><script dangerouslySetInnerHTML={{ __html: `(function(){try{var t=localStorage.getItem('theme');if(t==='dark'||(!t&&window.matchMedia('(prefers-color-scheme: dark)').matches))document.documentElement.classList.add('dark')}catch(e){}})()` }} /><script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }} /></head><body className={inter.className}><a href="#main-content" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[200] focus:rounded-lg focus:bg-white focus:px-4 focus:py-2 focus:text-sm focus:font-medium focus:text-gray-900 focus:shadow-lg dark:focus:bg-gray-900 dark:focus:text-gray-100">Skip to content</a><ThemeProvider><MotionProvider><ScrollProgress /><Cursor /><CommandPaletteHost posts={getPosts()} /><KonamiMatrix /><div className="flex min-h-screen flex-col bg-gray-50 text-gray-900 transition-colors duration-300 dark:bg-gray-900 dark:text-gray-100"><Navbar /><div id="main-content" tabIndex={-1} className="h-16" data-print="hide" />{children}</div><Footer /></MotionProvider></ThemeProvider><div className="grain" aria-hidden="true" /></body></html> }
