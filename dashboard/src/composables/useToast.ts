import { ref } from 'vue'
import type { ToastMessage } from '@/types'

const toasts = ref<ToastMessage[]>([])

let idCounter = 0

export const useToast = () => {
  const addToast = (
    type: ToastMessage['type'],
    title: string,
    message?: string,
    duration: number = 5000
  ) => {
    const id = `toast-${idCounter++}`

    const toast: ToastMessage = {
      id,
      type,
      title,
      message,
      duration,
    }

    toasts.value.push(toast)

    if (duration > 0) {
      setTimeout(() => {
        removeToast(id)
      }, duration)
    }

    return id
  }

  const removeToast = (id: string) => {
    const index = toasts.value.findIndex((t) => t.id === id)
    if (index !== -1) {
      toasts.value.splice(index, 1)
    }
  }

  const success = (title: string, message?: string, duration?: number) => {
    return addToast('success', title, message, duration)
  }

  const error = (title: string, message?: string, duration?: number) => {
    return addToast('error', title, message, duration)
  }

  const warning = (title: string, message?: string, duration?: number) => {
    return addToast('warning', title, message, duration)
  }

  const info = (title: string, message?: string, duration?: number) => {
    return addToast('info', title, message, duration)
  }

  const clear = () => {
    toasts.value = []
  }

  return {
    toasts,
    addToast,
    removeToast,
    success,
    error,
    warning,
    info,
    clear,
  }
}
