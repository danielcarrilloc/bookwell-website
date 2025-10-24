import type { Config } from 'tailwindcss'
import forms from '@tailwindcss/forms'
import typography from '@tailwindcss/typography'

export default {
  content: [
    './index.html',
    './src/**/*.{vue,js,ts,jsx,tsx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        // Neutral base colors
        background: {
          DEFAULT: 'hsl(0 0% 100%)',
          secondary: 'hsl(0 0% 98%)',
          dark: 'hsl(240 10% 3.9%)',
          'dark-secondary': 'hsl(240 5% 6%)',
        },
        foreground: {
          DEFAULT: 'hsl(240 10% 3.9%)',
          secondary: 'hsl(240 5% 64.9%)',
          dark: 'hsl(0 0% 98%)',
          'dark-secondary': 'hsl(240 5% 64.9%)',
        },
        border: {
          DEFAULT: 'hsl(240 5.9% 90%)',
          dark: 'hsl(240 3.7% 15.9%)',
        },
        // Accent color - Amber
        primary: {
          50: 'hsl(48 100% 96%)',
          100: 'hsl(48 96% 89%)',
          200: 'hsl(48 97% 77%)',
          300: 'hsl(46 97% 65%)',
          400: 'hsl(43 96% 56%)',
          500: 'hsl(38 92% 50%)', // Main amber
          600: 'hsl(32 95% 44%)',
          700: 'hsl(26 90% 37%)',
          800: 'hsl(23 83% 31%)',
          900: 'hsl(22 78% 26%)',
          950: 'hsl(21 92% 14%)',
        },
        // Semantic colors
        success: {
          DEFAULT: 'hsl(142 71% 45%)',
          light: 'hsl(142 76% 96%)',
          dark: 'hsl(142 71% 35%)',
        },
        warning: {
          DEFAULT: 'hsl(38 92% 50%)',
          light: 'hsl(48 96% 89%)',
          dark: 'hsl(32 95% 44%)',
        },
        error: {
          DEFAULT: 'hsl(0 84% 60%)',
          light: 'hsl(0 86% 97%)',
          dark: 'hsl(0 84% 50%)',
        },
        info: {
          DEFAULT: 'hsl(199 89% 48%)',
          light: 'hsl(199 89% 96%)',
          dark: 'hsl(199 89% 38%)',
        },
      },
      fontFamily: {
        sans: [
          'Inter',
          'system-ui',
          '-apple-system',
          'BlinkMacSystemFont',
          'Segoe UI',
          'Roboto',
          'sans-serif',
        ],
        display: [
          'Plus Jakarta Sans',
          'Inter',
          'system-ui',
          'sans-serif',
        ],
      },
      fontSize: {
        'xs': ['0.75rem', { lineHeight: '1rem' }],
        'sm': ['0.875rem', { lineHeight: '1.25rem' }],
        'base': ['1rem', { lineHeight: '1.5rem' }],
        'lg': ['1.125rem', { lineHeight: '1.75rem' }],
        'xl': ['1.25rem', { lineHeight: '1.75rem' }],
        '2xl': ['1.5rem', { lineHeight: '2rem' }],
        '3xl': ['1.875rem', { lineHeight: '2.25rem' }],
        '4xl': ['2.25rem', { lineHeight: '2.5rem' }],
        '5xl': ['3rem', { lineHeight: '1' }],
      },
      spacing: {
        '18': '4.5rem',
        '88': '22rem',
        '112': '28rem',
        '128': '32rem',
      },
      borderRadius: {
        'DEFAULT': '0.5rem',
        'sm': '0.375rem',
        'md': '0.5rem',
        'lg': '0.75rem',
        'xl': '1rem',
        '2xl': '1.5rem',
      },
      boxShadow: {
        'sm': '0 1px 2px 0 rgb(0 0 0 / 0.05)',
        'DEFAULT': '0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)',
        'md': '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
        'lg': '0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)',
        'xl': '0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)',
        '2xl': '0 25px 50px -12px rgb(0 0 0 / 0.25)',
        'inner': 'inset 0 2px 4px 0 rgb(0 0 0 / 0.05)',
        'none': 'none',
      },
      animation: {
        'fade-in': 'fadeIn 0.2s ease-in-out',
        'fade-out': 'fadeOut 0.2s ease-in-out',
        'slide-in': 'slideIn 0.3s ease-out',
        'slide-out': 'slideOut 0.3s ease-out',
        'scale-in': 'scaleIn 0.2s ease-out',
        'scale-out': 'scaleOut 0.2s ease-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        fadeOut: {
          '0%': { opacity: '1' },
          '100%': { opacity: '0' },
        },
        slideIn: {
          '0%': { transform: 'translateY(-10px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        slideOut: {
          '0%': { transform: 'translateY(0)', opacity: '1' },
          '100%': { transform: 'translateY(-10px)', opacity: '0' },
        },
        scaleIn: {
          '0%': { transform: 'scale(0.95)', opacity: '0' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
        scaleOut: {
          '0%': { transform: 'scale(1)', opacity: '1' },
          '100%': { transform: 'scale(0.95)', opacity: '0' },
        },
      },
    },
  },
  plugins: [forms, typography],
} satisfies Config
