import { transform } from 'next/dist/build/swc'
import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      keyframes: {
        pulse: {
          '0%, 100%': { transform: 'scale(1)', boxShadow: '0 0 5px rgba(0, 0, 0, 0.2)' },
          '50%': { transform: 'scale(1.05)', boxShadow: '0 0 10px rgba(0, 0, 0, 0.3)' },
        },
      },
      animation: {
        pulse: 'pulse 3s ease-in-out infinite',
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
    },
  },
  plugins: [],
}
export default config
