<template>
  <div class="space-y-6">
    <div class="flex items-center justify-between">
      <div>
        <h1 class="text-3xl font-bold text-foreground">Classes</h1>
        <p class="text-foreground-secondary mt-1">Manage your class schedule</p>
      </div>
      <Button variant="primary" @click="showCreateModal = true">
        <Plus class="w-4 h-4 mr-2" />
        New Class
      </Button>
    </div>

    <div v-if="isLoading" class="py-12">
      <LoadingSpinner text="Loading classes..." />
    </div>

    <EmptyState
      v-else-if="classes.length === 0"
      :icon="Calendar"
      title="No classes yet"
      description="Create your first class to get started"
      action-label="Create Class"
      @action="showCreateModal = true"
    />

    <div v-else class="space-y-4">
      <ClassCard
        v-for="cls in classes"
        :key="cls._id"
        :class-data="{
          name: cls.name,
          description: cls.description,
          date: new Date(),
          startTime: cls.recurringSchedule?.[0]?.startTime || '10:00',
          duration: cls.duration,
          maxCapacity: cls.maxCapacity,
          currentBookings: 0
        }"
      >
        <template #actions>
          <div class="flex gap-2">
            <Button variant="ghost" size="sm" @click="handleEdit(cls)">
              <Edit class="w-4 h-4" />
            </Button>
            <Button variant="ghost" size="sm" @click="handleDelete(cls._id)">
              <Trash class="w-4 h-4 text-error" />
            </Button>
          </div>
        </template>
      </ClassCard>
    </div>

    <!-- Create/Edit Modal would go here -->
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { Calendar, Plus, Edit, Trash } from 'lucide-vue-next'
import { Button } from '@/components/ui'
import ClassCard from '@/components/shared/ClassCard.vue'
import LoadingSpinner from '@/components/shared/LoadingSpinner.vue'
import EmptyState from '@/components/shared/EmptyState.vue'
import { useClasses } from '@/composables/useClasses'
import { useToast } from '@/composables/useToast'

const { classes, isLoading, fetchMyClasses, deleteClass } = useClasses()
const { success, error } = useToast()
const showCreateModal = ref(false)

const handleEdit = (cls: any) => {
  // TODO: Implement edit modal
  console.log('Edit class:', cls)
}

const handleDelete = async (id: string) => {
  if (!confirm('Are you sure you want to delete this class?')) return

  try {
    await deleteClass(id)
    success('Class deleted successfully')
    await fetchMyClasses()
  } catch (err) {
    error('Failed to delete class')
  }
}

onMounted(() => {
  fetchMyClasses()
})
</script>
