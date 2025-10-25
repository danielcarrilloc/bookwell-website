<template>
  <Badge :variant="variant">
    <Ticket class="w-3 h-3 mr-1" />
    {{ credits }} {{ credits === 1 ? 'credit' : 'credits' }}
  </Badge>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { Ticket } from 'lucide-vue-next'
import { Badge } from '@/components/ui'

interface Props {
  credits: number
  lowThreshold?: number
}

const props = withDefaults(defineProps<Props>(), {
  lowThreshold: 3,
})

const variant = computed(() => {
  if (props.credits === 0) return 'error'
  if (props.credits <= props.lowThreshold) return 'warning'
  return 'success'
})
</script>
