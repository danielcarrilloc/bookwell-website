<template>
  <section class="max-w-md mx-auto">
    <div class="rounded-xl border border-slate-200 dark:border-zinc-800 overflow-hidden">
      <div class="p-5 border-b border-slate-200 dark:border-zinc-800">
        <h1 class="text-xl font-semibold tracking-tight">Create account</h1>
        <p class="text-sm text-slate-600 dark:text-zinc-300 mt-1">Start managing your studio</p>
      </div>
      <form class="p-5 grid gap-3" @submit.prevent="submit">
        <InputField label="Name" v-model="name" placeholder="Alex Doe" />
        <InputField label="Email" v-model="email" placeholder="you@studio.com" type="email" />
        <InputField label="Password" v-model="password" type="password" />
        <label class="text-sm">
          <span class="text-slate-700 dark:text-zinc-300">Role</span>
          <select v-model="role" class="mt-1 h-10 w-full rounded-md border border-slate-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 px-3 outline-none focus:ring-2 ring-brand-500/30">
            <option value="client">Client</option>
            <option value="instructor">Instructor</option>
          </select>
        </label>
        <button class="h-10 rounded-md bg-slate-900 text-white dark:bg-zinc-100 dark:text-zinc-900 hover:opacity-90">Create account</button>
        <div class="text-xs text-slate-600 dark:text-zinc-300">
          Already have an account?
          <router-link to="/auth/login" class="underline underline-offset-2">Sign in</router-link>
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

const name = ref('')
const email = ref('')
const password = ref('')
const role = ref<'client' | 'instructor'>('client')
const { register } = useAuth()
const router = useRouter()

async function submit() {
  const ok = await register({ name: name.value, email: email.value, password: password.value, role: role.value })
  if (ok) router.push({ name: role.value === 'instructor' ? 'InstructorDashboard' : 'ClientDashboard' })
}
</script>