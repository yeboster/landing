import type { Config } from 'tailwindcss'
import { fontFamily } from 'tailwindcss/defaultTheme'

// Colors are RGB channels in CSS variables (see globals.css) so they switch
// with the theme and still accept Tailwind opacity modifiers like `bg-brand/10`.
const token = (name: string) => `rgb(var(--${name}) / <alpha-value>)`

const config: Config = {
  darkMode: 'class',
  content: ['./src/components/**/*.{js,ts,jsx,tsx,mdx}', './src/app/**/*.{js,ts,jsx,tsx,mdx}', './src/lib/**/*.{ts,tsx}'],
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
        muted: {
          DEFAULT: token('muted'),
          foreground: token('muted-foreground'),
        },
        brand: {
          /** Fills and decoration. Same hue in both themes. */
          DEFAULT: token('brand'),
          /** Hover/pressed state for brand fills. */
          strong: token('brand-strong'),
          /** Brand-colored text; lighter in dark mode to keep WCAG AA. */
          ink: token('brand-ink'),
          /** Tinted surface behind brand content. */
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
        glow: '0 0 0 1px rgb(var(--brand) / 0.15), 0 12px 40px -12px rgb(var(--brand) / 0.5)',
      },
      transitionTimingFunction: {
        'out-expo': 'cubic-bezier(0.16, 1, 0.3, 1)',
      },
      keyframes: {
        'pulse-dot': {
          '0%, 100%': { opacity: '1', transform: 'scale(1)' },
          '50%': { opacity: '0.5', transform: 'scale(0.85)' },
        },
      },
      animation: {
        'pulse-dot': 'pulse-dot 2s ease-in-out infinite',
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
    },
  },
  plugins: [],
}

export default config
