<template>
  <div class="space-y-6">
    <div>
      <h1 class="text-3xl font-bold text-foreground">Profile</h1>
      <p class="text-foreground-secondary mt-1">Manage your personal information</p>
    </div>

    <!-- Personal Information -->
    <Card variant="bordered">
      <template #header>
        <h2 class="text-lg font-semibold">Personal Information</h2>
      </template>

      <form @submit.prevent="handleSave" class="space-y-4">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input
            v-model="formData.firstName"
            label="First Name"
            required
          />
          <Input
            v-model="formData.lastName"
            label="Last Name"
            required
          />
        </div>

        <Input
          v-model="formData.email"
          type="email"
          label="Email"
          required
          disabled
        />

        <Input
          v-model="formData.phone"
          type="tel"
          label="Phone"
        />

        <Button type="submit" variant="primary" :loading="isSaving">
          Save Changes
        </Button>
      </form>
    </Card>

    <!-- Change Password -->
    <Card variant="bordered">
      <template #header>
        <h2 class="text-lg font-semibold">Change Password</h2>
      </template>

      <form @submit.prevent="handleChangePassword" class="space-y-4">
        <Input
          v-model="passwordData.current"
          type="password"
          label="Current Password"
          required
        />

        <Input
          v-model="passwordData.new"
          type="password"
          label="New Password"
          hint="At least 8 characters"
          required
        />

        <Input
          v-model="passwordData.confirm"
          type="password"
          label="Confirm New Password"
          required
        />

        <Button type="submit" variant="primary" :loading="isChangingPassword">
          Update Password
        </Button>
      </form>
    </Card>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, onMounted } from 'vue'
import { Card, Input, Button } from '@/components/ui'
import { useAuthStore } from '@/stores/auth'
import { useToast } from '@/composables/useToast'

const authStore = useAuthStore()
const { success, error } = useToast()
const isSaving = ref(false)
const isChangingPassword = ref(false)

const formData = reactive({
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
})

const passwordData = reactive({
  current: '',
  new: '',
  confirm: '',
})

const handleSave = async () => {
  try {
    isSaving.value = true
    // TODO: Implement profile update
    success('Profile updated successfully')
  } catch (err) {
    error('Failed to update profile')
  } finally {
    isSaving.value = false
  }
}

const handleChangePassword = async () => {
  if (passwordData.new !== passwordData.confirm) {
    error('Passwords do not match')
    return
  }

  try {
    isChangingPassword.value = true
    // TODO: Implement password change
    success('Password updated successfully')
    passwordData.current = ''
    passwordData.new = ''
    passwordData.confirm = ''
  } catch (err) {
    error('Failed to update password')
  } finally {
    isChangingPassword.value = false
  }
}

onMounted(() => {
  if (authStore.currentUser) {
    formData.firstName = authStore.currentUser.firstName
    formData.lastName = authStore.currentUser.lastName
    formData.email = authStore.currentUser.email
    formData.phone = authStore.currentUser.phone || ''
  }
})
</script>
