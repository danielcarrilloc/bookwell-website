<template>
  <div class="space-y-6">
    <div>
      <h1 class="text-3xl font-bold text-foreground">Dashboard</h1>
      <p class="text-foreground-secondary mt-1">Welcome back, {{ authStore.currentUser?.firstName }}!</p>
    </div>

    <!-- Stats Grid -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      <StatCard
        label="Total Bookings"
        :value="stats.totalBookings"
        :change="stats.bookingsChange"
        :icon="Calendar"
        variant="primary"
      />
      <StatCard
        label="Active Clients"
        :value="stats.activeClients"
        :change="stats.clientsChange"
        :icon="Users"
        variant="success"
      />
      <StatCard
        label="Revenue (Month)"
        :value="formatCurrency(stats.monthlyRevenue)"
        :change="stats.revenueChange"
        :icon="DollarSign"
        variant="info"
      />
      <StatCard
        label="Classes This Week"
        :value="stats.classesThisWeek"
        :icon="BookOpen"
        variant="warning"
      />
    </div>

    <!-- Recent Bookings -->
    <Card variant="bordered">
      <template #header>
        <div class="flex items-center justify-between">
          <h2 class="text-lg font-semibold">Recent Bookings</h2>
          <RouterLink to="/dashboard/instructor/classes">
            <Button variant="ghost" size="sm">View all</Button>
          </RouterLink>
        </div>
      </template>

      <div v-if="isLoadingBookings" class="py-12">
        <LoadingSpinner text="Loading bookings..." />
      </div>

      <EmptyState
        v-else-if="recentBookings.length === 0"
        :icon="Calendar"
        title="No bookings yet"
        description="Your recent bookings will appear here"
      />

      <div v-else class="space-y-3">
        <BookingCard
          v-for="booking in recentBookings"
          :key="booking._id"
          :booking="{
            className: booking.classId?.name || 'Unknown Class',
            date: booking.date,
            startTime: booking.classId?.startTime || '',
            status: booking.status,
            clientName: booking.clientId ? `${booking.clientId.firstName} ${booking.clientId.lastName}` : 'Unknown Client'
          }"
        >
          <template #actions>
            <Button
              v-if="booking.status === 'confirmed'"
              variant="outline"
              size="sm"
              @click="handleCheckIn(booking._id)"
            >
              Check In
            </Button>
          </template>
        </BookingCard>
      </div>
    </Card>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { RouterLink } from 'vue-router'
import { Calendar, Users, DollarSign, BookOpen } from 'lucide-vue-next'
import { Card, Button } from '@/components/ui'
import StatCard from '@/components/shared/StatCard.vue'
import BookingCard from '@/components/shared/BookingCard.vue'
import LoadingSpinner from '@/components/shared/LoadingSpinner.vue'
import EmptyState from '@/components/shared/EmptyState.vue'
import { useAuthStore } from '@/stores/auth'
import { useBookings } from '@/composables/useBookings'
import { useToast } from '@/composables/useToast'
import { formatCurrency } from '@/utils/format'

const authStore = useAuthStore()
const { bookings, isLoading: isLoadingBookings, fetchBookingsByInstructor, checkIn } = useBookings()
const { success, error } = useToast()

const stats = ref({
  totalBookings: 0,
  bookingsChange: 0,
  activeClients: 0,
  clientsChange: 0,
  monthlyRevenue: 0,
  revenueChange: 0,
  classesThisWeek: 0,
})

const recentBookings = ref<any[]>([])

const loadData = async () => {
  if (!authStore.currentUser?.instructor?._id) return

  try {
    await fetchBookingsByInstructor(authStore.currentUser.instructor._id)
    recentBookings.value = bookings.value.slice(0, 5)

    // Calculate stats (placeholder - would come from API)
    stats.value = {
      totalBookings: bookings.value.length,
      bookingsChange: 12,
      activeClients: 45,
      clientsChange: 8,
      monthlyRevenue: 15400,
      revenueChange: 15,
      classesThisWeek: 12,
    }
  } catch (err) {
    error('Failed to load dashboard data')
  }
}

const handleCheckIn = async (bookingId: string) => {
  try {
    await checkIn(bookingId)
    success('Check-in successful')
    await loadData()
  } catch (err) {
    error('Failed to check in')
  }
}

onMounted(() => {
  loadData()
})
</script>
