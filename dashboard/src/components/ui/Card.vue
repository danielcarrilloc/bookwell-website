<template>
  <div :class="cardClasses">
    <div v-if="$slots.header || title" class="card-header border-b border-border pb-4 mb-4">
      <slot name="header">
        <h3 class="text-lg font-semibold text-foreground">{{ title }}</h3>
        <p v-if="description" class="text-sm text-foreground-secondary mt-1">
          {{ description }}
        </p>
      </slot>
    </div>

    <div class="card-body">
      <slot />
    </div>

    <div v-if="$slots.footer" class="card-footer border-t border-border pt-4 mt-4">
      <slot name="footer" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

interface Props {
  title?: string
  description?: string
  padding?: 'none' | 'sm' | 'md' | 'lg'
  variant?: 'default' | 'bordered' | 'elevated' | 'flat'
  hover?: boolean
  clickable?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  padding: 'md',
  variant: 'default',
  hover: false,
  clickable: false,
})

const baseClasses = 'card bg-background rounded-lg transition-all duration-200'

const variantClasses = computed(() => {
  const classes = {
    default: 'border border-border shadow-sm',
    bordered: 'border-2 border-border',
    elevated: 'border border-border shadow-lg',
    flat: 'border border-border',
  }
  return classes[props.variant]
})

const paddingClasses = computed(() => {
  const classes = {
    none: 'p-0',
    sm: 'p-3',
    md: 'p-6',
    lg: 'p-8',
  }
  return classes[props.padding]
})

const interactionClasses = computed(() => {
  const classes = []

  if (props.hover) {
    classes.push('hover:shadow-md hover:border-primary-300')
  }

  if (props.clickable) {
    classes.push('cursor-pointer hover:shadow-md hover:border-primary-300')
  }

  return classes.join(' ')
})

const cardClasses = computed(() => {
  return [
    baseClasses,
    variantClasses.value,
    paddingClasses.value,
    interactionClasses.value,
  ].join(' ')
})
</script>
