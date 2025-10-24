<template>
  <Teleport to="body">
    <div class="fixed top-4 right-4 z-toast flex flex-col gap-2 max-w-sm">
      <TransitionGroup name="toast">
        <div
          v-for="toast in toasts"
          :key="toast.id"
          :class="toastClasses(toast.type)"
          role="alert"
        >
          <div class="flex items-start gap-3">
            <div class="flex-shrink-0">
              <component :is="getIcon(toast.type)" class="w-5 h-5" />
            </div>

            <div class="flex-1 min-w-0">
              <p class="font-semibold text-sm">{{ toast.title }}</p>
              <p v-if="toast.message" class="text-sm mt-1 opacity-90">
                {{ toast.message }}
              </p>
            </div>

            <button
              type="button"
              class="flex-shrink-0 p-1 rounded hover:bg-black/10 transition-colors"
              @click="removeToast(toast.id)"
              aria-label="Close notification"
            >
              <svg
                class="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
        </div>
      </TransitionGroup>
    </div>
  </Teleport>
</template>

<script setup lang="ts">
import { h } from 'vue'
import { useToast } from '@/composables/useToast'
import type { ToastMessage } from '@/types'

const { toasts, removeToast } = useToast()

const toastClasses = (type: ToastMessage['type']) => {
  const baseClasses = 'p-4 rounded-lg shadow-lg border backdrop-blur-sm animate-in'

  const typeClasses = {
    success: 'bg-success-light text-success-dark border-success',
    error: 'bg-error-light text-error-dark border-error',
    warning: 'bg-warning-light text-warning-dark border-warning',
    info: 'bg-info-light text-info-dark border-info',
  }

  return `${baseClasses} ${typeClasses[type]}`
}

const getIcon = (type: ToastMessage['type']) => {
  const icons = {
    success: () =>
      h(
        'svg',
        {
          class: 'w-5 h-5',
          fill: 'none',
          stroke: 'currentColor',
          viewBox: '0 0 24 24',
        },
        [
          h('path', {
            'stroke-linecap': 'round',
            'stroke-linejoin': 'round',
            'stroke-width': '2',
            d: 'M5 13l4 4L19 7',
          }),
        ]
      ),
    error: () =>
      h(
        'svg',
        {
          class: 'w-5 h-5',
          fill: 'none',
          stroke: 'currentColor',
          viewBox: '0 0 24 24',
        },
        [
          h('path', {
            'stroke-linecap': 'round',
            'stroke-linejoin': 'round',
            'stroke-width': '2',
            d: 'M6 18L18 6M6 6l12 12',
          }),
        ]
      ),
    warning: () =>
      h(
        'svg',
        {
          class: 'w-5 h-5',
          fill: 'none',
          stroke: 'currentColor',
          viewBox: '0 0 24 24',
        },
        [
          h('path', {
            'stroke-linecap': 'round',
            'stroke-linejoin': 'round',
            'stroke-width': '2',
            d: 'M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z',
          }),
        ]
      ),
    info: () =>
      h(
        'svg',
        {
          class: 'w-5 h-5',
          fill: 'none',
          stroke: 'currentColor',
          viewBox: '0 0 24 24',
        },
        [
          h('path', {
            'stroke-linecap': 'round',
            'stroke-linejoin': 'round',
            'stroke-width': '2',
            d: 'M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z',
          }),
        ]
      ),
  }

  return icons[type]
}
</script>

<style scoped>
.toast-enter-active,
.toast-leave-active {
  transition: all 0.3s ease;
}

.toast-enter-from {
  transform: translateX(100%);
  opacity: 0;
}

.toast-leave-to {
  transform: translateY(-10px);
  opacity: 0;
}

.toast-move {
  transition: transform 0.3s ease;
}
</style>
