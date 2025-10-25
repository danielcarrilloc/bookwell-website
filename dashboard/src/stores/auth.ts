import { defineStore } from 'pinia'
import { useAuth } from '@/composables/useAuth'

/**
 * Auth Store
 * Manages authentication state using the useAuth composable
 */
export const useAuthStore = defineStore('auth', () => {
  const auth = useAuth()

  return {
    ...auth,
  }
})
