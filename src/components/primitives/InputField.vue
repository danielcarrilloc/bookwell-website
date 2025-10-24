<template>
  <label class="grid gap-1 text-sm">
    <span v-if="label" class="text-slate-700 dark:text-zinc-300">{{ label }}</span>
    <input
      :type="type"
      :placeholder="placeholder"
      v-model="model"
      :disabled="disabled"
      class="h-10 rounded-md border border-slate-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 px-3 outline-none focus:ring-2 ring-brand-500/30 disabled:opacity-50"
      v-bind="$attrs"
    />
    <span v-if="hint" class="text-xs text-slate-500 dark:text-zinc-400">{{ hint }}</span>
  </label>
</template>

<script setup lang="ts">
import { computed } from 'vue'
const props = withDefaults(defineProps<{
  modelValue?: string | number
  label?: string
  hint?: string
  type?: string
  placeholder?: string
  disabled?: boolean
}>(), {
  type: 'text',
  placeholder: ''
})
const emit = defineEmits(['update:modelValue'])
const model = computed({
  get: () => props.modelValue,
  set: (v) => emit('update:modelValue', v)
})
</script>