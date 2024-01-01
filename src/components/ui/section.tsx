import * as React from "react"

import { cn } from "@/lib/utils"

const SectionHead = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, children, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "w-full pt-12 md:pt-24 lg:pt-32 bg-center bg-cover",

    )}
    {...props}
  >
    <div className="px-4 md:px-6 space-y-10 xl:space-y-16">
      <div className="grid max-w-[1300px] mx-auto gap-4 px-4 sm:px-6 md:px-10 md:grid-cols-2 md:gap-16">
        {children}
      </div>
    </div>
  </div>
))
SectionHead.displayName = "SectionHead"

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
      <div className="flex flex-col items-center justify-center space-y-4 text-center">
        <div className="space-y-2">
          {children}
        </div>
      </div>
    </div>
  </div>
))
Section.displayName = "Section"


export { SectionHead, Section }
