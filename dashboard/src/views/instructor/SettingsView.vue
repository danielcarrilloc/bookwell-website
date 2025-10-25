<template>
  <div class="space-y-6">
    <div>
      <h1 class="text-3xl font-bold text-foreground">Settings</h1>
      <p class="text-foreground-secondary mt-1">Manage your profile and preferences</p>
    </div>

    <!-- Profile Settings -->
    <Card variant="bordered">
      <template #header>
        <h2 class="text-lg font-semibold">Profile Information</h2>
      </template>

      <form @submit.prevent="handleSaveProfile" class="space-y-4">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input
            v-model="profileData.firstName"
            label="First Name"
            required
          />
          <Input
            v-model="profileData.lastName"
            label="Last Name"
            required
          />
        </div>

        <Input
          v-model="profileData.email"
          type="email"
          label="Email"
          required
          disabled
        />

        <Input
          v-model="profileData.phone"
          type="tel"
          label="Phone"
        />

        <Input
          v-model="profileData.businessName"
          label="Business Name"
          hint="Your studio or business name"
        />

        <Input
          v-model="profileData.bio"
          type="textarea"
          label="Bio"
          :rows="4"
          hint="Tell clients about yourself"
        />

        <Button type="submit" variant="primary" :loading="isSaving">
          Save Changes
        </Button>
      </form>
    </Card>

    <!-- Notification Preferences -->
    <Card variant="bordered">
      <template #header>
        <h2 class="text-lg font-semibold">Notification Preferences</h2>
      </template>

      <div class="space-y-4">
        <div class="flex items-center justify-between">
          <div>
            <p class="font-medium">Email Notifications</p>
            <p class="text-sm text-foreground-secondary">Receive booking confirmations via email</p>
          </div>
          <input type="checkbox" v-model="notifications.email" class="toggle" />
        </div>

        <div class="flex items-center justify-between">
          <div>
            <p class="font-medium">SMS Notifications</p>
            <p class="text-sm text-foreground-secondary">Get text messages for important updates</p>
          </div>
          <input type="checkbox" v-model="notifications.sms" class="toggle" />
        </div>
      </div>
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

const profileData = reactive({
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
  businessName: '',
  bio: '',
})

const notifications = reactive({
  email: true,
  sms: false,
})

const handleSaveProfile = async () => {
  try {
    isSaving.value = true
    await authStore.updateProfile(profileData)
    success('Profile updated successfully')
  } catch (err) {
    error('Failed to update profile')
  } finally {
    isSaving.value = false
  }
}

onMounted(() => {
  if (authStore.currentUser) {
    profileData.firstName = authStore.currentUser.firstName
    profileData.lastName = authStore.currentUser.lastName
    profileData.email = authStore.currentUser.email
    profileData.phone = authStore.currentUser.phone || ''
    profileData.businessName = authStore.currentUser.instructor?.businessName || ''
    profileData.bio = authStore.currentUser.instructor?.bio || ''
  }
})
</script>

<style scoped>
.toggle {
  width: 3rem;
  height: 1.5rem;
  border-radius: 9999px;
  cursor: pointer;
  background-color: var(--color-border);
  transition: background-color 0.2s;
}

.toggle:checked {
  background-color: var(--color-primary);
}
</style>
