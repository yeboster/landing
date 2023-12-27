import Image from "next/image"
import logo from '../../../public/images/logo.png'
import React from "react"

export interface LogoProps {
  width?: number | `${number}` | undefined;
  height?: number | `${number}` | undefined;
  fill?: boolean | undefined;
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
