<template>
  <section class="grid lg:grid-cols-[260px,1fr] gap-6">
    <Sidebar :active="active" @select="(v: string) => active = v" />
    <div class="space-y-6">
      <div class="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card><template #default>
          <div class="text-sm text-slate-600 dark:text-zinc-300">Active Clients</div>
          <div class="mt-2 text-2xl font-semibold tracking-tight">128</div>
        </template></Card>
        <Card><template #default>
          <div class="text-sm text-slate-600 dark:text-zinc-300">Bookings</div>
          <div class="mt-2 text-2xl font-semibold tracking-tight">342</div>
        </template></Card>
        <Card><template #default>
          <div class="text-sm text-slate-600 dark:text-zinc-300">Revenue</div>
          <div class="mt-2 text-2xl font-semibold tracking-tight">$7,920</div>
        </template></Card>
        <Card><template #default>
          <div class="text-sm text-slate-600 dark:text-zinc-300">Credits Sold</div>
          <div class="mt-2 text-2xl font-semibold tracking-tight">890</div>
        </template></Card>
      </div>

      <Card>
        <template #header>
          <div class="flex items-center justify-between">
            <div class="font-medium">Upcoming Classes</div>
            <Button variant="secondary" size="sm"><i data-lucide="plus" class="h-4 w-4"></i> New Class</Button>
          </div>
        </template>
        <div class="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
          <div class="rounded-md border border-slate-200 dark:border-zinc-800 p-3">
            <div class="text-sm font-medium">Pilates — Beginner</div>
            <div class="text-xs text-slate-600 dark:text-zinc-300 mt-1">Mon 9:00 AM • 10/20 seats</div>
          </div>
          <div class="rounded-md border border-slate-200 dark:border-zinc-800 p-3">
            <div class="text-sm font-medium">Yoga Vinyasa</div>
            <div class="text-xs text-slate-600 dark:text-zinc-300 mt-1">Tue 6:00 PM • 7/12 seats</div>
          </div>
          <div class="rounded-md border border-slate-200 dark:border-zinc-800 p-3">
            <div class="text-sm font-medium">Strength Training</div>
            <div class="text-xs text-slate-600 dark:text-zinc-300 mt-1">Wed 7:00 AM • 5/8 seats</div>
          </div>
        </div>
      </Card>

      <Card>
        <template #header><div class="font-medium">Recent Clients</div></template>
        <Table :headers="headers" :rows="rows">
          <template #cell-name="{ row }">
            <div class="flex items-center gap-2">
              <img src="https://images.unsplash.com/photo-1621619856624-42fd193a0661?w=1080&q=80" alt="" class="h-6 w-6 rounded-full" />
              <span>{{ row.name }}</span>
            </div>
          </template>
          <template #cell-credits="{ row }">
            <CreditBadge><template #default>{{ row.credits }} credits</template></CreditBadge>
          </template>
        </Table>
      </Card>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import Sidebar from '@/components/Sidebar.vue'
import Card from '@/components/primitives/Card.vue'
import Table from '@/components/primitives/Table.vue'
import Button from '@/components/primitives/Button.vue'
import CreditBadge from '@/components/primitives/CreditBadge.vue'

const active = ref('home')
const headers = [
  { key: 'name', label: 'Client' },
  { key: 'classes', label: 'Classes' },
  { key: 'credits', label: 'Credits' }
]
const rows = [
  { name: 'Jamie Lee', classes: 14, credits: 3, avatar: 'https://i.pravatar.cc/80?img=1' },
  { name: 'Chris Paul', classes: 8, credits: 6, avatar: 'https://i.pravatar.cc/80?img=2' },
  { name: 'Taylor Smith', classes: 5, credits: 1, avatar: 'https://i.pravatar.cc/80?img=3' },
]
</script>