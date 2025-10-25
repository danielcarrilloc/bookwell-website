<template>
  <div class="space-y-6">
    <div>
      <h1 class="text-3xl font-bold text-foreground">My Classes</h1>
      <p class="text-foreground-secondary mt-1">View and manage your bookings</p>
    </div>

    <!-- Filter Tabs -->
    <div class="flex gap-2 border-b border-border">
      <button
        v-for="tab in tabs"
        :key="tab.value"
        @click="activeTab = tab.value"
        :class="[
          'px-4 py-2 font-medium text-sm transition-colors',
          activeTab === tab.value
            ? 'text-primary border-b-2 border-primary'
            : 'text-foreground-secondary hover:text-foreground'
        ]"
      >
        {{ tab.label }}
      </button>
    </div>

    <div v-if="isLoading" class="py-12">
      <LoadingSpinner text="Loading bookings..." />
    </div>

    <EmptyState
      v-else-if="filteredBookings.length === 0"
      :icon="Calendar"
      :title="`No ${activeTab} classes`"
      description="Your bookings will appear here"
      action-label="Book a Class"
      @action="$router.push('/dashboard/client/book')"
    />

    <div v-else class="space-y-3">
      <BookingCard
        v-for="booking in filteredBookings"
        :key="booking._id"
        :booking="{
          className: booking.classId?.name || 'Unknown Class',
          date: booking.date,
          startTime: booking.classId?.startTime || '',
          status: booking.status,
          instructorName: booking.classId?.instructorId?.businessName || 'Unknown Instructor'
        }"
      >
        <template #actions>
          <Button
            v-if="booking.status === 'confirmed' && activeTab === 'upcoming'"
            variant="outline"
            size="sm"
            @click="handleCancel(booking._id)"
          >
            Cancel
          </Button>
        </template>
      </BookingCard>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { Calendar } from 'lucide-vue-next'
import { Button } from '@/components/ui'
import BookingCard from '@/components/shared/BookingCard.vue'
import LoadingSpinner from '@/components/shared/LoadingSpinner.vue'
import EmptyState from '@/components/shared/EmptyState.vue'
import { useAuthStore } from '@/stores/auth'
import { useBookings } from '@/composables/useBookings'
import { useToast } from '@/composables/useToast'

const authStore = useAuthStore()
const { bookings, isLoading, fetchBookingsByClient, cancelBooking } = useBookings()
const { success, error } = useToast()

const activeTab = ref('upcoming')

const tabs = [
  { label: 'Upcoming', value: 'upcoming' },
  { label: 'Past', value: 'past' },
  { label: 'Cancelled', value: 'cancelled' },
]

const filteredBookings = computed(() => {
  const now = new Date()
  return bookings.value.filter(booking => {
    if (activeTab.value === 'upcoming') {
      return booking.status === 'confirmed' && new Date(booking.date) >= now
    }
    if (activeTab.value === 'past') {
      return booking.status === 'completed' || (booking.status === 'confirmed' && new Date(booking.date) < now)
    }
    if (activeTab.value === 'cancelled') {
      return booking.status === 'cancelled'
    }
    return false
  })
})

const handleCancel = async (bookingId: string) => {
  if (!confirm('Are you sure you want to cancel this booking?')) return

  try {
    await cancelBooking(bookingId, 'Client cancelled')
    success('Booking cancelled successfully')
    await loadData()
  } catch (err) {
    error('Failed to cancel booking')
  }
}

const loadData = async () => {
  if (!authStore.currentUser?.client?._id) return
  await fetchBookingsByClient(authStore.currentUser.client._id)
}

onMounted(() => {
  loadData()
})
</script>
