import * as React from "react"

import { cn } from "@/lib/utils"

const Chip = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, children, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "inline-block capitalize rounded-lg bg-gray-950 dark:bg-white dark:text-gray-500 font-medium tracking-tighter dark:border-gray-400 px-3 py-1 text-sm text-white",

    )}
    {...props}
  >
    {children}
  </div>
))
Chip.displayName = "Chip"

export { Chip }
