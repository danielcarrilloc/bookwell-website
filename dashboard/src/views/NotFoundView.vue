<template>
  <div class="min-h-screen bg-background flex items-center justify-center py-12 px-4">
    <div class="text-center">
      <h1 class="text-9xl font-bold text-primary mb-4">404</h1>
      <h2 class="text-3xl font-bold text-foreground mb-2">Page Not Found</h2>
      <p class="text-foreground-secondary mb-8 max-w-md">
        The page you're looking for doesn't exist or has been moved.
      </p>

      <div class="flex gap-4 justify-center">
        <Button variant="primary" @click="router.push('/')">
          Go Home
        </Button>
        <Button variant="outline" @click="router.back()">
          Go Back
        </Button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'
import { Button } from '@/components/ui'

const router = useRouter()
</script>
