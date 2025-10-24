<template>
  <teleport to="body">
    <div class="fixed bottom-4 right-4 space-y-2 z-50">
      <transition-group name="list" tag="div">
        <div v-for="t in toasts" :key="t.id"
          class="rounded-md border border-slate-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 shadow-subtle px-3 py-2 text-sm flex items-center gap-2">
          <component :is="t.icon" class="h-4 w-4"/>
          <span>{{ t.message }}</span>
        </div>
      </transition-group>
    </div>
  </teleport>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { CheckCircle2, AlertTriangle } from 'lucide-vue-next'

interface ToastItem { id: number; message: string; type: 'success'|'error'; icon: any }
const toasts = ref<ToastItem[]>([])

let id = 0
export function showToast(message: string, type: ToastItem['type'] = 'success') {
  const icon = type === 'success' ? CheckCircle2 : AlertTriangle
  const t = { id: id++, message, type, icon }
  toasts.value.push(t)
  setTimeout(() => { toasts.value = toasts.value.filter(x => x.id !== t.id) }, 3000)
}
</script>

<style scoped>
.list-enter-active, .list-leave-active { transition: all .2s ease; }
.list-enter-from, .list-leave-to { opacity: 0; transform: translateY(6px); }
</style>