import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = { title: '404 — command not found' }

export default function NotFound() {
  return (
    <main className="flex-1 flex items-center justify-center px-4 py-24">
      <div className="w-full max-w-xl overflow-hidden rounded-xl border border-gray-800 bg-gray-950 font-mono text-sm text-gray-100 shadow-xl">
        <div className="flex items-center gap-2 border-b border-gray-800 bg-gray-900 px-4 py-3">
          <span className="h-3 w-3 rounded-full bg-red-500" />
          <span className="h-3 w-3 rounded-full bg-yellow-500" />
          <span className="h-3 w-3 rounded-full bg-green-500" />
          <span className="ml-3 text-xs text-gray-400">marco@bon.so ~ zsh</span>
        </div>
        <div className="space-y-2 px-4 py-4">
          <div className="flex gap-2 text-gray-100">
            <span className="text-[#c06fbe]">❯</span>
            <span>open page</span>
          </div>
          <div className="text-gray-400">zsh: command not found: 404</div>
          <div className="text-gray-400">this page doesn&apos;t exist (or I haven&apos;t built it yet)</div>
          <div className="flex items-center gap-2 pt-2">
            <span className="text-[#c06fbe]">❯</span>
            <Link href="/" className="text-gray-100 underline underline-offset-4 hover:text-[#c06fbe] transition-colors">
              cd /home
            </Link>
          </div>
          <div className="pt-2 text-xs text-gray-500">press ⌘K anywhere</div>
        </div>
      </div>
    </main>
  )
}
