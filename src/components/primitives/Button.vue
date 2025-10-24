<template>
  <button
    :class="[
      'inline-flex items-center justify-center gap-2 rounded-md transition-colors disabled:opacity-50 disabled:cursor-not-allowed',
      sizeClasses,
      variantClasses
    ]"
    v-bind="$attrs">
    <slot />
  </button>
</template>

<script setup lang="ts">
import { computed } from 'vue'

const props = withDefaults(defineProps<{
  variant?: 'primary' | 'secondary' | 'ghost'
  size?: 'sm' | 'md' | 'lg'
}>(), {
  variant: 'primary',
  size: 'md'
})

const sizeClasses = computed(() => ({
  sm: 'h-8 px-3 text-sm',
  md: 'h-9 px-3 text-sm',
  lg: 'h-10 px-4 text-base'
}[props.size]))

const variantClasses = computed(() => ({
  primary: 'bg-slate-900 text-white dark:bg-zinc-100 dark:text-zinc-900 hover:opacity-90',
  secondary: 'border border-slate-200 dark:border-zinc-800 hover:bg-slate-50 dark:hover:bg-zinc-900',
  ghost: 'hover:bg-slate-50 dark:hover:bg-zinc-900'
}[props.variant]))
</script>