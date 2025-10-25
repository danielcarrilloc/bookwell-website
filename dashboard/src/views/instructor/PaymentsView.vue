<template>
  <div class="space-y-6">
    <div>
      <h1 class="text-3xl font-bold text-foreground">Payments & Revenue</h1>
      <p class="text-foreground-secondary mt-1">Track your earnings and manage packages</p>
    </div>

    <!-- Revenue Stats -->
    <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
      <StatCard
        label="This Month"
        :value="formatCurrency(stats.thisMonth)"
        :change="stats.monthChange"
        :icon="DollarSign"
        variant="success"
      />
      <StatCard
        label="Last Month"
        :value="formatCurrency(stats.lastMonth)"
        :icon="TrendingUp"
        variant="info"
      />
      <StatCard
        label="Total Revenue"
        :value="formatCurrency(stats.total)"
        :icon="Wallet"
        variant="primary"
      />
    </div>

    <!-- Recent Payments -->
    <Card variant="bordered">
      <template #header>
        <h2 class="text-lg font-semibold">Recent Payments</h2>
      </template>

      <EmptyState
        :icon="CreditCard"
        title="No payments yet"
        description="Your payment history will appear here"
      />
    </Card>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { DollarSign, TrendingUp, Wallet, CreditCard } from 'lucide-vue-next'
import { Card } from '@/components/ui'
import StatCard from '@/components/shared/StatCard.vue'
import EmptyState from '@/components/shared/EmptyState.vue'
import { formatCurrency } from '@/utils/format'

const stats = ref({
  thisMonth: 15400,
  monthChange: 12,
  lastMonth: 13750,
  total: 187500,
})
</script>
