import Image, { ImageProps as NextImageProps } from "next/image"
import logo from '../../../public/images/logo.png'
import React from "react"

export interface LogoProps
  extends Omit<NextImageProps, 'src' | 'alt'> {
  className?: string
}

const Logo = React.forwardRef<HTMLImageElement, LogoProps>((props, ref) => {
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
