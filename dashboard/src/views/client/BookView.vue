<template>
  <div class="space-y-6">
    <div>
      <h1 class="text-3xl font-bold text-foreground">Book a Class</h1>
      <p class="text-foreground-secondary mt-1">Browse and book available classes</p>
    </div>

    <!-- Search and Filters -->
    <Card variant="bordered" class="p-4">
      <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Input
          v-model="searchQuery"
          placeholder="Search classes..."
          :icon-left="Search"
        />

        <Input
          v-model="selectedDate"
          type="date"
          label="Date"
        />

        <div>
          <label class="text-sm font-medium text-foreground block mb-2">Type</label>
          <select
            v-model="selectedType"
            class="w-full px-3 py-2 border border-border rounded-md bg-background text-foreground"
          >
            <option value="">All Types</option>
            <option value="yoga">Yoga</option>
            <option value="pilates">Pilates</option>
            <option value="fitness">Fitness</option>
          </select>
        </div>
      </div>
    </Card>

    <!-- Available Classes -->
    <div v-if="isLoading" class="py-12">
      <LoadingSpinner text="Loading classes..." />
    </div>

    <EmptyState
      v-else-if="filteredClasses.length === 0"
      :icon="Calendar"
      title="No classes available"
      description="Try adjusting your filters or check back later"
    />

    <div v-else class="grid grid-cols-1 md:grid-cols-2 gap-4">
      <ClassCard
        v-for="cls in filteredClasses"
        :key="cls._id"
        :class-data="{
          name: cls.name,
          description: cls.description,
          date: selectedDate || new Date(),
          startTime: cls.recurringSchedule?.[0]?.startTime || '10:00',
          duration: cls.duration,
          maxCapacity: cls.maxCapacity,
          currentBookings: 0
        }"
      >
        <template #actions>
          <Button
            variant="primary"
            size="sm"
            @click="handleBook(cls)"
            :disabled="totalCredits === 0"
          >
            <Plus class="w-4 h-4 mr-1" />
            Book
          </Button>
        </template>
      </ClassCard>
    </div>

    <!-- Credits Warning -->
    <Card v-if="totalCredits === 0" variant="bordered" class="bg-warning/5 border-warning">
      <div class="flex items-start gap-3 p-4">
        <AlertCircle class="w-5 h-5 text-warning flex-shrink-0 mt-0.5" />
        <div>
          <h3 class="font-semibold text-foreground">No credits available</h3>
          <p class="text-sm text-foreground-secondary mt-1">
            You need to purchase a credit package before you can book classes.
          </p>
          <RouterLink to="/dashboard/client/credits">
            <Button variant="outline" size="sm" class="mt-3">
              View Packages
            </Button>
          </RouterLink>
        </div>
      </div>
    </Card>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { RouterLink } from 'vue-router'
import { Calendar, Search, Plus, AlertCircle } from 'lucide-vue-next'
import { Card, Input, Button } from '@/components/ui'
import ClassCard from '@/components/shared/ClassCard.vue'
import LoadingSpinner from '@/components/shared/LoadingSpinner.vue'
import EmptyState from '@/components/shared/EmptyState.vue'
import { useClasses } from '@/composables/useClasses'
import { usePackages } from '@/composables/usePackages'
import { useAuthStore } from '@/stores/auth'
import { useToast } from '@/composables/useToast'

const authStore = useAuthStore()
const { classes, isLoading, fetchAllClasses } = useClasses()
const { clientPackages: packages, fetchClientPackages } = usePackages()
const { success, error } = useToast()

const searchQuery = ref('')
const selectedDate = ref('')
const selectedType = ref('')

const totalCredits = computed(() => {
  return packages.value.reduce((sum, pkg) => sum + pkg.creditsRemaining, 0)
})

const filteredClasses = computed(() => {
  return classes.value.filter(cls => {
    if (searchQuery.value && !cls.name.toLowerCase().includes(searchQuery.value.toLowerCase())) {
      return false
    }
    if (selectedType.value && cls.type !== selectedType.value) {
      return false
    }
    return cls.isActive
  })
})

const handleBook = (cls: any) => {
  // TODO: Implement booking modal
  console.log('Book class:', cls)
  success('Booking feature coming soon!')
}

onMounted(async () => {
  await fetchAllClasses()
  if (authStore.currentUser?.client?._id) {
    await fetchClientPackages(authStore.currentUser.client._id)
  }
})
</script>
