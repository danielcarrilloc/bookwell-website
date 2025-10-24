/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
    './index.html',
    './src/**/*.{vue,ts,tsx,js,jsx}'
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        display: ['Plus Jakarta Sans', 'Inter', 'system-ui', 'sans-serif'],
        mono: ['ui-monospace', 'SFMono-Regular', 'Menlo', 'Monaco', 'Consolas', 'Liberation Mono', 'monospace'],
      },
      colors: {
        brand: {
          50: '#eefaff',
          100: '#d9f3ff',
          200: '#b8e9ff',
          300: '#89dbff',
          400: '#4ac6ff',
          500: '#22b0ff',
          600: '#0c8fe6',
          700: '#0b74b8',
          800: '#0f5e90',
          900: '#124f75',
        }
      },
      boxShadow: {
        subtle: '0 1px 2px rgba(0,0,0,0.06), 0 4px 16px rgba(0,0,0,0.04)',
        ring: '0 0 0 6px rgba(34,176,255,0.15)',
      }
    }
  },
  plugins: []
}