<template>
  <div :class="['flex items-center justify-center', containerClass]">
    <div
      :class="[
        'animate-spin rounded-full border-2 border-border border-t-primary',
        sizeClass
      ]"
    />
    <span v-if="text" class="ml-3 text-sm text-foreground-secondary">
      {{ text }}
    </span>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

interface Props {
  size?: 'sm' | 'md' | 'lg'
  text?: string
  containerClass?: string
}

const props = withDefaults(defineProps<Props>(), {
  size: 'md',
})

const sizeClass = computed(() => {
  const sizes = {
    sm: 'w-4 h-4',
    md: 'w-8 h-8',
    lg: 'w-12 h-12',
  }
  return sizes[props.size]
})
</script>
