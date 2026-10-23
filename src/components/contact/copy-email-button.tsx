'use client'

import * as React from 'react'
import { Check, Copy } from 'lucide-react'

import { cn } from '@/lib/utils'

type CopyEmailButtonProps = {
  email: string
  className?: string
}

type Status = 'idle' | 'copied' | 'error'

/** Legacy fallback for browsers / insecure contexts without the async Clipboard API. */
function legacyCopy(text: string) {
  const textarea = document.createElement('textarea')
  textarea.value = text
  textarea.setAttribute('readonly', '')
  textarea.style.position = 'fixed'
  textarea.style.opacity = '0'
  document.body.appendChild(textarea)
  textarea.select()
  let ok = false
  try {
    ok = document.execCommand('copy')
  } catch {
    ok = false
  }
  document.body.removeChild(textarea)
  return ok
}

/** Shows the email address and copies it to the clipboard on click. */
export function CopyEmailButton({ email, className }: CopyEmailButtonProps) {
  const [status, setStatus] = React.useState<Status>('idle')
  const timeout = React.useRef<ReturnType<typeof setTimeout>>()
  const emailRef = React.useRef<HTMLSpanElement>(null)

  /** Last resort: select the address so the user can copy it manually. */
  const selectEmail = () => {
    const node = emailRef.current
    const selection = window.getSelection()
    if (!node || !selection) return
    const range = document.createRange()
    range.selectNodeContents(node)
    selection.removeAllRanges()
    selection.addRange(range)
  }

  React.useEffect(() => () => clearTimeout(timeout.current), [])

  const handleCopy = async () => {
    let ok = false
    try {
      if (navigator.clipboard?.writeText) {
        await navigator.clipboard.writeText(email)
        ok = true
      } else {
        ok = legacyCopy(email)
      }
    } catch {
      ok = legacyCopy(email)
    }

    if (!ok) selectEmail()
    setStatus(ok ? 'copied' : 'error')
    clearTimeout(timeout.current)
    timeout.current = setTimeout(() => setStatus('idle'), ok ? 2000 : 4000)
  }

  const copied = status === 'copied'

  return (
    <>
      <button
        type="button"
        onClick={handleCopy}
        className={cn(
          'group/copy inline-flex h-11 items-center gap-3 rounded-full border bg-card pl-5 pr-2 text-sm shadow-sm transition-all duration-300 ease-out-expo',
          'hover:-translate-y-0.5 hover:border-foreground/20 hover:shadow-soft active:scale-[0.97]',
          'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background',
          className
        )}
      >
        <span ref={emailRef} className="select-all font-mono text-foreground">
          {email}
        </span>
        <span
          aria-hidden
          className={cn(
            'flex h-7 items-center gap-1.5 rounded-full px-2.5 text-xs font-medium transition-colors duration-300',
            copied ? 'bg-brand-soft text-brand' : 'bg-muted text-muted-foreground group-hover/copy:text-foreground'
          )}
        >
          <span className="relative size-3.5">
            <Copy
              className={cn(
                'absolute inset-0 size-3.5 transition-all duration-300 ease-out-expo',
                copied ? 'scale-50 opacity-0' : 'scale-100 opacity-100'
              )}
            />
            <Check
              className={cn(
                'absolute inset-0 size-3.5 transition-all duration-300 ease-out-expo',
                copied ? 'scale-100 opacity-100' : 'scale-50 opacity-0'
              )}
            />
          </span>
          {copied ? 'Copied' : status === 'error' ? 'Press ⌘/Ctrl+C' : 'Copy'}
        </span>
        <span className="sr-only">Copy email address to clipboard</span>
      </button>
      <span aria-live="polite" role="status" className="sr-only">
        {status === 'copied' && 'Email address copied to clipboard.'}
        {status === 'error' && `Couldn't copy automatically. The address ${email} is selected, press Control or Command plus C to copy it.`}
      </span>
    </>
  )
}
