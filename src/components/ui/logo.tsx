import Image from 'next/image'

import logoLight from '../../../public/images/logo-light.svg'
import logoDark from '../../../public/images/logo-dark.svg'
import { cn } from '@/lib/utils'

type LogoProps = {
  className?: string
  size?: number
  priority?: boolean
}

/**
 * Brand mark. Both variants are rendered and swapped with CSS so the correct
 * one shows on first paint, before React hydrates the theme.
 */
export function Logo({ className, size = 24, priority }: LogoProps) {
  return (
    <span className={cn('relative inline-block shrink-0', className)} style={{ width: size, height: size }}>
      <Image src={logoDark} alt="" width={size} height={size} priority={priority} className="size-full dark:hidden" />
      <Image src={logoLight} alt="" width={size} height={size} priority={priority} className="hidden size-full dark:block" />
    </span>
  )
}
