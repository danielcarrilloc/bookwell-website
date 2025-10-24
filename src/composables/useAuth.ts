import { useUserStore } from '@/stores/user'

interface RegisterPayload {
  name: string
  email: string
  password: string
  role: 'client' | 'instructor'
}

export function useAuth() {
  const store = useUserStore()

  async function login(email: string, _password: string) {
    // TODO: integrate real API call with axios
    await wait(400)
    store.setAuth({ id: 'u1', name: email.split('@')[0], email, role: 'client', credits: 6 }, 'token_123')
    return true
  }

  async function register(payload: RegisterPayload) {
    await wait(500)
    store.setAuth({ id: 'u1', name: payload.name, email: payload.email, role: payload.role, credits: 10 }, 'token_abc')
    return true
  }

  function logout() {
    store.clear()
  }

  return { login, register, logout }
}

function wait(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms))
}