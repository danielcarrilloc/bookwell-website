<template>
  <div class="space-y-6">
    <div>
      <h1 class="text-3xl font-bold text-foreground">Clients</h1>
      <p class="text-foreground-secondary mt-1">Manage your client list and credits</p>
    </div>

    <Card variant="bordered">
      <div v-if="isLoading" class="py-12">
        <LoadingSpinner text="Loading clients..." />
      </div>

      <EmptyState
        v-else-if="clients.length === 0"
        :icon="Users"
        title="No clients yet"
        description="Your clients will appear here when they book classes"
      />

      <div v-else class="overflow-x-auto">
        <table class="w-full">
          <thead class="border-b border-border">
            <tr>
              <th class="text-left py-3 px-4 text-sm font-medium text-foreground">Name</th>
              <th class="text-left py-3 px-4 text-sm font-medium text-foreground">Email</th>
              <th class="text-left py-3 px-4 text-sm font-medium text-foreground">Phone</th>
              <th class="text-left py-3 px-4 text-sm font-medium text-foreground">Credits</th>
              <th class="text-left py-3 px-4 text-sm font-medium text-foreground">Last Booking</th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="client in clients"
              :key="client._id"
              class="border-b border-border hover:bg-background-secondary transition-colors"
            >
              <td class="py-3 px-4 text-sm">{{ client.firstName }} {{ client.lastName }}</td>
              <td class="py-3 px-4 text-sm text-foreground-secondary">{{ client.email }}</td>
              <td class="py-3 px-4 text-sm text-foreground-secondary">{{ client.phone }}</td>
              <td class="py-3 px-4">
                <CreditBadge :credits="client.totalCredits || 0" />
              </td>
              <td class="py-3 px-4 text-sm text-foreground-secondary">
                {{ client.lastBooking ? formatDate(client.lastBooking) : 'Never' }}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </Card>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { Users } from 'lucide-vue-next'
import { Card } from '@/components/ui'
import CreditBadge from '@/components/shared/CreditBadge.vue'
import LoadingSpinner from '@/components/shared/LoadingSpinner.vue'
import EmptyState from '@/components/shared/EmptyState.vue'
import { useAuthStore } from '@/stores/auth'
import { httpClient } from '@/utils/http-client'
import { formatDate } from '@/utils/format'

const authStore = useAuthStore()
const clients = ref<any[]>([])
const isLoading = ref(false)

const loadClients = async () => {
  if (!authStore.currentUser?.instructor?._id) return

  try {
    isLoading.value = true
    // This endpoint would need to be created on the backend
    // For now, it's a placeholder
    const response = await httpClient.get<any[]>(`/clients/instructor/${authStore.currentUser.instructor._id}`)
    clients.value = Array.isArray(response) ? response : []
  } catch (err) {
    console.error('Failed to load clients:', err)
    clients.value = []
  } finally {
    isLoading.value = false
  }
}

onMounted(() => {
  loadClients()
})
</script>
