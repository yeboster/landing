import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import Link from 'next/link'

import Navbar from './navbar'

import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Yeboster',
  description: 'My personal website',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {

  return (
    <html lang="en">
      <body className={inter.className}>
        <div key="1" className="flex flex-col min-h-screen bg-[#d9e8f5]">
          <Navbar />
          {children}
        </div>
        <footer className="flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center sm:justify-evenly px-4 md:px-6 border-t">
          <p className="text-xs text-gray-500 dark:text-gray-400">
            Yeboster
          </p>

          <p className="text-xs text-gray-500 dark:text-gray-400">
            Build Together, Live Forever ❤️
          </p>

          <nav>
            <Link className="text-xs hover:underline underline-offset-4" href="#">
              Contact
            </Link>
          </nav>
        </footer>
      </body>
    </html>
  )
}
