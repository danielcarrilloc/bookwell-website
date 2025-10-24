<template>
  <section class="max-w-md mx-auto">
    <div class="rounded-xl border border-slate-200 dark:border-zinc-800 overflow-hidden">
      <div class="p-5 border-b border-slate-200 dark:border-zinc-800">
        <h1 class="text-xl font-semibold tracking-tight">Sign in</h1>
        <p class="text-sm text-slate-600 dark:text-zinc-300 mt-1">Welcome back</p>
      </div>
      <form class="p-5 grid gap-3" @submit.prevent="submit">
        <InputField label="Email" v-model="email" placeholder="you@studio.com" type="email" />
        <InputField label="Password" v-model="password" type="password" />
        <button class="h-10 rounded-md bg-slate-900 text-white dark:bg-zinc-100 dark:text-zinc-900 hover:opacity-90">Sign in</button>
        <div class="text-xs text-slate-600 dark:text-zinc-300">
          <router-link to="/auth/forgot" class="underline underline-offset-2">Forgot password?</router-link>
        </div>
      </form>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import InputField from '@/components/primitives/InputField.vue'
import { useAuth } from '@/composables/useAuth'

const email = ref('')
const password = ref('')
const router = useRouter()
const { login } = useAuth()

async function submit() {
  const ok = await login(email.value, password.value)
  if (ok) router.push({ name: 'ClientDashboard' })
}
</script>