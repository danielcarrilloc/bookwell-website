<template>
  <div class="text-center py-12">
    <div
      class="w-16 h-16 bg-background-secondary rounded-full flex items-center justify-center mx-auto mb-4"
    >
      <component v-if="icon" :is="icon" class="w-8 h-8 text-foreground-secondary" />
    </div>

    <h3 class="text-lg font-semibold text-foreground mb-2">{{ title }}</h3>
    <p class="text-sm text-foreground-secondary mb-6 max-w-sm mx-auto">
      {{ description }}
    </p>

    <slot name="action">
      <Button v-if="actionLabel" :variant="actionVariant" @click="$emit('action')">
        {{ actionLabel }}
      </Button>
    </slot>
  </div>
</template>

<script setup lang="ts">
import { Button } from '@/components/ui'
import type { Component } from 'vue'

interface Props {
  icon?: Component
  title: string
  description: string
  actionLabel?: string
  actionVariant?: 'primary' | 'secondary' | 'outline'
}

withDefaults(defineProps<Props>(), {
  actionVariant: 'primary',
})

defineEmits<{
  action: []
}>()
</script>
