'use client'

import { Printer } from 'lucide-react'

import { Button } from '@/components/ui/button'

/** The About page prints as a CV; this opens the browser's print dialog. */
export function PrintButton() {
  return (
    <Button type="button" variant="secondary" onClick={() => window.print()}>
      <Printer aria-hidden />
      Save résumé as PDF
    </Button>
  )
}
