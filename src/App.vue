<template>
  <div class="min-h-screen bg-white text-slate-900 dark:bg-zinc-950 dark:text-zinc-100">
    <Navbar />
    <main class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <router-view v-slot="{ Component }">
        <transition name="fade-scale" mode="out-in">
          <component :is="Component" />
        </transition>
      </router-view>
    </main>
    <Toast />
  </div>
</template>

<script setup lang="ts">
import Navbar from '@/components/Navbar.vue'
import Toast from '@/components/primitives/Toast.vue'
</script>

<style scoped>
.fade-scale-enter-active,
.fade-scale-leave-active {
  transition: all 200ms ease;
}
.fade-scale-enter-from,
.fade-scale-leave-to {
  opacity: 0;
  transform: translateY(4px) scale(0.98);
}
</style>