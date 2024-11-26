/** @type {import('tailwindcss').Config} */
import tailwindAnimate from 'tailwindcss-animate'

export default {
  darkMode: ['class'],
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)'
      },
      colors: {},
      fontFamily: {
        cinzel: ['Cinzel', 'serif'],
        serif4: ['Source Serif 4', 'serif'],
        montserrat: ['Montserrat', 'sans-serif']
      }
    }
  },
  plugins: [tailwindAnimate]
}
