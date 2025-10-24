<template>
  <aside class="w-full lg:w-64 border border-slate-200 dark:border-zinc-800 rounded-lg p-3">
    <nav class="space-y-1">
      <button v-for="item in items" :key="item.key"
        @click="$emit('select', item.key)"
        :class="['w-full flex items-center gap-2 px-3 py-2 rounded-md text-sm hover:bg-slate-50 dark:hover:bg-zinc-900', active === item.key ? 'bg-slate-100 dark:bg-zinc-900' : '']">
        <component :is="item.icon" class="h-4 w-4" />
        <span>{{ item.label }}</span>
      </button>
    </nav>
  </aside>
</template>

<script setup lang="ts">
import { Home, CalendarDays, Users, Wallet, Settings } from 'lucide-vue-next'
defineProps<{
  active: string
}>()

const items = [
  { key: 'home', label: 'Home', icon: Home },
  { key: 'classes', label: 'Classes', icon: CalendarDays },
  { key: 'clients', label: 'Clients', icon: Users },
  { key: 'payments', label: 'Payments & Credits', icon: Wallet },
  { key: 'settings', label: 'Settings', icon: Settings },
]
</script>