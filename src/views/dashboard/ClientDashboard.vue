<template>
  <section class="space-y-6">
    <Card>
      <template #header><div class="font-medium">My Credits</div></template>
      <div class="flex items-center gap-3">
        <CreditBadge><template #default>{{ credits }} credits</template></CreditBadge>
        <button @click="buy" class="h-9 px-3 rounded-md border border-slate-200 dark:border-zinc-800 hover:bg-slate-50 dark:hover:bg-zinc-900 text-sm">Buy more</button>
      </div>
      <p class="text-xs text-slate-600 dark:text-zinc-300 mt-2">Credits expire on {{ expiry }}</p>
    </Card>

    <Card>
      <template #header><div class="font-medium">Booked Classes</div></template>
      <ul class="divide-y divide-slate-200 dark:divide-zinc-800">
        <li v-for="c in booked" :key="c.id" class="py-3 flex items-center justify-between">
          <div>
            <div class="text-sm font-medium">{{ c.title }}</div>
            <div class="text-xs text-slate-600 dark:text-zinc-300">{{ c.time }}</div>
          </div>
          <button class="h-8 px-3 rounded-md border border-slate-200 dark:border-zinc-800 text-xs hover:bg-slate-50 dark:hover:bg-zinc-900">Details</button>
        </li>
      </ul>
    </Card>

    <Card>
      <template #header>
        <div class="flex items-center justify-between">
          <div class="font-medium">Find a Class</div>
          <button class="h-8 px-3 rounded-md bg-slate-900 text-white dark:bg-zinc-100 dark:text-zinc-900 text-xs hover:opacity-90">See all</button>
        </div>
      </template>
      <div class="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
        <div v-for="opt in options" :key="opt.id" class="rounded-md border border-slate-200 dark:border-zinc-800 p-3">
          <div class="text-sm font-medium">{{ opt.title }}</div>
          <div class="text-xs text-slate-600 dark:text-zinc-300 mt-1">{{ opt.time }}</div>
          <div class="mt-3 flex gap-2">
            <button class="h-8 px-3 rounded-md border border-slate-200 dark:border-zinc-800 hover:bg-slate-50 dark:hover:bg-zinc-900 text-xs">Details</button>
            <button class="h-8 px-3 rounded-md bg-slate-900 text-white dark:bg-zinc-100 dark:text-zinc-900 hover:opacity-90 text-xs">Book</button>
          </div>
        </div>
      </div>
    </Card>
  </section>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useUserStore } from '@/stores/user'
import Card from '@/components/primitives/Card.vue'
import CreditBadge from '@/components/primitives/CreditBadge.vue'
import { useCredits } from '@/composables/useCredits'

const store = useUserStore()
const credits = computed(() => store.credits)
const expiry = '2025-02-12'

const booked = [
  { id: 1, title: 'Yoga — Flow', time: 'Thu 6:30 PM' },
  { id: 2, title: 'Pilates — Core', time: 'Fri 8:00 AM' },
]
const options = [
  { id: 'a', title: 'Mobility Session', time: 'Sat 10:30 AM' },
  { id: 'b', title: 'Breathwork', time: 'Sun 9:00 AM' },
  { id: 'c', title: 'Strength — Upper', time: 'Mon 7:00 AM' },
]

const { purchaseCredits } = useCredits()
async function buy() {
  await purchaseCredits(5)
}
</script>