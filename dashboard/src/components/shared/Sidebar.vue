<template>
  <aside
    :class="[
      'fixed lg:sticky top-16 left-0 h-[calc(100vh-4rem)] bg-background border-r border-border',
      'w-64 transition-transform duration-300 z-30',
      appStore.sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
    ]"
  >
    <!-- Overlay for mobile -->
    <div
      v-if="appStore.sidebarOpen"
      @click="appStore.toggleSidebar()"
      class="fixed inset-0 bg-black/20 lg:hidden z-20"
    />

    <nav class="p-4 space-y-2 overflow-y-auto h-full relative z-30 bg-background">
      <RouterLink
        v-for="item in menuItems"
        :key="item.path"
        :to="item.path"
        :class="[
          'flex items-center gap-3 px-4 py-2.5 rounded-md transition-colors',
          'hover:bg-background-secondary',
          isActive(item.path)
            ? 'bg-primary text-primary-foreground'
            : 'text-foreground-secondary'
        ]"
        @click="closeSidebarOnMobile"
      >
        <component :is="item.icon" class="w-5 h-5" />
        <span class="font-medium">{{ item.label }}</span>
      </RouterLink>
    </nav>
  </aside>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { RouterLink, useRoute } from 'vue-router'
import {
  LayoutDashboard,
  Calendar,
  Users,
  CreditCard,
  Settings,
  BookOpen,
  Ticket,
  User,
} from 'lucide-vue-next'
import { useAuthStore } from '@/stores/auth'
import { useAppStore } from '@/stores/app'

const authStore = useAuthStore()
const appStore = useAppStore()
const route = useRoute()

const instructorMenuItems = [
  { label: 'Dashboard', path: '/dashboard/instructor', icon: LayoutDashboard },
  { label: 'Classes', path: '/dashboard/instructor/classes', icon: Calendar },
  { label: 'Clients', path: '/dashboard/instructor/clients', icon: Users },
  { label: 'Payments', path: '/dashboard/instructor/payments', icon: CreditCard },
  { label: 'Settings', path: '/dashboard/instructor/settings', icon: Settings },
]

const clientMenuItems = [
  { label: 'Dashboard', path: '/dashboard/client', icon: LayoutDashboard },
  { label: 'My Classes', path: '/dashboard/client/classes', icon: BookOpen },
  { label: 'Credits', path: '/dashboard/client/credits', icon: Ticket },
  { label: 'Book a Class', path: '/dashboard/client/book', icon: Calendar },
  { label: 'Profile', path: '/dashboard/client/profile', icon: User },
]

const menuItems = computed(() => {
  return authStore.isInstructor ? instructorMenuItems : clientMenuItems
})

const isActive = (path: string) => {
  return route.path === path
}

const closeSidebarOnMobile = () => {
  if (window.innerWidth < 1024) {
    appStore.toggleSidebar()
  }
}
</script>
