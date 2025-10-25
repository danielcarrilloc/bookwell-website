<template>
  <div class="space-y-6">
    <div>
      <h1 class="text-3xl font-bold text-foreground">My Credits</h1>
      <p class="text-foreground-secondary mt-1">View your credit packages and purchase history</p>
    </div>

    <!-- Total Credits -->
    <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
      <StatCard
        label="Total Credits"
        :value="totalCredits"
        :icon="Ticket"
        variant="success"
      />
      <StatCard
        label="Active Packages"
        :value="activePackages.length"
        :icon="Package"
        variant="primary"
      />
      <StatCard
        label="Credits Used"
        :value="creditsUsed"
        :icon="TrendingUp"
        variant="info"
      />
    </div>

    <!-- Active Packages -->
    <Card variant="bordered">
      <template #header>
        <h2 class="text-lg font-semibold">Active Packages</h2>
      </template>

      <div v-if="isLoading" class="py-12">
        <LoadingSpinner text="Loading packages..." />
      </div>

      <EmptyState
        v-else-if="activePackages.length === 0"
        :icon="Ticket"
        title="No active packages"
        description="Purchase a package to start booking classes"
      />

      <div v-else class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card
          v-for="pkg in activePackages"
          :key="pkg._id"
          variant="elevated"
          class="p-6"
        >
          <div class="space-y-4">
            <div class="flex items-start justify-between">
              <div>
                <h3 class="font-semibold text-foreground text-lg">
                  {{ typeof pkg.packageId === 'object' ? pkg.packageId.name : 'Package' }}
                </h3>
                <p class="text-sm text-foreground-secondary mt-1">
                  Purchased {{ formatDate(pkg.purchasedAt) }}
                </p>
              </div>
              <CreditBadge :credits="pkg.creditsRemaining" />
            </div>

            <div class="space-y-2">
              <div class="flex justify-between text-sm">
                <span class="text-foreground-secondary">Credits remaining</span>
                <span class="font-medium">{{ pkg.creditsRemaining }} / {{ typeof pkg.packageId === 'object' ? pkg.packageId.credits : pkg.creditsTotal }}</span>
              </div>

              <div class="w-full bg-background-secondary rounded-full h-2">
                <div
                  class="bg-primary h-2 rounded-full transition-all"
                  :style="{ width: `${(pkg.creditsRemaining / (typeof pkg.packageId === 'object' ? pkg.packageId.credits : pkg.creditsTotal)) * 100}%` }"
                />
              </div>

              <div v-if="pkg.expiresAt" class="flex justify-between text-sm">
                <span class="text-foreground-secondary">Expires</span>
                <span class="font-medium">{{ formatDate(pkg.expiresAt) }}</span>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </Card>

    <!-- Purchase History -->
    <Card variant="bordered">
      <template #header>
        <h2 class="text-lg font-semibold">Purchase History</h2>
      </template>

      <EmptyState
        :icon="Package"
        title="No purchases yet"
        description="Your purchase history will appear here"
      />
    </Card>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { Ticket, Package, TrendingUp } from 'lucide-vue-next'
import { Card } from '@/components/ui'
import StatCard from '@/components/shared/StatCard.vue'
import CreditBadge from '@/components/shared/CreditBadge.vue'
import LoadingSpinner from '@/components/shared/LoadingSpinner.vue'
import EmptyState from '@/components/shared/EmptyState.vue'
import { useAuthStore } from '@/stores/auth'
import { usePackages } from '@/composables/usePackages'
import { formatDate } from '@/utils/format'

const authStore = useAuthStore()
const { clientPackages: packages, isLoading, fetchClientPackages } = usePackages()

const activePackages = computed(() => {
  return packages.value.filter(pkg => pkg.creditsRemaining > 0 && pkg.status === 'active')
})

const totalCredits = computed(() => {
  return activePackages.value.reduce((sum, pkg) => sum + pkg.creditsRemaining, 0)
})

const creditsUsed = computed(() => {
  return packages.value.reduce((sum, pkg) => {
    const totalCredits = typeof pkg.packageId === 'object' ? pkg.packageId.credits : pkg.creditsTotal
    return sum + (totalCredits - pkg.creditsRemaining)
  }, 0)
})

onMounted(async () => {
  if (authStore.currentUser?.client?._id) {
    await fetchClientPackages(authStore.currentUser.client._id)
  }
})
</script>
