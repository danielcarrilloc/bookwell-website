<template>
  <header class="sticky top-0 z-20 border-b border-slate-200 dark:border-zinc-800 backdrop-blur bg-white/80 dark:bg-zinc-950/70">
    <div class="max-w-7xl mx-auto h-14 px-4 sm:px-6 lg:px-8 flex items-center justify-between">
      <router-link to="/landing" class="flex items-center gap-2">
        <div class="h-7 w-7 rounded-md bg-slate-900 dark:bg-zinc-100 text-white dark:text-zinc-900 grid place-items-center font-semibold tracking-tight" style="font-family: 'Plus Jakarta Sans', Inter, sans-serif;">WB</div>
        <span class="hidden sm:block text-sm text-slate-600 dark:text-zinc-300">Wellness Booking</span>
      </router-link>
      <nav class="hidden md:flex items-center gap-6 text-sm">
        <router-link to="/landing" class="text-slate-600 dark:text-zinc-300 hover:text-slate-900 dark:hover:text-zinc-100">Home</router-link>
        <router-link to="/dashboard/instructor" class="text-slate-600 dark:text-zinc-300 hover:text-slate-900 dark:hover:text-zinc-100">Instructor</router-link>
        <router-link to="/dashboard/client" class="text-slate-600 dark:text-zinc-300 hover:text-slate-900 dark:hover:text-zinc-100">Client</router-link>
      </nav>
      <div class="flex items-center gap-2">
        <ThemeToggle />
        <router-link to="/auth/login" class="h-9 px-3 rounded-md border border-slate-200 dark:border-zinc-800 hover:bg-slate-50 dark:hover:bg-zinc-900 text-sm">Sign in</router-link>
        <router-link to="/auth/register" class="h-9 px-3 rounded-md bg-slate-900 text-white dark:bg-zinc-100 dark:text-zinc-900 hover:opacity-90 text-sm">Start Free</router-link>
      </div>
    </div>
  </header>
</template>

<script setup lang="ts">
import ThemeToggle from '@/components/ThemeToggle.vue'
</script>