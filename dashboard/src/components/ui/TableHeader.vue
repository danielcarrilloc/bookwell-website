<template>
  <th
    :class="headerClasses"
    :style="{ width: width }"
  >
    <div class="flex items-center gap-2">
      <slot />
      <button
        v-if="sortable"
        type="button"
        class="flex items-center justify-center w-4 h-4 text-foreground-secondary hover:text-foreground transition-colors"
        @click="handleSort"
        :aria-label="`Sort by ${sortKey}`"
      >
        <svg
          class="w-4 h-4"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            v-if="!currentSort || currentSort.order === 'asc'"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M5 15l7-7 7 7"
          />
          <path
            v-else
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </button>
    </div>
  </th>
</template>

<script setup lang="ts">
import { computed } from 'vue'

interface Props {
  align?: 'left' | 'center' | 'right'
  width?: string
  sortable?: boolean
  sortKey?: string
  currentSort?: { key: string; order: 'asc' | 'desc' }
}

const props = withDefaults(defineProps<Props>(), {
  align: 'left',
  sortable: false,
})

const emit = defineEmits<{
  sort: [key: string, order: 'asc' | 'desc']
}>()

const headerClasses = computed(() => {
  const baseClasses = 'px-4 py-3 text-sm font-semibold text-foreground'
  const alignClasses = {
    left: 'text-left',
    center: 'text-center',
    right: 'text-right',
  }

  return `${baseClasses} ${alignClasses[props.align]}`
})

const handleSort = () => {
  if (!props.sortable || !props.sortKey) return

  const newOrder =
    props.currentSort?.key === props.sortKey && props.currentSort?.order === 'asc'
      ? 'desc'
      : 'asc'

  emit('sort', props.sortKey, newOrder)
}
</script>
