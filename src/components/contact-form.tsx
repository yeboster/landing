'use client'

import { FormEvent, useState } from 'react'
import { Check, Loader2, Send } from 'lucide-react'
import { site } from '@/lib/site'

const fieldClass =
  'mt-1 w-full rounded-lg border border-gray-200 bg-white px-4 py-3 outline-none focus:border-[#9f4f9d] dark:border-gray-700 dark:bg-gray-900'

const TIMELINES = ['Just exploring', 'This quarter', 'This month', 'ASAP'] as const

/**
 * Contact form.
 *
 * Name, email and message are required; role and timeline are optional on
 * purpose. They cost the sender two seconds and tell me whether the message
 * needs a reply today or a reply eventually — which is the cheapest
 * qualification filter available without scaring people off.
 */
export function ContactForm() {
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [error, setError] = useState('')

  async function submit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setStatus('loading')
    const form = e.currentTarget
    const data = Object.fromEntries(new FormData(form).entries())
    try {
      const r = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })
      if (!r.ok) {
        const body = await r.json().catch(() => null)
        throw new Error(body?.error)
      }
      setStatus('success')
      form.reset()
    } catch (err) {
      setError(err instanceof Error && err.message ? err.message : 'Something went wrong.')
      setStatus('error')
    }
  }

  return (
    <form onSubmit={submit} className="space-y-5">
      <div className="grid gap-5 sm:grid-cols-2">
        <label className="space-y-2 text-sm font-medium">
          Name
          <input required maxLength={100} name="name" className={fieldClass} />
        </label>
        <label className="space-y-2 text-sm font-medium">
          Email
          <input required type="email" maxLength={200} name="email" className={fieldClass} />
        </label>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <label className="space-y-2 text-sm font-medium">
          Company or role <span className="font-normal text-gray-400">(optional)</span>
          <input maxLength={150} name="company" className={fieldClass} />
        </label>
        <label className="space-y-2 text-sm font-medium">
          Timeline <span className="font-normal text-gray-400">(optional)</span>
          <select name="timeline" defaultValue="" className={fieldClass}>
            <option value="">Prefer not to say</option>
            {TIMELINES.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </label>
      </div>

      <label className="block space-y-2 text-sm font-medium">
        What are you trying to achieve?
        <textarea
          required
          maxLength={5000}
          name="message"
          rows={6}
          placeholder="The outcome you want, what is blocking it, anything already tried."
          className={`${fieldClass} resize-y`}
        />
      </label>

      <input name="_honey" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden="true" />

      {status === 'success' ? (
        <p className="flex items-center gap-2 text-sm text-emerald-600 dark:text-emerald-400">
          <Check className="h-4 w-4" />
          Message sent — I&apos;ll reply within {site.responseTime}.
        </p>
      ) : status === 'error' ? (
        <p className="text-sm text-red-600 dark:text-red-400">
          {error}{' '}
          <a className="underline" href={`mailto:${site.email}`}>
            Email me directly
          </a>
          .
        </p>
      ) : (
        <div className="flex flex-wrap items-center gap-4">
          <button
            disabled={status === 'loading'}
            className="inline-flex items-center gap-2 rounded-lg bg-gray-900 px-6 py-3 text-sm font-medium text-white hover:bg-[#9f4f9d] disabled:opacity-60 dark:bg-white dark:text-gray-900"
          >
            {status === 'loading' ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
            Send message
          </button>
          <span className="text-xs text-gray-400">Or email {site.email}</span>
        </div>
      )}
    </form>
  )
}
