import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

/**
 * App Store
 * Manages global UI state like theme and sidebar
 */
export const useAppStore = defineStore('app', () => {
  const theme = ref<'light' | 'dark'>('light')
  const sidebarOpen = ref(true)

  /**
   * Toggle between light and dark theme
   */
  const toggleTheme = () => {
    theme.value = theme.value === 'light' ? 'dark' : 'light'
    document.documentElement.classList.toggle('dark')
    localStorage.setItem('theme', theme.value)
  }

  /**
   * Toggle sidebar open/closed
   */
  const toggleSidebar = () => {
    sidebarOpen.value = !sidebarOpen.value
  }

  /**
   * Initialize theme from localStorage on app start
   */
  const initTheme = () => {
    const savedTheme = localStorage.getItem('theme')
    if (savedTheme) {
      theme.value = savedTheme as 'light' | 'dark'
      if (savedTheme === 'dark') {
        document.documentElement.classList.add('dark')
      }
    } else {
      // Check system preference
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
      if (prefersDark) {
        theme.value = 'dark'
        document.documentElement.classList.add('dark')
        localStorage.setItem('theme', 'dark')
      }
    }
  }

  return {
    theme: computed(() => theme.value),
    sidebarOpen: computed(() => sidebarOpen.value),
    toggleTheme,
    toggleSidebar,
    initTheme,
  }
})
