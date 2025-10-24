import { defineStore } from 'pinia'

type Role = 'instructor' | 'client' | null

interface User {
  id: string
  name: string
  email: string
  role: Role
  credits?: number
}

export const useUserStore = defineStore('user', {
  state: () => ({
    user: null as User | null,
    token: '' as string
  }),
  getters: {
    isAuthenticated: (s) => !!s.token,
    role: (s): Role => s.user?.role ?? null,
    credits: (s) => s.user?.credits ?? 0
  },
  actions: {
    setAuth(user: User, token: string) {
      this.user = user
      this.token = token
    },
    clear() {
      this.user = null
      this.token = ''
    },
    setCredits(value: number) {
      if (this.user) this.user.credits = value
    }
  }
})