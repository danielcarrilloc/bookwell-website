<template>
  <teleport to="body">
    <div v-if="open" class="fixed inset-0 z-50">
      <div class="absolute inset-0 bg-black/50" @click="$emit('close')"></div>
      <div class="absolute inset-0 grid place-items-center p-4">
        <div class="w-full max-w-lg rounded-lg border border-slate-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 shadow-subtle">
          <div v-if="$slots.header" class="p-4 border-b border-slate-200 dark:border-zinc-800">
            <slot name="header"/>
          </div>
          <div class="p-4">
            <slot />
          </div>
          <div v-if="$slots.footer" class="p-4 border-t border-slate-200 dark:border-zinc-800">
            <slot name="footer"/>
          </div>
        </div>
      </div>
    </div>
  </teleport>
</template>

<script setup lang="ts">
defineProps<{ open: boolean }>()
defineEmits<{ (e: 'close'): void }>()
</script>