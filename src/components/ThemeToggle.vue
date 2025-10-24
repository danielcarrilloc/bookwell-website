<template>
  <button @click="toggle" class="inline-flex items-center gap-2 h-9 px-3 rounded-md border border-slate-200 dark:border-zinc-800 hover:bg-slate-50 dark:hover:bg-zinc-900 text-sm">
    <component :is="icon" class="h-4 w-4" />
    <span class="hidden sm:block">{{ label }}</span>
  </button>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useTheme } from '@/composables/useTheme'
import { Moon, Sun } from 'lucide-vue-next'

const { theme, toggle } = useTheme()
const icon = computed(() => theme.value === 'dark' ? Sun : Moon)
const label = computed(() => theme.value === 'dark' ? 'Light' : 'Dark')
</script>