/**
 * Shared Design Tokens for BookWell SaaS
 *
 * This file exports all design system tokens that can be reused
 * across the dashboard and landing page for consistent branding.
 *
 * Design Philosophy:
 * - Clean, modern, minimal aesthetic
 * - Inspired by Linear, Notion, Vercel, Cal.com
 * - Professional and human-centric
 * - Premium wellness brand feel
 */

export const designTokens = {
  /**
   * Color Palette
   * Neutral base with amber accent, supporting both light and dark modes
   */
  colors: {
    // Light mode backgrounds
    background: {
      primary: 'hsl(0 0% 100%)',
      secondary: 'hsl(0 0% 98%)',
      tertiary: 'hsl(240 4.8% 95.9%)',
    },
    // Dark mode backgrounds
    backgroundDark: {
      primary: 'hsl(240 10% 3.9%)',
      secondary: 'hsl(240 5% 6%)',
      tertiary: 'hsl(240 3.7% 15.9%)',
    },
    // Text colors
    foreground: {
      primary: 'hsl(240 10% 3.9%)',
      secondary: 'hsl(240 5% 64.9%)',
      tertiary: 'hsl(240 4.8% 45%)',
    },
    foregroundDark: {
      primary: 'hsl(0 0% 98%)',
      secondary: 'hsl(240 5% 64.9%)',
      tertiary: 'hsl(240 4.8% 55%)',
    },
    // Border colors
    border: {
      light: 'hsl(240 5.9% 90%)',
      DEFAULT: 'hsl(240 4.8% 84%)',
      dark: 'hsl(240 3.7% 15.9%)',
    },
    // Primary accent - Amber (wellness/warmth)
    primary: {
      50: 'hsl(48 100% 96%)',
      100: 'hsl(48 96% 89%)',
      200: 'hsl(48 97% 77%)',
      300: 'hsl(46 97% 65%)',
      400: 'hsl(43 96% 56%)',
      500: 'hsl(38 92% 50%)', // Main brand color
      600: 'hsl(32 95% 44%)',
      700: 'hsl(26 90% 37%)',
      800: 'hsl(23 83% 31%)',
      900: 'hsl(22 78% 26%)',
      950: 'hsl(21 92% 14%)',
    },
    // Semantic colors
    semantic: {
      success: 'hsl(142 71% 45%)',
      successLight: 'hsl(142 76% 96%)',
      warning: 'hsl(38 92% 50%)',
      warningLight: 'hsl(48 96% 89%)',
      error: 'hsl(0 84% 60%)',
      errorLight: 'hsl(0 86% 97%)',
      info: 'hsl(199 89% 48%)',
      infoLight: 'hsl(199 89% 96%)',
    },
  },

  /**
   * Typography
   * Using Inter for body text and Plus Jakarta Sans for display
   */
  typography: {
    fontFamily: {
      sans: "'Inter', system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
      display: "'Plus Jakarta Sans', 'Inter', system-ui, sans-serif",
    },
    fontSize: {
      xs: { size: '0.75rem', lineHeight: '1rem' },
      sm: { size: '0.875rem', lineHeight: '1.25rem' },
      base: { size: '1rem', lineHeight: '1.5rem' },
      lg: { size: '1.125rem', lineHeight: '1.75rem' },
      xl: { size: '1.25rem', lineHeight: '1.75rem' },
      '2xl': { size: '1.5rem', lineHeight: '2rem' },
      '3xl': { size: '1.875rem', lineHeight: '2.25rem' },
      '4xl': { size: '2.25rem', lineHeight: '2.5rem' },
      '5xl': { size: '3rem', lineHeight: '1' },
      '6xl': { size: '3.75rem', lineHeight: '1' },
    },
    fontWeight: {
      light: 300,
      normal: 400,
      medium: 500,
      semibold: 600,
      bold: 700,
    },
  },

  /**
   * Spacing Scale
   * Following a consistent 4px base grid
   */
  spacing: {
    px: '1px',
    0: '0',
    1: '0.25rem', // 4px
    2: '0.5rem', // 8px
    3: '0.75rem', // 12px
    4: '1rem', // 16px
    5: '1.25rem', // 20px
    6: '1.5rem', // 24px
    8: '2rem', // 32px
    10: '2.5rem', // 40px
    12: '3rem', // 48px
    16: '4rem', // 64px
    20: '5rem', // 80px
    24: '6rem', // 96px
  },

  /**
   * Border Radius
   * Consistent rounding for UI elements
   */
  borderRadius: {
    none: '0',
    sm: '0.375rem',
    DEFAULT: '0.5rem',
    md: '0.5rem',
    lg: '0.75rem',
    xl: '1rem',
    '2xl': '1.5rem',
    full: '9999px',
  },

  /**
   * Shadows
   * Subtle, layered depth
   */
  shadows: {
    sm: '0 1px 2px 0 rgb(0 0 0 / 0.05)',
    DEFAULT: '0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)',
    md: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
    lg: '0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)',
    xl: '0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)',
    '2xl': '0 25px 50px -12px rgb(0 0 0 / 0.25)',
    inner: 'inset 0 2px 4px 0 rgb(0 0 0 / 0.05)',
  },

  /**
   * Animation Timings
   * Consistent, subtle motion
   */
  animation: {
    duration: {
      fast: '150ms',
      normal: '200ms',
      slow: '300ms',
      slower: '500ms',
    },
    easing: {
      default: 'cubic-bezier(0.4, 0, 0.2, 1)',
      in: 'cubic-bezier(0.4, 0, 1, 1)',
      out: 'cubic-bezier(0, 0, 0.2, 1)',
      inOut: 'cubic-bezier(0.4, 0, 0.2, 1)',
    },
  },

  /**
   * Breakpoints
   * Mobile-first responsive design
   */
  breakpoints: {
    sm: '640px',
    md: '768px',
    lg: '1024px',
    xl: '1280px',
    '2xl': '1536px',
  },

  /**
   * Z-Index Scale
   * Consistent layering
   */
  zIndex: {
    base: 0,
    dropdown: 1000,
    sticky: 1100,
    modal: 1200,
    popover: 1300,
    tooltip: 1400,
    toast: 1500,
  },
}

/**
 * Export CSS custom properties for use in landing page
 * Can be imported and injected into :root
 */
export const generateCSSVariables = () => {
  return {
    // Colors
    '--color-primary-500': designTokens.colors.primary[500],
    '--color-primary-600': designTokens.colors.primary[600],
    '--color-background': designTokens.colors.background.primary,
    '--color-foreground': designTokens.colors.foreground.primary,
    '--color-border': designTokens.colors.border.DEFAULT,

    // Typography
    '--font-sans': designTokens.typography.fontFamily.sans,
    '--font-display': designTokens.typography.fontFamily.display,

    // Spacing
    '--spacing-4': designTokens.spacing[4],
    '--spacing-8': designTokens.spacing[8],
    '--spacing-12': designTokens.spacing[12],

    // Border radius
    '--radius-default': designTokens.borderRadius.DEFAULT,
    '--radius-lg': designTokens.borderRadius.lg,
  }
}

export default designTokens
