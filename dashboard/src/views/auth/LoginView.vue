<template>
  <div class="min-h-screen bg-background flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
    <Card class="w-full max-w-md" variant="elevated">
      <div class="text-center mb-8">
        <h1 class="text-3xl font-bold font-display text-foreground">BookWell</h1>
        <p class="mt-2 text-sm text-foreground-secondary">Sign in to your account</p>
      </div>

      <form @submit.prevent="handleSubmit" class="space-y-6">
        <Input
          v-model="formData.email"
          type="email"
          label="Email address"
          placeholder="you@example.com"
          :error="errors.email"
          required
          autocomplete="email"
        />

        <Input
          v-model="formData.password"
          type="password"
          label="Password"
          placeholder="Enter your password"
          :error="errors.password"
          required
          autocomplete="current-password"
        />

        <div class="flex items-center justify-between">
          <div class="text-sm">
            <RouterLink
              to="/forgot-password"
              class="font-medium text-primary hover:text-primary-dark transition-colors"
            >
              Forgot your password?
            </RouterLink>
          </div>
        </div>

        <Button
          type="submit"
          variant="primary"
          class="w-full"
          :loading="authStore.isLoading"
          :disabled="authStore.isLoading"
        >
          Sign in
        </Button>

        <div class="text-center text-sm">
          <span class="text-foreground-secondary">Don't have an account?</span>
          <RouterLink
            to="/register"
            class="ml-1 font-medium text-primary hover:text-primary-dark transition-colors"
          >
            Sign up
          </RouterLink>
        </div>
      </form>
    </Card>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue'
import { RouterLink, useRouter, useRoute } from 'vue-router'
import { Button, Input, Card } from '@/components/ui'
import { useAuthStore } from '@/stores/auth'
import { useToast } from '@/composables/useToast'

const authStore = useAuthStore()
const router = useRouter()
const route = useRoute()
const { success, error: showError } = useToast()

const formData = reactive({
  email: '',
  password: '',
})

const errors = ref<Record<string, string>>({})

const handleSubmit = async () => {
  errors.value = {}

  // Basic validation
  if (!formData.email) {
    errors.value.email = 'Email is required'
    return
  }
  if (!formData.password) {
    errors.value.password = 'Password is required'
    return
  }

  try {
    await authStore.login({
      email: formData.email,
      password: formData.password,
    })

    success('Welcome back!', `Logged in as ${authStore.currentUser?.firstName}`)

    // Redirect to intended route or dashboard
    const redirect = (route.query.redirect as string) || (authStore.isInstructor ? '/dashboard/instructor' : '/dashboard/client')
    router.push(redirect)
  } catch (err: any) {
    showError('Login failed', err.message || 'Invalid email or password')
    errors.value.password = 'Invalid credentials'
  }
}
</script>
