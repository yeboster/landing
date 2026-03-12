'use client'

import Image, { ImageProps as NextImageProps } from "next/image"
import logoLight from '../../../public/images/logo-light.svg'
import logoDark from '../../../public/images/logo-dark.svg'
import React from "react"
import { useTheme } from "@/components/theme-provider"

export interface LogoProps
  extends Omit<NextImageProps, 'src' | 'alt'> {
  className?: string
}

const Logo = React.forwardRef<HTMLImageElement, LogoProps>((props, ref) => {
  const { theme } = useTheme()
  const logo = theme === 'dark' ? logoLight : logoDark

  return (
    <Image
      {...props}
      ref={ref}
      alt="Logo"
      src={logo}
    />
  )
})
Logo.displayName = "Logo"

export { Logo }
