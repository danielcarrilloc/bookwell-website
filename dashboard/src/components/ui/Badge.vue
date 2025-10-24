<template>
  <span :class="badgeClasses">
    <component
      v-if="icon"
      :is="icon"
      class="w-3.5 h-3.5"
    />
    <slot />
  </span>
</template>

<script setup lang="ts">
import { computed } from 'vue'

interface Props {
  variant?: 'default' | 'primary' | 'success' | 'warning' | 'error' | 'info'
  size?: 'sm' | 'md' | 'lg'
  dot?: boolean
  icon?: any
}

const props = withDefaults(defineProps<Props>(), {
  variant: 'default',
  size: 'md',
  dot: false,
})

const baseClasses = 'inline-flex items-center gap-1 font-medium rounded-full transition-colors'

const variantClasses = computed(() => {
  const classes = {
    default: 'bg-background-secondary text-foreground border border-border',
    primary: 'bg-primary-100 text-primary-700 dark:bg-primary-900 dark:text-primary-300',
    success: 'bg-success-light text-success-dark',
    warning: 'bg-warning-light text-warning-dark',
    error: 'bg-error-light text-error-dark',
    info: 'bg-info-light text-info-dark',
  }
  return classes[props.variant]
})

const sizeClasses = computed(() => {
  if (props.dot) {
    return {
      sm: 'w-2 h-2',
      md: 'w-2.5 h-2.5',
      lg: 'w-3 h-3',
    }[props.size]
  }

  return {
    sm: 'px-2 py-0.5 text-xs',
    md: 'px-2.5 py-1 text-sm',
    lg: 'px-3 py-1.5 text-base',
  }[props.size]
})

const badgeClasses = computed(() => {
  if (props.dot) {
    return [variantClasses.value, sizeClasses].join(' ')
  }

  return [baseClasses, variantClasses.value, sizeClasses].join(' ')
})
</script>
