<template>
  <Card variant="bordered" :hoverable="true" class="p-4">
    <div class="flex items-start justify-between">
      <div class="flex-1">
        <h3 class="font-semibold text-foreground">{{ classData.name }}</h3>
        <p v-if="classData.description" class="text-sm text-foreground-secondary mt-1 line-clamp-2">
          {{ classData.description }}
        </p>

        <div class="flex flex-wrap gap-2 mt-3">
          <Badge variant="default" size="sm">
            <Calendar class="w-3 h-3 mr-1" />
            {{ formatDate(classData.date) }}
          </Badge>

          <Badge variant="default" size="sm">
            <Clock class="w-3 h-3 mr-1" />
            {{ classData.startTime }}
          </Badge>

          <Badge v-if="classData.duration" variant="default" size="sm">
            {{ classData.duration }} min
          </Badge>

          <Badge v-if="classData.maxCapacity" variant="info" size="sm">
            <Users class="w-3 h-3 mr-1" />
            {{ classData.currentBookings || 0 }}/{{ classData.maxCapacity }}
          </Badge>
        </div>
      </div>

      <slot name="actions" />
    </div>
  </Card>
</template>

<script setup lang="ts">
import { Calendar, Clock, Users } from 'lucide-vue-next'
import { Card, Badge } from '@/components/ui'
import { formatDate } from '@/utils/format'

interface ClassData {
  name: string
  description?: string
  date: string | Date
  startTime: string
  duration?: number
  maxCapacity?: number
  currentBookings?: number
}

interface Props {
  classData: ClassData
}

defineProps<Props>()
</script>
