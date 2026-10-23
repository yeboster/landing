'use client'

import { useEffect, useId, useRef, useState, type FormEvent, type ReactNode } from 'react'
import { AlertCircle, Check, ChevronDown, Loader2, Send } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { site } from '@/lib/site'
import { cn } from '@/lib/utils'

const TIMELINES = ['Just exploring', 'This quarter', 'This month', 'ASAP'] as const

// Same limits and email check as /api/contact, so the inline message is the
// one the server would have sent back anyway.
const MAX = { name: 100, email: 200, company: 150, message: 5000 } as const
const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

type Required = 'name' | 'email' | 'message'
type Errors = Partial<Record<Required, string>>
type Status = 'idle' | 'loading' | 'success' | 'error'

const REQUIRED: Required[] = ['name', 'email', 'message']

function validate(field: Required, raw: string) {
  const value = raw.trim()
  if (field === 'name') return value ? undefined : 'Tell me what to call you.'
  if (field === 'email') {
    if (!value) return 'I need an address to reply to.'
    return EMAIL.test(value) ? undefined : 'That email address looks wrong.'
  }
  return value ? undefined : 'A sentence or two about what you need is enough.'
}

const control = cn(
  'block w-full rounded-xl border border-border bg-background px-4 text-[15px] text-foreground shadow-sm',
  'transition-[border-color,box-shadow] duration-200 placeholder:text-muted-foreground hover:border-foreground/25',
  'focus:border-brand focus:outline-none focus:ring-4 focus:ring-brand/20 focus-visible:outline-none',
  'aria-[invalid=true]:border-red-500/80 aria-[invalid=true]:focus:ring-red-500/20',
  'disabled:cursor-not-allowed disabled:opacity-60',
)

function Field({
  id,
  label,
  optional,
  error,
  children,
  footer,
  className,
}: {
  id: string
  label: string
  optional?: boolean
  error?: string
  children: ReactNode
  footer?: ReactNode
  className?: string
}) {
  return (
    <div className={className}>
      <label htmlFor={id} className="mb-2 block text-sm font-medium text-foreground">
        {label}
        {optional ? <span className="ml-1.5 font-normal text-muted-foreground">(optional)</span> : null}
      </label>
      {children}
      {error || footer ? (
        <div className="mt-2 flex items-start justify-between gap-4">
          {error ? (
            <p id={`${id}-error`} className="flex items-center gap-1.5 text-sm text-red-600 dark:text-red-400">
              <AlertCircle aria-hidden className="size-4 shrink-0" />
              {error}
            </p>
          ) : (
            <span />
          )}
          {footer}
        </div>
      ) : null}
    </div>
  )
}

/**
 * Contact form, posting JSON to /api/contact.
 *
 * Name, email and message are required; role and timeline are optional on
 * purpose. They cost the sender two seconds and tell me whether the message
 * needs a reply today or a reply eventually — which is the cheapest
 * qualification filter available without scaring people off.
 *
 * Validation runs on blur and on submit (not on every keystroke, which nags
 * people mid-word), and an error clears as soon as the field becomes valid.
 */
