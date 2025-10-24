<template>
  <div class="overflow-x-auto rounded-lg border border-slate-200 dark:border-zinc-800">
    <table class="min-w-full text-sm">
      <thead class="bg-slate-50 dark:bg-zinc-900/60 text-slate-700 dark:text-zinc-300">
        <tr>
          <th v-for="h in headers" :key="h.key" class="text-left font-medium px-4 py-2 whitespace-nowrap">{{ h.label }}</th>
        </tr>
      </thead>
      <tbody class="divide-y divide-slate-200 dark:divide-zinc-800">
        <tr v-for="(row, idx) in rows" :key="idx" class="hover:bg-slate-50 dark:hover:bg-zinc-900">
          <td v-for="h in headers" :key="h.key" class="px-4 py-2 whitespace-nowrap">
            <slot :name="`cell-${h.key}`" :row="row">{{ row[h.key] }}</slot>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup lang="ts">
interface Header { key: string; label: string }
defineProps<{ headers: Header[]; rows: any[] }>()
</script>