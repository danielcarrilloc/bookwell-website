<template>
  <div class="min-h-screen bg-background">
    <Navbar />

    <div class="flex">
      <Sidebar />

      <main
        :class="[
          'flex-1 container-padding py-6 transition-all duration-300',
          'lg:ml-0',
          appStore.sidebarOpen ? 'lg:pl-64' : ''
        ]"
      >
        <RouterView v-slot="{ Component }">
          <Transition name="fade" mode="out-in">
            <component :is="Component" />
          </Transition>
        </RouterView>
      </main>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import { RouterView } from 'vue-router'
import { useAppStore } from '@/stores/app'
import Navbar from '@/components/shared/Navbar.vue'
import Sidebar from '@/components/shared/Sidebar.vue'

const appStore = useAppStore()

onMounted(() => {
  appStore.initTheme()
})
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
