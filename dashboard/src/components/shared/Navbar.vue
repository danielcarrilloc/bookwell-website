<template>
  <nav class="border-b border-border bg-background sticky top-0 z-40">
    <div class="container-padding">
      <div class="flex items-center justify-between h-16">
        <!-- Logo and Menu Button -->
        <div class="flex items-center gap-4">
          <button
            @click="appStore.toggleSidebar()"
            class="p-2 rounded-md hover:bg-background-secondary lg:hidden transition-colors"
            aria-label="Toggle sidebar"
          >
            <Menu class="w-5 h-5" />
          </button>

          <RouterLink to="/" class="flex items-center gap-2">
            <h1 class="text-xl font-bold font-display text-foreground">BookWell</h1>
          </RouterLink>
        </div>

        <!-- Right side -->
        <div class="flex items-center gap-4">
          <!-- Theme toggle -->
          <button
            @click="appStore.toggleTheme()"
            class="p-2 rounded-md hover:bg-background-secondary transition-colors"
            :aria-label="`Switch to ${appStore.theme === 'dark' ? 'light' : 'dark'} mode`"
          >
            <Sun v-if="appStore.theme === 'dark'" class="w-5 h-5" />
            <Moon v-else class="w-5 h-5" />
          </button>

          <!-- User menu -->
          <div class="flex items-center gap-3">
            <span class="text-sm font-medium text-foreground hidden sm:inline">
              {{ authStore.currentUser?.firstName }}
            </span>
            <Button variant="ghost" size="sm" @click="handleLogout" :loading="isLoggingOut">
              Logout
            </Button>
          </div>
        </div>
      </div>
    </div>
  </nav>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { Menu, Sun, Moon } from 'lucide-vue-next'
import { RouterLink, useRouter } from 'vue-router'
import { Button } from '@/components/ui'
import { useAuthStore } from '@/stores/auth'
import { useAppStore } from '@/stores/app'

const authStore = useAuthStore()
const appStore = useAppStore()
const router = useRouter()
const isLoggingOut = ref(false)

const handleLogout = async () => {
  try {
    isLoggingOut.value = true
    await authStore.logout()
    router.push('/login')
  } catch (error) {
    console.error('Logout error:', error)
  } finally {
    isLoggingOut.value = false
  }
}
</script>
