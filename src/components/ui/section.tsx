import * as React from "react"

import { cn } from "@/lib/utils"

const Section = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, children, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "w-full flex flex-col items-center py-12 md:py-24 lg:py-32",
      className
    )}
    {...props}
  >
    <div className="container space-y-12 px-4 md:px-6">
      {children}
    </div>
  </div >
))
Section.displayName = "Section"

const SectionTitle = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, children, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "flex flex-col items-center justify-center space-y-4 text-center",
      className
    )}
    {...props}
  >
    <div className="space-y-2">
      {children}
    </div>
  </div>
))
SectionTitle.displayName = "SectionTitle"



export { Section, SectionTitle }
