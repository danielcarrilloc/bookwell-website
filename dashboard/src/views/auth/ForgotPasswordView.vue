<template>
  <div class="min-h-screen bg-background flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
    <Card class="w-full max-w-md" variant="elevated">
      <div class="text-center mb-8">
        <h1 class="text-3xl font-bold font-display text-foreground">Reset Password</h1>
        <p class="mt-2 text-sm text-foreground-secondary">
          Enter your email address and we'll send you a link to reset your password
        </p>
      </div>

      <form v-if="!emailSent" @submit.prevent="handleSubmit" class="space-y-6">
        <Input
          v-model="email"
          type="email"
          label="Email address"
          placeholder="you@example.com"
          :error="error"
          required
          autocomplete="email"
        />

        <Button
          type="submit"
          variant="primary"
          class="w-full"
          :loading="isLoading"
          :disabled="isLoading"
        >
          Send reset link
        </Button>

        <div class="text-center text-sm">
          <RouterLink
            to="/login"
            class="font-medium text-primary hover:text-primary-dark transition-colors"
          >
            Back to sign in
          </RouterLink>
        </div>
      </form>

      <div v-else class="text-center space-y-4">
        <div class="w-16 h-16 bg-success/10 rounded-full flex items-center justify-center mx-auto">
          <svg
            class="w-8 h-8 text-success"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M5 13l4 4L19 7"
            />
          </svg>
        </div>

        <h3 class="text-lg font-semibold text-foreground">Check your email</h3>
        <p class="text-sm text-foreground-secondary">
          We've sent a password reset link to <strong>{{ email }}</strong>
        </p>

        <Button
          variant="outline"
          class="w-full mt-4"
          @click="emailSent = false"
        >
          Try another email
        </Button>

        <div class="text-center text-sm">
          <RouterLink
            to="/login"
            class="font-medium text-primary hover:text-primary-dark transition-colors"
          >
            Back to sign in
          </RouterLink>
        </div>
      </div>
    </Card>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { RouterLink } from 'vue-router'
import { Button, Input, Card } from '@/components/ui'
import { useAuthStore } from '@/stores/auth'
import { useToast } from '@/composables/useToast'
import { validateEmail } from '@/utils/validation'

const authStore = useAuthStore()
const { success, error: showError } = useToast()

const email = ref('')
const error = ref('')
const isLoading = ref(false)
const emailSent = ref(false)

const handleSubmit = async () => {
  error.value = ''

  // Validate email
  const emailError = validateEmail(email.value)
  if (emailError) {
    error.value = emailError
    return
  }

  try {
    isLoading.value = true
    await authStore.requestPasswordReset(email.value)

    emailSent.value = true
    success('Email sent', 'Check your inbox for the reset link')
  } catch (err: any) {
    showError('Failed to send reset link', err.message || 'Please try again')
    error.value = 'Failed to send reset link'
  } finally {
    isLoading.value = false
  }
}
</script>
