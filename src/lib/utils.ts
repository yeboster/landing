import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function isDarkThemeMatcher(window: Window) {
  return window.matchMedia('(prefers-color-scheme: dark)')
}
