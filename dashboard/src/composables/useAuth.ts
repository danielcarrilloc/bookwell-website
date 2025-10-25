import { ref, computed } from 'vue'
import { httpClient } from '@/utils/http-client'
import type { CurrentUser, LoginInput, RegisterInput } from '@/types'
import { authClient } from '@/plugins/better-auth'

const currentUser = ref<CurrentUser | null>(null)
const isLoading = ref(false)
const error = ref<string | null>(null)

export const useAuth = () => {

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
   * Login with email and password using Better Auth
   */
  const login = async (credentials: LoginInput) => {
    try {
      isLoading.value = true
      error.value = null

      // Use Better Auth client for login
      const result = await authClient.signIn.email({
        email: credentials.email,
        password: credentials.password,
      })

      if (result.error) {
        throw new Error(result.error.message || 'Login failed')
      }

      // Fetch current user after successful login
      await fetchCurrentUser()

      return currentUser.value
    } catch (err: any) {
      error.value = err.message || 'Login failed'
      throw err
    } finally {
      isLoading.value = false
    }
  }

  /**
   * Register new user using Better Auth
   */
  const register = async (data: RegisterInput) => {
    try {
      isLoading.value = true
      error.value = null

      // Use Better Auth client for registration
      const result = await authClient.signUp.email({
        email: data.email,
        password: data.password,
        name: `${data.firstName} ${data.lastName}`,
        callbackURL: '/dashboard',
      })

      if (result.error) {
        throw new Error(result.error.message || 'Registration failed')
      }

      // Fetch current user after successful registration
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
   * Logout current user using Better Auth
   */
  const logout = async () => {
    try {
      isLoading.value = true
      error.value = null

      // Use Better Auth client for logout
      await authClient.signOut()

      // Clear local user data
      currentUser.value = null
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
   * Reset password request using Better Auth
   */
  const requestPasswordReset = async (email: string) => {
    try {
      isLoading.value = true
      error.value = null

      // Use Better Auth client for password reset
      const result = await authClient.forgetPassword({
        email,
        redirectTo: '/reset-password',
      })

      if (result.error) {
        throw new Error(result.error.message || 'Failed to request password reset')
      }

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
