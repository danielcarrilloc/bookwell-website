<template>
  <Card variant="bordered" class="p-4">
    <div class="flex items-start justify-between">
      <div class="flex-1">
        <div class="flex items-center gap-2">
          <h3 class="font-semibold text-foreground">{{ booking.className }}</h3>
          <Badge :variant="statusVariant" size="sm">
            {{ booking.status }}
          </Badge>
        </div>

        <div class="space-y-1 mt-2">
          <div class="flex items-center gap-2 text-sm text-foreground-secondary">
            <Calendar class="w-4 h-4" />
            <span>{{ formatDate(booking.date) }} at {{ booking.startTime }}</span>
          </div>

          <div v-if="booking.instructorName" class="flex items-center gap-2 text-sm text-foreground-secondary">
            <User class="w-4 h-4" />
            <span>{{ booking.instructorName }}</span>
          </div>

          <div v-if="booking.clientName" class="flex items-center gap-2 text-sm text-foreground-secondary">
            <User class="w-4 h-4" />
            <span>{{ booking.clientName }}</span>
          </div>
        </div>
      </div>

      <slot name="actions" />
    </div>
  </Card>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { Calendar, User } from 'lucide-vue-next'
import { Card, Badge } from '@/components/ui'
import { formatDate } from '@/utils/format'

interface Booking {
  className: string
  date: string | Date
  startTime: string
  status: string
  instructorName?: string
  clientName?: string
}

interface Props {
  booking: Booking
}

const props = defineProps<Props>()

const statusVariant = computed(() => {
  const status = props.booking.status.toLowerCase()
  if (status === 'confirmed') return 'success'
  if (status === 'cancelled') return 'error'
  if (status === 'completed') return 'info'
  if (status === 'no-show') return 'warning'
  return 'default'
})
</script>
