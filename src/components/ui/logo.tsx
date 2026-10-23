import Image, { type ImageProps } from 'next/image'
import React from 'react'

import { site } from '@/lib/site'
import { cn } from '@/lib/utils'
import logoLight from '../../../public/images/logo-light.svg'
import logoDark from '../../../public/images/logo-dark.svg'

export interface LogoProps extends Omit<ImageProps, 'src' | 'alt'> {
  className?: string
  /** Defaults to the brand name. Pass "" when a visible name sits next to it. */
  alt?: string
}

/**
 * The monogram. Both variants are rendered and the `dark` class picks one,
 * so the right logo is on screen at first paint, before React hydrates.
 * (`logo-dark.svg` has dark strokes for the light theme, and vice versa.)
 */
const Logo = React.forwardRef<HTMLImageElement, LogoProps>(({ className, alt = `${site.name} logo`, ...props }, ref) => (
  <>
    <Image {...props} ref={ref} alt={alt} src={logoDark} className={cn('block', className, 'dark:hidden')} />
    <Image {...props} alt={alt} src={logoLight} className={cn('block', className, 'hidden dark:block')} />
  </>
))
Logo.displayName = 'Logo'

export { Logo }
