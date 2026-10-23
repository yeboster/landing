import * as React from 'react'
import { Slot } from '@radix-ui/react-slot'
import { cva, type VariantProps } from 'class-variance-authority'

import { cn } from '@/lib/utils'

const buttonVariants = cva(
  'group/button relative inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full text-sm font-medium transition-all duration-300 ease-out-expo active:scale-[0.97] disabled:pointer-events-none disabled:opacity-50 [&_svg]:size-4 [&_svg]:shrink-0',
  {
    variants: {
      variant: {
        primary:
          'bg-foreground text-background shadow-soft hover:-translate-y-0.5 hover:shadow-lift hover:bg-foreground/90',
        brand:
          'bg-brand text-brand-foreground shadow-soft hover:-translate-y-0.5 hover:shadow-glow',
        secondary:
          'border bg-card text-foreground shadow-sm hover:-translate-y-0.5 hover:border-foreground/20 hover:shadow-soft',
        ghost: 'text-muted-foreground hover:bg-muted hover:text-foreground',
        link: 'h-auto rounded-none px-0 text-foreground underline-offset-4 hover:underline',
      },
      size: {
        sm: 'h-9 px-4',
        md: 'h-11 px-6',
        lg: 'h-12 px-7 text-base',
        icon: 'size-10',
      },
    },
    defaultVariants: {
      variant: 'primary',
      size: 'md',
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : 'button'
    return <Comp className={cn(buttonVariants({ variant, size, className }))} ref={ref} {...props} />
  }
)
Button.displayName = 'Button'

export { Button, buttonVariants }
