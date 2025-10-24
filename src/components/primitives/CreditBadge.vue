<template>
  <span class="inline-flex items-center gap-2 text-xs rounded-full border border-slate-200 dark:border-zinc-800 px-2 py-1">
    <slot name="icon">
      <svg xmlns="http://www.w3.org/2000/svg" class="h-3.5 w-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M3 7h18M3 12h18M3 17h18"/></svg>
    </slot>
    <slot />
  </span>
</template>