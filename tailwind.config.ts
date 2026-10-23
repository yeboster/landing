import type { Config } from 'tailwindcss'
import { fontFamily } from 'tailwindcss/defaultTheme'

const token = (name: string) => `hsl(var(--${name}) / <alpha-value>)`

const config: Config = {
  darkMode: 'class',
  content: [
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    './src/content/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    container: {
      center: true,
      padding: { DEFAULT: '1.25rem', md: '2rem' },
      screens: { '2xl': '1200px' },
    },
    extend: {
      colors: {
        background: token('background'),
        foreground: token('foreground'),
        subtle: token('subtle'),
        card: token('card'),
        border: token('border'),
        ring: token('ring'),
        muted: {
          DEFAULT: token('muted'),
          foreground: token('muted-foreground'),
        },
        brand: {
          DEFAULT: token('brand'),
          foreground: token('brand-foreground'),
          soft: token('brand-soft'),
        },
      },
      fontFamily: {
        sans: ['var(--font-sans)', ...fontFamily.sans],
        serif: ['var(--font-serif)', ...fontFamily.serif],
        mono: ['var(--font-mono)', ...fontFamily.mono],
      },
      borderRadius: {
        '4xl': '2rem',
      },
      boxShadow: {
        soft: '0 1px 2px 0 rgb(0 0 0 / 0.04), 0 8px 24px -8px rgb(0 0 0 / 0.08)',
        lift: '0 2px 4px 0 rgb(0 0 0 / 0.04), 0 24px 48px -16px rgb(0 0 0 / 0.16)',
        glow: '0 0 0 1px hsl(var(--brand) / 0.15), 0 12px 40px -12px hsl(var(--brand) / 0.45)',
      },
      transitionTimingFunction: {
        'out-expo': 'cubic-bezier(0.16, 1, 0.3, 1)',
      },
      keyframes: {
        'aurora-drift': {
          '0%, 100%': { transform: 'translate3d(0, 0, 0) scale(1)' },
          '33%': { transform: 'translate3d(4%, -6%, 0) scale(1.08)' },
          '66%': { transform: 'translate3d(-5%, 4%, 0) scale(0.96)' },
        },
        shimmer: {
          from: { backgroundPosition: '200% 0' },
          to: { backgroundPosition: '-200% 0' },
        },
        marquee: {
          from: { transform: 'translate3d(0, 0, 0)' },
          to: { transform: 'translate3d(-100%, 0, 0)' },
        },
        'pulse-dot': {
          '0%, 100%': { opacity: '1', transform: 'scale(1)' },
          '50%': { opacity: '0.5', transform: 'scale(0.85)' },
        },
      },
      animation: {
        'aurora-drift': 'aurora-drift 18s ease-in-out infinite',
        shimmer: 'shimmer 8s linear infinite',
        'pulse-dot': 'pulse-dot 2s ease-in-out infinite',
        marquee: 'marquee 48s linear infinite',
      },
    },
  },
  plugins: [require('tailwindcss-animate')],
}

export default config
