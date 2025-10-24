import { ref, watchEffect } from 'vue'

type Theme = 'light' | 'dark'
const theme = ref<Theme>(getInitial())

function getInitial(): Theme {
  const stored = localStorage.getItem('theme') as Theme | null
  if (stored) return stored
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
  return prefersDark ? 'dark' : 'light'
}

watchEffect(() => {
  const root = document.documentElement
  if (theme.value === 'dark') root.classList.add('dark')
  else root.classList.remove('dark')
  localStorage.setItem('theme', theme.value)
})

function toggle() {
  theme.value = theme.value === 'dark' ? 'light' : 'dark'
}

export function useTheme() {
  return { theme, toggle }
}