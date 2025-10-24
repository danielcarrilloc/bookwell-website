<template>
  <div class="w-full overflow-x-auto">
    <table class="w-full border-collapse">
      <thead class="bg-background-secondary border-b border-border">
        <tr>
          <slot name="header" />
        </tr>
      </thead>
      <tbody class="divide-y divide-border">
        <slot />
      </tbody>
    </table>

    <div
      v-if="$slots.empty && !hasRows"
      class="py-12 text-center text-foreground-secondary"
    >
      <slot name="empty" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, useSlots } from 'vue'

const slots = useSlots()

const hasRows = computed(() => {
  return slots.default && slots.default().length > 0
})
</script>
