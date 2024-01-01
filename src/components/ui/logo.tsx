'use client'

import Image, { ImageProps as NextImageProps } from "next/image"
import logoLight from '../../../public/images/logo-light.svg'
import logoDark from '../../../public/images/logo-dark.svg'
import React, { useEffect, useState } from "react"
import { isDarkThemeMatcher } from "@/lib/utils"

export interface LogoProps
  extends Omit<NextImageProps, 'src' | 'alt'> {
  className?: string
}

const Logo = React.forwardRef<HTMLImageElement, LogoProps>((props, ref) => {
  const darkThemeMatcher = isDarkThemeMatcher(window)
  const [logo, setLogo] = useState(fetchLogo(darkThemeMatcher.matches))

  const updateLogo = (event: MediaQueryListEvent) => {
    setLogo(fetchLogo(event.matches))
  }

  useEffect(() => {
    darkThemeMatcher.addEventListener('change', updateLogo)

    return () => (darkThemeMatcher.removeEventListener('change', updateLogo))
  }, [darkThemeMatcher])

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

const fetchLogo = (isDark: boolean) => (isDark ? logoLight : logoDark)

export { Logo }
