<template>
  <Card variant="elevated" :hoverable="false" class="p-6">
    <div class="flex items-center justify-between">
      <div>
        <p class="text-sm font-medium text-foreground-secondary">{{ label }}</p>
        <p class="text-3xl font-bold text-foreground mt-2">{{ value }}</p>
        <p v-if="change !== undefined" :class="['text-sm mt-2', changeColor]">
          <span class="font-medium">{{ changeText }}</span>
          <span class="text-foreground-secondary ml-1">{{ changeLabel }}</span>
        </p>
      </div>

      <div
        v-if="icon"
        :class="[
          'w-12 h-12 rounded-lg flex items-center justify-center',
          iconBgColor
        ]"
      >
        <component :is="icon" :class="['w-6 h-6', iconColor]" />
      </div>
    </div>
  </Card>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { Card } from '@/components/ui'
import type { Component } from 'vue'

interface Props {
  label: string
  value: string | number
  change?: number
  changeLabel?: string
  icon?: Component
  variant?: 'primary' | 'success' | 'warning' | 'error' | 'info'
}

const props = withDefaults(defineProps<Props>(), {
  variant: 'primary',
  changeLabel: 'vs last month',
})

const changeText = computed(() => {
  if (props.change === undefined) return ''
  const prefix = props.change > 0 ? '+' : ''
  return `${prefix}${props.change}%`
})

const changeColor = computed(() => {
  if (props.change === undefined) return ''
  return props.change > 0 ? 'text-success' : props.change < 0 ? 'text-error' : 'text-foreground-secondary'
})

const iconBgColor = computed(() => {
  const colors = {
    primary: 'bg-primary/10',
    success: 'bg-success/10',
    warning: 'bg-warning/10',
    error: 'bg-error/10',
    info: 'bg-info/10',
  }
  return colors[props.variant]
})

const iconColor = computed(() => {
  const colors = {
    primary: 'text-primary',
    success: 'text-success',
    warning: 'text-warning',
    error: 'text-error',
    info: 'text-info',
  }
  return colors[props.variant]
})
</script>
