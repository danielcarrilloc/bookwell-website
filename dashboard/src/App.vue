<template>
  <div class="min-h-screen bg-background text-foreground">
    <!-- Toast Container -->
    <Toast />

    <!-- Demo Page -->
    <div class="container-padding py-12 max-w-6xl mx-auto">
      <div class="space-y-12">
        <!-- Header -->
        <div class="text-center space-y-4">
          <h1 class="text-4xl font-bold font-display text-balance">
            BookWell Dashboard
          </h1>
          <p class="text-lg text-foreground-secondary max-w-2xl mx-auto">
            Modern, production-ready frontend for wellness booking SaaS
          </p>
        </div>

        <!-- UI Components Demo -->
        <Card title="UI Components" description="Demonstration of available components">
          <div class="space-y-8">
            <!-- Buttons -->
            <div class="space-y-4">
              <h3 class="text-lg font-semibold">Buttons</h3>
              <div class="flex flex-wrap gap-3">
                <Button variant="primary" @click="showToast('success')">
                  Primary Button
                </Button>
                <Button variant="secondary">Secondary Button</Button>
                <Button variant="outline">Outline Button</Button>
                <Button variant="ghost">Ghost Button</Button>
                <Button variant="danger">Danger Button</Button>
                <Button variant="primary" :loading="true">Loading...</Button>
              </div>
            </div>

            <!-- Inputs -->
            <div class="space-y-4">
              <h3 class="text-lg font-semibold">Inputs</h3>
              <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Input
                  label="Email"
                  type="email"
                  placeholder="seu@email.com"
                  required
                />
                <Input
                  label="Password"
                  type="password"
                  placeholder="••••••••"
                />
                <Input
                  label="With Error"
                  type="text"
                  error="This field is required"
                />
                <Input
                  label="Disabled"
                  type="text"
                  disabled
                  modelValue="Disabled input"
                />
              </div>
            </div>

            <!-- Badges -->
            <div class="space-y-4">
              <h3 class="text-lg font-semibold">Badges</h3>
              <div class="flex flex-wrap gap-3">
                <Badge variant="default">Default</Badge>
                <Badge variant="primary">Primary</Badge>
                <Badge variant="success">Success</Badge>
                <Badge variant="warning">Warning</Badge>
                <Badge variant="error">Error</Badge>
                <Badge variant="info">Info</Badge>
              </div>
            </div>

            <!-- Cards -->
            <div class="space-y-4">
              <h3 class="text-lg font-semibold">Cards</h3>
              <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Card variant="default" padding="md" hover>
                  <template #header>
                    <h4 class="font-semibold">Default Card</h4>
                  </template>
                  <p class="text-sm text-foreground-secondary">
                    This is a default card with hover effect.
                  </p>
                </Card>

                <Card variant="elevated" padding="md">
                  <template #header>
                    <h4 class="font-semibold">Elevated Card</h4>
                  </template>
                  <p class="text-sm text-foreground-secondary">
                    Card with elevated shadow.
                  </p>
                </Card>

                <Card variant="bordered" padding="md">
                  <template #header>
                    <h4 class="font-semibold">Bordered Card</h4>
                  </template>
                  <p class="text-sm text-foreground-secondary">
                    Card with thick border.
                  </p>
                </Card>
              </div>
            </div>

            <!-- Modal Demo -->
            <div class="space-y-4">
              <h3 class="text-lg font-semibold">Modal</h3>
              <Button @click="isModalOpen = true">Open Modal</Button>
            </div>
          </div>
        </Card>

        <!-- Status -->
        <Card title="Project Status">
          <div class="space-y-4">
            <div class="flex items-center gap-3">
              <Badge variant="success">Completed</Badge>
              <span class="text-sm">Core UI primitives</span>
            </div>
            <div class="flex items-center gap-3">
              <Badge variant="success">Completed</Badge>
              <span class="text-sm">Design system with Tailwind</span>
            </div>
            <div class="flex items-center gap-3">
              <Badge variant="success">Completed</Badge>
              <span class="text-sm">API composables</span>
            </div>
            <div class="flex items-center gap-3">
              <Badge variant="warning">Pending</Badge>
              <span class="text-sm">Better Auth integration</span>
            </div>
            <div class="flex items-center gap-3">
              <Badge variant="warning">Pending</Badge>
              <span class="text-sm">Router and navigation</span>
            </div>
            <div class="flex items-center gap-3">
              <Badge variant="warning">Pending</Badge>
              <span class="text-sm">Dashboard pages</span>
            </div>
          </div>
        </Card>

        <!-- Footer -->
        <div class="text-center text-sm text-foreground-secondary">
          <p>Built with Vue 3 + TypeScript + Tailwind CSS</p>
        </div>
      </div>
    </div>

    <!-- Demo Modal -->
    <Modal
      v-model="isModalOpen"
      title="Example Modal"
      description="This is a demonstration of the modal component."
      size="md"
    >
      <div class="space-y-4">
        <p class="text-sm text-foreground-secondary">
          This modal supports multiple sizes, custom headers, and footer actions.
        </p>

        <Input
          label="Example Input"
          placeholder="Type something..."
        />
      </div>

      <template #footer>
        <Button variant="ghost" @click="isModalOpen = false">Cancel</Button>
        <Button variant="primary" @click="handleModalSubmit">Submit</Button>
      </template>
    </Modal>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { Button, Input, Card, Badge, Modal, Toast } from './components/ui'
import { useToast } from './composables/useToast'

const { success, error, warning, info } = useToast()

const isModalOpen = ref(false)

const showToast = (type: 'success' | 'error' | 'warning' | 'info') => {
  const messages = {
    success: { title: 'Success!', message: 'Operation completed successfully' },
    error: { title: 'Error!', message: 'Something went wrong' },
    warning: { title: 'Warning!', message: 'Please check your input' },
    info: { title: 'Info', message: 'Here is some information' },
  }

  const msg = messages[type]

  switch (type) {
    case 'success':
      success(msg.title, msg.message)
      break
    case 'error':
      error(msg.title, msg.message)
      break
    case 'warning':
      warning(msg.title, msg.message)
      break
    case 'info':
      info(msg.title, msg.message)
      break
  }
}

const handleModalSubmit = () => {
  success('Form submitted!', 'Your data has been saved')
  isModalOpen.value = false
}
</script>
