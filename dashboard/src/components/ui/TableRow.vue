<template>
  <tr
    :class="rowClasses"
    @click="handleClick"
  >
    <slot />
  </tr>
</template>

<script setup lang="ts">
import { computed } from 'vue'

interface Props {
  clickable?: boolean
  selected?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  clickable: false,
  selected: false,
})

const emit = defineEmits<{
  click: [event: MouseEvent]
}>()

const rowClasses = computed(() => {
  const baseClasses = 'transition-colors'
  const classes = [baseClasses]

  if (props.clickable) {
    classes.push('cursor-pointer hover:bg-background-secondary')
  }

  if (props.selected) {
    classes.push('bg-primary-50 dark:bg-primary-950')
  }

  return classes.join(' ')
})

const handleClick = (event: MouseEvent) => {
  if (props.clickable) {
    emit('click', event)
  }
}
</script>