export function ContactForm() {
  const uid = useId()
  const ids = {
    name: `${uid}-name`,
    email: `${uid}-email`,
    company: `${uid}-company`,
    timeline: `${uid}-timeline`,
    message: `${uid}-message`,
    hint: `${uid}-message-hint`,
  }

  const [status, setStatus] = useState<Status>('idle')
  const [serverError, setServerError] = useState('')
  const [errors, setErrors] = useState<Errors>({})
  const [messageLength, setMessageLength] = useState(0)
  const successRef = useRef<HTMLDivElement>(null)

  // Move focus to the confirmation so keyboard and screen-reader users land on it
  // instead of on a submit button that no longer exists.
  useEffect(() => {
    if (status === 'success') successRef.current?.focus()
  }, [status])

  const describedBy = (field: Required, extra?: string) =>
    [errors[field] ? `${ids[field]}-error` : null, extra].filter(Boolean).join(' ') || undefined

  function onBlur(field: Required, value: string) {
    setErrors((prev) => ({ ...prev, [field]: validate(field, value) }))
  }

  function onChange(field: Required, value: string) {
    if (field === 'message') setMessageLength(value.length)
    // Only re-check a field that is already showing an error, so it clears the
    // moment it becomes valid without flagging a field the user is still typing.
    if (errors[field]) setErrors((prev) => ({ ...prev, [field]: validate(field, value) }))
  }

  async function submit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const form = e.currentTarget
    const value = (name: string) => (form.elements.namedItem(name) as HTMLInputElement | null)?.value ?? ''

    const next: Errors = {}
    for (const field of REQUIRED) next[field] = validate(field, value(field))
    setErrors(next)
    const firstInvalid = REQUIRED.find((field) => next[field])
    if (firstInvalid) {
      document.getElementById(ids[firstInvalid])?.focus()
      return
    }

    // Read the fields before the loading state disables them: disabled
    // controls are left out of FormData.
    const data = Object.fromEntries(new FormData(form).entries())
    setStatus('loading')
    setServerError('')
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })
      if (!response.ok) {
        const body = await response.json().catch(() => null)
        throw new Error(body?.error)
      }
      setStatus('success')
      setMessageLength(0)
    } catch (err) {
      setServerError(err instanceof Error && err.message ? err.message : 'Something went wrong.')
      setStatus('error')
    }
  }

  const loading = status === 'loading'

  return (
    <>
      {/* Always mounted, so changes to it are announced. */}
      <p role="status" className="sr-only">
        {loading ? 'Sending your message…' : status === 'success' ? `Message sent. I'll reply within ${site.responseTime}.` : ''}
      </p>

      {status === 'success' ? (
        <div
          ref={successRef}
          tabIndex={-1}
          className="flex flex-col items-start gap-4 rounded-2xl border border-emerald-500/30 bg-emerald-500/10 p-6 outline-none"
        >
          <span className="flex size-10 items-center justify-center rounded-full bg-emerald-500 text-white">
            <Check aria-hidden className="size-5" />
          </span>
          <div>
            <h3 className="text-lg font-semibold tracking-tight">Message sent</h3>
            <p className="mt-1 text-muted-foreground">Thanks. I&apos;ll reply within {site.responseTime}.</p>
          </div>
          <Button type="button" variant="secondary" size="sm" onClick={() => setStatus('idle')}>
            Send another message
          </Button>
        </div>
      ) : (
        <form onSubmit={submit} noValidate aria-busy={loading} className="space-y-6">
          <div className="grid gap-6 sm:grid-cols-2">
            <Field id={ids.name} label="Name" error={errors.name}>
              <input
                id={ids.name}
                name="name"
                required
                maxLength={MAX.name}
                autoComplete="name"
                disabled={loading}
                aria-invalid={errors.name ? true : undefined}
                aria-describedby={describedBy('name')}
                onBlur={(e) => onBlur('name', e.target.value)}
                onChange={(e) => onChange('name', e.target.value)}
                className={cn(control, 'h-12')}
              />
            </Field>
            <Field id={ids.email} label="Email" error={errors.email}>
              <input
                id={ids.email}
                name="email"
                type="email"
                inputMode="email"
                required
                maxLength={MAX.email}
                autoComplete="email"
                spellCheck={false}
                disabled={loading}
                aria-invalid={errors.email ? true : undefined}
                aria-describedby={describedBy('email')}
                onBlur={(e) => onBlur('email', e.target.value)}
                onChange={(e) => onChange('email', e.target.value)}
                className={cn(control, 'h-12')}
              />
            </Field>
          </div>

          <div className="grid gap-6 sm:grid-cols-2">
            <Field id={ids.company} label="Company or role" optional>
              <input
                id={ids.company}
                name="company"
                maxLength={MAX.company}
                autoComplete="organization"
                disabled={loading}
                className={cn(control, 'h-12')}
              />
            </Field>
            <Field id={ids.timeline} label="Timeline" optional>
              <div className="relative">
                <select
                  id={ids.timeline}
                  name="timeline"
                  defaultValue=""
                  disabled={loading}
                  className={cn(control, 'h-12 appearance-none pr-10')}
                >
                  <option value="">Prefer not to say</option>
                  {TIMELINES.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
                <ChevronDown
                  aria-hidden
                  className="pointer-events-none absolute right-3.5 top-1/2 size-4 -translate-y-1/2 text-muted-foreground"
                />
              </div>
            </Field>
          </div>

          <Field
            id={ids.message}
            label="What are you trying to achieve?"
            error={errors.message}
            footer={
              // Only worth showing once the limit is close enough to matter.
              messageLength > MAX.message * 0.8 ? (
                <span className="shrink-0 font-mono text-xs tabular-nums text-muted-foreground">
                  {messageLength.toLocaleString('en-US')}/{MAX.message.toLocaleString('en-US')}
                </span>
              ) : null
            }
          >
            <p id={ids.hint} className="sr-only">
              The outcome you want, what is blocking it, and any deadline.
            </p>
            <textarea
              id={ids.message}
              name="message"
              required
              rows={6}
              maxLength={MAX.message}
              disabled={loading}
              placeholder="The outcome you want, what is blocking it, anything already tried."
              aria-invalid={errors.message ? true : undefined}
              aria-describedby={describedBy('message', ids.hint)}
              onBlur={(e) => onBlur('message', e.target.value)}
              onChange={(e) => onChange('message', e.target.value)}
              className={cn(control, 'min-h-[9rem] resize-y py-3 leading-relaxed')}
            />
          </Field>

          {/* Honeypot: hidden from people, filled by naive bots, dropped by the API. */}
          <input name="_honey" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden="true" />

          {status === 'error' ? (
            <div
              role="alert"
              className="flex items-start gap-3 rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-700 dark:text-red-300"
            >
              <AlertCircle aria-hidden className="mt-0.5 size-4 shrink-0" />
              <p>
                {serverError}{' '}
                <a className="font-medium underline underline-offset-4" href={`mailto:${site.email}`}>
                  Email me directly
                </a>{' '}
                instead.
              </p>
            </div>
          ) : null}

          <div className="flex flex-col gap-4 pt-2 sm:flex-row sm:items-center sm:justify-between">
            <Button type="submit" size="lg" disabled={loading} className="w-full sm:w-auto">
              {loading ? <Loader2 aria-hidden className="animate-spin" /> : <Send aria-hidden />}
              {loading ? 'Sending…' : 'Send message'}
            </Button>
            <p className="text-sm text-muted-foreground">
              Or email{' '}
              <a
                href={`mailto:${site.email}`}
                className="font-mono text-[13px] text-foreground underline decoration-border underline-offset-4 transition-colors hover:text-brand-ink hover:decoration-brand-ink"
              >
                {site.email}
              </a>
            </p>
          </div>
        </form>
      )}
    </>
  )
}
