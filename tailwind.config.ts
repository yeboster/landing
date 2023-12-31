import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      "colors": {
        'fiord': {
          '50': '#f5f8fa',
          '100': '#ebeff4',
          '200': '#d1dce6',
          '300': '#a8bed1',
          '400': '#7a9ab8',
          '500': '#577a9e',
          '600': '#456182',
          '700': '#394e6a',
          '800': '#314159',
          '900': '#2d394d',
          '950': '#1a212d',
        },
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
}
export default config
