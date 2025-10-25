<template>
  <div class="min-h-screen bg-background flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
    <Card class="w-full max-w-md" variant="elevated">
      <div class="text-center mb-8">
        <h1 class="text-3xl font-bold font-display text-foreground">BookWell</h1>
        <p class="mt-2 text-sm text-foreground-secondary">Create your account</p>
      </div>

      <form @submit.prevent="handleSubmit" class="space-y-6">
        <div class="grid grid-cols-2 gap-4">
          <Input
            v-model="formData.firstName"
            type="text"
            label="First name"
            placeholder="John"
            :error="errors.firstName"
            required
            autocomplete="given-name"
          />

          <Input
            v-model="formData.lastName"
            type="text"
            label="Last name"
            placeholder="Doe"
            :error="errors.lastName"
            required
            autocomplete="family-name"
          />
        </div>

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
          v-model="formData.phone"
          type="tel"
          label="Phone number"
          placeholder="+55 11 99999-9999"
          :error="errors.phone"
          hint="Include country code"
          autocomplete="tel"
        />

        <Input
          v-model="formData.password"
          type="password"
          label="Password"
          placeholder="Create a strong password"
          :error="errors.password"
          hint="At least 8 characters"
          required
          autocomplete="new-password"
        />

        <Input
          v-model="formData.confirmPassword"
          type="password"
          label="Confirm password"
          placeholder="Re-enter your password"
          :error="errors.confirmPassword"
          required
          autocomplete="new-password"
        />

        <div class="space-y-2">
          <label class="text-sm font-medium text-foreground">Account type</label>
          <div class="grid grid-cols-2 gap-4">
            <button
              type="button"
              @click="formData.role = 'client'"
              :class="[
                'p-4 border-2 rounded-lg transition-all',
                formData.role === 'client'
                  ? 'border-primary bg-primary/5'
                  : 'border-border hover:border-border-hover'
              ]"
            >
              <div class="text-sm font-medium">Client</div>
              <div class="text-xs text-foreground-secondary mt-1">Book classes</div>
            </button>

            <button
              type="button"
              @click="formData.role = 'instructor'"
              :class="[
                'p-4 border-2 rounded-lg transition-all',
                formData.role === 'instructor'
                  ? 'border-primary bg-primary/5'
                  : 'border-border hover:border-border-hover'
              ]"
            >
              <div class="text-sm font-medium">Instructor</div>
              <div class="text-xs text-foreground-secondary mt-1">Manage classes</div>
            </button>
          </div>
        </div>

        <Button
          type="submit"
          variant="primary"
          class="w-full"
          :loading="authStore.isLoading"
          :disabled="authStore.isLoading"
        >
          Create account
        </Button>

        <div class="text-center text-sm">
          <span class="text-foreground-secondary">Already have an account?</span>
          <RouterLink
            to="/login"
            class="ml-1 font-medium text-primary hover:text-primary-dark transition-colors"
          >
            Sign in
          </RouterLink>
        </div>
      </form>
    </Card>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue'
import { RouterLink, useRouter } from 'vue-router'
import { Button, Input, Card } from '@/components/ui'
import { useAuthStore } from '@/stores/auth'
import { useToast } from '@/composables/useToast'
import { validateEmail, validatePassword } from '@/utils/validation'

const authStore = useAuthStore()
const router = useRouter()
const { success, error: showError } = useToast()

const formData = reactive({
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
  password: '',
  confirmPassword: '',
  role: 'client' as 'client' | 'instructor',
})

const errors = ref<Record<string, string>>({})

const validate = () => {
  errors.value = {}

  if (!formData.firstName.trim()) {
    errors.value.firstName = 'First name is required'
  }
  if (!formData.lastName.trim()) {
    errors.value.lastName = 'Last name is required'
  }

  const emailError = validateEmail(formData.email)
  if (emailError) {
    errors.value.email = emailError
  }

  const passwordError = validatePassword(formData.password)
  if (passwordError) {
    errors.value.password = passwordError
  }

  if (formData.password !== formData.confirmPassword) {
    errors.value.confirmPassword = 'Passwords do not match'
  }

  return Object.keys(errors.value).length === 0
}

const handleSubmit = async () => {
  if (!validate()) {
    return
  }

  try {
    await authStore.register({
      firstName: formData.firstName,
      lastName: formData.lastName,
      email: formData.email,
      phone: formData.phone,
      password: formData.password,
      role: formData.role,
    })

    success('Welcome to BookWell!', 'Your account has been created')

    // Redirect based on role
    const redirect = authStore.isInstructor ? '/dashboard/instructor' : '/dashboard/client'
    router.push(redirect)
  } catch (err: any) {
    showError('Registration failed', err.message || 'Please try again')
  }
}
</script>
