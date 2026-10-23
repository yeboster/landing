'use client'

import { useEffect, useRef, useState } from 'react'
import { Check, Copy } from 'lucide-react'

import { buttonClasses } from '@/components/ui/button'
import { site } from '@/lib/site'

/** The address as a mailto link, plus a one-click copy for people without a mail client set up. */
export function CopyEmail() {
  const [copied, setCopied] = useState(false)
  const timeout = useRef<ReturnType<typeof setTimeout> | undefined>(undefined)

  useEffect(() => () => clearTimeout(timeout.current), [])

  function copy() {
    navigator.clipboard
      .writeText(site.email)
      .then(() => {
        setCopied(true)
        clearTimeout(timeout.current)
        timeout.current = setTimeout(() => setCopied(false), 2000)
      })
      // No clipboard access (insecure context, denied permission): fall back to the mail client.
      .catch(() => {
        window.location.href = `mailto:${site.email}`
      })
  }

  return (
    <div className="flex items-center justify-between gap-3 rounded-2xl border border-border bg-card py-2 pl-4 pr-2 shadow-sm">
      <a
        href={`mailto:${site.email}`}
        className="min-w-0 truncate font-mono text-sm text-foreground transition-colors hover:text-brand-ink"
      >
        {site.email}
      </a>
      <button type="button" onClick={copy} className={buttonClasses({ variant: 'ghost', size: 'sm', className: 'shrink-0 px-3' })}>
        {copied ? <Check aria-hidden className="text-emerald-600 dark:text-emerald-400" /> : <Copy aria-hidden />}
        <span>
          {copied ? 'Copied' : 'Copy'}
          <span className="sr-only"> email address</span>
        </span>
      </button>
      <span aria-live="polite" className="sr-only">
        {copied ? 'Email address copied to the clipboard' : ''}
      </span>
    </div>
  )
}
