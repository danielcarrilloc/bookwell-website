<template>
  <div class="rounded-lg border border-slate-200 dark:border-zinc-800 bg-white dark:bg-zinc-950">
    <div v-if="$slots.header" class="p-4 border-b border-slate-200 dark:border-zinc-800">
      <slot name="header" />
    </div>
    <div class="p-4">
      <slot />
    </div>
    <div v-if="$slots.footer" class="p-4 border-t border-slate-200 dark:border-zinc-800">
      <slot name="footer" />
    </div>
  </div>
</template>