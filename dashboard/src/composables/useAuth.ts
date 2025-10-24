import { ref, computed } from 'vue'
import { httpClient } from '@/utils/http-client'
import type { CurrentUser, LoginInput, RegisterInput } from '@/types'
import { useRouter } from 'vue-router'

const currentUser = ref<CurrentUser | null>(null)
const isLoading = ref(false)
const error = ref<string | null>(null)

export const useAuth = () => {
  const router = useRouter()

  const isAuthenticated = computed(() => !!currentUser.value)
  const isInstructor = computed(() => currentUser.value?.role === 'instructor')
  const isClient = computed(() => currentUser.value?.role === 'client')

  /**
   * Fetch current user profile
   */
  const fetchCurrentUser = async () => {
    try {
      isLoading.value = true
      error.value = null
      const response = await httpClient.get<CurrentUser>('/auth/me')
      currentUser.value = response
      return response
    } catch (err: any) {
      error.value = err.message || 'Failed to fetch user'
      currentUser.value = null
      throw err
    } finally {
      isLoading.value = false
    }
  }

  /**
   * Login with email and password
   * Note: Actual Better Auth login will be handled by the Better Auth client
   * This is a placeholder that checks the session after login
   */
  const login = async (credentials: LoginInput) => {
    try {
      isLoading.value = true
      error.value = null

      // Better Auth handles the actual login via its own endpoint
      // We'll use the Better Auth client in the component
      // After successful login, fetch the current user
      await fetchCurrentUser()

      // Redirect based on role
      if (currentUser.value?.role === 'instructor') {
        router.push('/dashboard/instructor')
      } else {
        router.push('/dashboard/client')
      }

      return currentUser.value
    } catch (err: any) {
      error.value = err.message || 'Login failed'
      throw err
    } finally {
      isLoading.value = false
    }
  }

  /**
   * Register new user
   * Note: Actual Better Auth registration will be handled by the Better Auth client
   */
  const register = async (data: RegisterInput) => {
    try {
      isLoading.value = true
      error.value = null

      // Better Auth handles registration
      // After successful registration, user should be logged in automatically
      await fetchCurrentUser()

      return currentUser.value
    } catch (err: any) {
      error.value = err.message || 'Registration failed'
      throw err
    } finally {
      isLoading.value = false
    }
  }

  /**
   * Logout current user
   */
  const logout = async () => {
    try {
      isLoading.value = true
      error.value = null

      // Better Auth handles logout
      // Clear local user data
      currentUser.value = null

      router.push('/login')
    } catch (err: any) {
      error.value = err.message || 'Logout failed'
      throw err
    } finally {
      isLoading.value = false
    }
  }

  /**
   * Complete instructor profile after registration
   */
  const completeInstructorProfile = async (profileData: any) => {
    try {
      isLoading.value = true
      error.value = null

      await httpClient.post('/auth/complete-profile', profileData)
      await fetchCurrentUser()

      return currentUser.value
    } catch (err: any) {
      error.value = err.message || 'Failed to complete profile'
      throw err
    } finally {
      isLoading.value = false
    }
  }

  /**
   * Update current user profile
   */
  const updateProfile = async (profileData: any) => {
    try {
      isLoading.value = true
      error.value = null

      if (isInstructor.value) {
        await httpClient.patch('/instructors/profile', profileData)
      }

      await fetchCurrentUser()

      return currentUser.value
    } catch (err: any) {
      error.value = err.message || 'Failed to update profile'
      throw err
    } finally {
      isLoading.value = false
    }
  }

  /**
   * Reset password request
   */
  const requestPasswordReset = async (email: string) => {
    try {
      isLoading.value = true
      error.value = null

      // Better Auth handles password reset
      // This would use the Better Auth client

      return true
    } catch (err: any) {
      error.value = err.message || 'Failed to request password reset'
      throw err
    } finally {
      isLoading.value = false
    }
  }

  /**
   * Check if user session is valid
   */
  const checkAuth = async () => {
    try {
      await fetchCurrentUser()
      return true
    } catch {
      return false
    }
  }

  return {
    // State
    currentUser: computed(() => currentUser.value),
    isLoading: computed(() => isLoading.value),
    error: computed(() => error.value),
    isAuthenticated,
    isInstructor,
    isClient,

    // Methods
    login,
    register,
    logout,
    fetchCurrentUser,
    completeInstructorProfile,
    updateProfile,
    requestPasswordReset,
    checkAuth,
  }
}
