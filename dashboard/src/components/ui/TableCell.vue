<template>
  <td
    :class="cellClasses"
    :style="{ width: width }"
  >
    <slot />
  </td>
</template>

<script setup lang="ts">
import { computed } from 'vue'

interface Props {
  align?: 'left' | 'center' | 'right'
  width?: string
}

const props = withDefaults(defineProps<Props>(), {
  align: 'left',
})

const cellClasses = computed(() => {
  const baseClasses = 'px-4 py-3 text-sm text-foreground'
  const alignClasses = {
    left: 'text-left',
    center: 'text-center',
    right: 'text-right',
  }

  return `${baseClasses} ${alignClasses[props.align]}`
})
</script>
