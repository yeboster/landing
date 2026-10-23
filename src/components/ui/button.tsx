import * as React from 'react'
import Link from 'next/link'

import { cn } from '@/lib/utils'

type Variant = 'primary' | 'brand' | 'secondary' | 'ghost'
type Size = 'sm' | 'md' | 'lg' | 'icon'

const base =
  'group/button relative inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full font-medium transition-[transform,background-color,border-color,box-shadow,color] duration-300 ease-out-expo active:scale-[0.97] disabled:pointer-events-none disabled:opacity-50 [&_svg]:size-4 [&_svg]:shrink-0'

const variants: Record<Variant, string> = {
  primary: 'bg-foreground text-background shadow-soft hover:-translate-y-0.5 hover:bg-brand hover:text-white hover:shadow-glow',
  brand: 'bg-brand text-white shadow-soft hover:-translate-y-0.5 hover:bg-brand-strong hover:shadow-glow',
  secondary: 'border border-border bg-card text-foreground shadow-sm hover:-translate-y-0.5 hover:border-foreground/20 hover:shadow-soft',
  ghost: 'text-muted-foreground hover:bg-muted hover:text-foreground',
}

const sizes: Record<Size, string> = {
  sm: 'h-9 px-4 text-sm',
  md: 'h-11 px-6 text-sm',
  lg: 'h-12 px-7 text-base',
  icon: 'size-10',
}

export type ButtonStyleProps = { variant?: Variant; size?: Size; className?: string }

/** Class string for anything that should look like a button. */
export function buttonClasses({ variant = 'primary', size = 'md', className }: ButtonStyleProps = {}) {
  return cn(base, variants[variant], sizes[size], className)
}

export function Button({
  variant,
  size,
  className,
  ...props
}: ButtonStyleProps & React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return <button className={buttonClasses({ variant, size, className })} {...props} />
}

type ButtonLinkProps = ButtonStyleProps &
  Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, 'href'> & {
    href: string
    /** Opens in a new tab with safe `rel` and a screen-reader hint. */
    external?: boolean
  }

/** A link styled as a button. Internal hrefs use next/link. */
export function ButtonLink({ variant, size, className, href, external, children, ...props }: ButtonLinkProps) {
  const classes = buttonClasses({ variant, size, className })
  if (external || /^(https?:|mailto:)/.test(href)) {
    const newTab = external ?? href.startsWith('http')
    return (
      <a href={href} className={classes} {...(newTab && { target: '_blank', rel: 'noopener noreferrer' })} {...props}>
        {children}
        {newTab && <span className="sr-only"> (opens in a new tab)</span>}
      </a>
    )
  }
  return (
    <Link href={href} className={classes} {...props}>
      {children}
    </Link>
  )
}
