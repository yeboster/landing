import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import Link from 'next/link'

import { ThemeProvider } from '@/components/theme-provider'
import { Footer } from './footer'
import Navbar from './navbar'

import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: {
    default: 'Yeboster — Developer & Builder',
    template: '%s | Yeboster',
  },
  description: 'Full-stack developer building products with TypeScript, Ruby, Rust, and Kubernetes. Explore my portfolio, projects, and get in touch.',
  metadataBase: new URL('https://yeboster.com'),
  openGraph: {
    title: 'Yeboster — Developer & Builder',
    description: 'Full-stack developer building products with TypeScript, Ruby, Rust, and Kubernetes.',
    url: 'https://yeboster.com',
    siteName: 'Yeboster',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Yeboster — Build Together to Live Forever',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Yeboster — Developer & Builder',
    description: 'Full-stack developer building products with TypeScript, Ruby, Rust, and Kubernetes.',
    creator: '@yeboster',
    images: ['/og-image.png'],
  },
  icons: {
    icon: '/favicon.ico',
    apple: '/apple-touch-icon.png',
  },
  manifest: '/site.webmanifest',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  var theme = localStorage.getItem('theme');
                  if (theme === 'dark' || (!theme && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
                    document.documentElement.classList.add('dark');
                  }
                } catch(e) {}
              })();
            `,
          }}
        />
      </head>
      <body className={inter.className}>
        <ThemeProvider>
          <div className="flex flex-col min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 transition-colors duration-300">
            <Navbar />
            {/* Spacer for fixed navbar */}
            <div className="h-16" />
            {children}
          </div>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  )
}
