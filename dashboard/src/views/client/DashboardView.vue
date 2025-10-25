<template>
  <div class="space-y-6">
    <div>
      <h1 class="text-3xl font-bold text-foreground">Dashboard</h1>
      <p class="text-foreground-secondary mt-1">Welcome back, {{ authStore.currentUser?.firstName }}!</p>
    </div>

    <!-- Stats Grid -->
    <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
      <StatCard
        label="Available Credits"
        :value="stats.totalCredits"
        :icon="Ticket"
        variant="success"
      />
      <StatCard
        label="Classes This Month"
        :value="stats.classesThisMonth"
        :icon="Calendar"
        variant="primary"
      />
      <StatCard
        label="Next Class"
        value="Tomorrow"
        :icon="Clock"
        variant="info"
      />
    </div>

    <!-- Upcoming Classes -->
    <Card variant="bordered">
      <template #header>
        <div class="flex items-center justify-between">
          <h2 class="text-lg font-semibold">Upcoming Classes</h2>
          <RouterLink to="/dashboard/client/book">
            <Button variant="primary" size="sm">
              <Plus class="w-4 h-4 mr-1" />
              Book Class
            </Button>
          </RouterLink>
        </div>
      </template>

      <div v-if="isLoading" class="py-12">
        <LoadingSpinner text="Loading classes..." />
      </div>

      <EmptyState
        v-else-if="upcomingBookings.length === 0"
        :icon="Calendar"
        title="No upcoming classes"
        description="Book your first class to get started"
        action-label="Browse Classes"
        @action="$router.push('/dashboard/client/book')"
      />

      <div v-else class="space-y-3">
        <BookingCard
          v-for="booking in upcomingBookings"
          :key="booking._id"
          :booking="{
            className: typeof booking.classId === 'object' ? booking.classId.name : 'Unknown Class',
            date: booking.date,
            startTime: typeof booking.classId === 'object' ? (booking.classId.recurringSchedule?.[0]?.startTime || '') : '',
            status: booking.status,
            instructorName: getInstructorName(booking)
          }"
        >
          <template #actions>
            <Button
              v-if="booking.status === 'confirmed'"
              variant="outline"
              size="sm"
              @click="handleCancel(booking._id)"
            >
              Cancel
            </Button>
          </template>
        </BookingCard>
      </div>
    </Card>

    <!-- Credit Packages -->
    <Card variant="bordered">
      <template #header>
        <div class="flex items-center justify-between">
          <h2 class="text-lg font-semibold">My Credit Packages</h2>
          <RouterLink to="/dashboard/client/credits">
            <Button variant="ghost" size="sm">View all</Button>
          </RouterLink>
        </div>
      </template>

      <div v-if="packages.length === 0" class="py-8">
        <EmptyState
          :icon="Ticket"
          title="No active packages"
          description="Purchase a package to start booking classes"
        />
      </div>

      <div v-else class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card
          v-for="pkg in packages"
          :key="pkg._id"
          variant="elevated"
          class="p-4"
        >
          <div class="flex items-start justify-between">
            <div>
              <h3 class="font-semibold text-foreground">{{ typeof pkg.packageId === 'object' ? pkg.packageId.name : 'Package' }}</h3>
              <p class="text-sm text-foreground-secondary mt-1">
                {{ pkg.creditsRemaining }} of {{ typeof pkg.packageId === 'object' ? pkg.packageId.credits : pkg.creditsTotal }} credits remaining
              </p>
              <p v-if="pkg.expiresAt" class="text-xs text-foreground-secondary mt-2">
                Expires {{ formatDate(pkg.expiresAt) }}
              </p>
            </div>
            <CreditBadge :credits="pkg.creditsRemaining" />
          </div>
        </Card>
      </div>
    </Card>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { RouterLink } from 'vue-router'
import { Calendar, Ticket, Clock, Plus } from 'lucide-vue-next'
import { Card, Button } from '@/components/ui'
import StatCard from '@/components/shared/StatCard.vue'
import BookingCard from '@/components/shared/BookingCard.vue'
import CreditBadge from '@/components/shared/CreditBadge.vue'
import LoadingSpinner from '@/components/shared/LoadingSpinner.vue'
import EmptyState from '@/components/shared/EmptyState.vue'
import { useAuthStore } from '@/stores/auth'
import { useBookings } from '@/composables/useBookings'
import { usePackages } from '@/composables/usePackages'
import { useToast } from '@/composables/useToast'
import { formatDate } from '@/utils/format'
import type { Booking } from '@/types'

const authStore = useAuthStore()
const { bookings: upcomingBookings, isLoading, fetchBookingsByClient, cancelBooking } = useBookings()
const { clientPackages: packages, fetchClientPackages } = usePackages()
const { success, error } = useToast()

const stats = ref({
  totalCredits: 0,
  classesThisMonth: 0,
})

const getInstructorName = (booking: Booking): string => {
  if (typeof booking.classId === 'object') {
    const instructorId = booking.classId.instructorId
    if (instructorId && typeof instructorId === 'object') {
      return instructorId.businessName
    }
  }
  return 'Unknown Instructor'
}

const loadData = async () => {
  if (!authStore.currentUser?.client?._id) return

  try {
    await fetchBookingsByClient(authStore.currentUser.client._id)
    await fetchClientPackages(authStore.currentUser.client._id)

    // Calculate total credits
    stats.value.totalCredits = packages.value.reduce((sum, pkg) => sum + pkg.creditsRemaining, 0)
    stats.value.classesThisMonth = upcomingBookings.value.length
  } catch (err) {
    error('Failed to load dashboard data')
  }
}

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

onMounted(() => {
  loadData()
})
</script>
