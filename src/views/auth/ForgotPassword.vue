<template>
  <section class="max-w-md mx-auto">
    <div class="rounded-xl border border-slate-200 dark:border-zinc-800 overflow-hidden">
      <div class="p-5 border-b border-slate-200 dark:border-zinc-800">
        <h1 class="text-xl font-semibold tracking-tight">Reset password</h1>
        <p class="text-sm text-slate-600 dark:text-zinc-300 mt-1">We’ll email you a reset link</p>
      </div>
      <form class="p-5 grid gap-3" @submit.prevent="submit">
        <InputField label="Email" v-model="email" placeholder="you@studio.com" type="email" />
        <button class="h-10 rounded-md bg-slate-900 text-white dark:bg-zinc-100 dark:text-zinc-900 hover:opacity-90">Send link</button>
      </form>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import InputField from '@/components/primitives/InputField.vue'

const email = ref('')
function submit() {
  alert('Reset link sent to ' + email.value)
}
</script>