import { createAuthClient } from 'better-auth/vue'

export const authClient = createAuthClient({
  baseURL: import.meta.env.VITE_BETTER_AUTH_URL || 'http://localhost:3000/auth',
})

export default authClient
