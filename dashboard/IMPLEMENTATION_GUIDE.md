# BookWell Dashboard - Implementation Guide

This guide provides step-by-step instructions to complete the remaining features of the BookWell dashboard.

## What's Already Built

### Core Foundation ✅
- Vue 3 + Vite + TypeScript project setup
- Tailwind CSS with complete design system
- Pinia for state management (installed)
- TypeScript types from OpenAPI spec
- Axios HTTP client with Better Auth cookie handling

### UI Components ✅
- Button (all variants: primary, secondary, outline, ghost, danger)
- Input (text, email, password, textarea with validation)
- Card (with header/footer slots)
- Badge (status indicators)
- Modal (accessible dialogs)
- Toast (notifications system)
- Table (with header, row, cell components)

### API Composables ✅
- `useAuth` - Authentication and user management
- `useClasses` - Class CRUD and scheduling
- `useBookings` - Booking management
- `usePackages` - Package/credit management
- `useToast` - Toast notifications

### Utilities ✅
- Format utilities (dates, currency, phone, etc.)
- Validation utilities (email, phone, password, etc.)
- Design tokens export for landing page

## What Needs to Be Built

### 1. Better Auth Client Setup

Install Better Auth client:
```bash
npm install better-auth
```

Create Better Auth plugin:
```typescript
// src/plugins/better-auth.ts
import { createAuthClient } from 'better-auth/client'

export const authClient = createAuthClient({
  baseURL: import.meta.env.VITE_BETTER_AUTH_URL,
})

export default authClient
```

Update `useAuth` composable to use Better Auth client for login/register/logout.

### 2. Pinia Stores

Create stores for global state:

#### Auth Store
```typescript
// src/stores/auth.ts
import { defineStore } from 'pinia'
import { useAuth } from '@/composables/useAuth'

export const useAuthStore = defineStore('auth', () => {
  const auth = useAuth()

  return {
    ...auth,
  }
})
```

#### App Store (for theme, sidebar state, etc.)
```typescript
// src/stores/app.ts
import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export const useAppStore = defineStore('app', () => {
  const theme = ref<'light' | 'dark'>('light')
  const sidebarOpen = ref(true)

  const toggleTheme = () => {
    theme.value = theme.value === 'light' ? 'dark' : 'light'
    document.documentElement.classList.toggle('dark')
    localStorage.setItem('theme', theme.value)
  }

  const toggleSidebar = () => {
    sidebarOpen.value = !sidebarOpen.value
  }

  // Initialize theme from localStorage
  const initTheme = () => {
    const savedTheme = localStorage.getItem('theme')
    if (savedTheme) {
      theme.value = savedTheme as 'light' | 'dark'
      if (savedTheme === 'dark') {
        document.documentElement.classList.add('dark')
      }
    }
  }

  return {
    theme: computed(() => theme.value),
    sidebarOpen: computed(() => sidebarOpen.value),
    toggleTheme,
    toggleSidebar,
    initTheme,
  }
})
```

### 3. Vue Router Setup

Install Vue Router (already installed, just configure):

```typescript
// src/router/index.ts
import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from '@/stores/auth'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      redirect: '/dashboard'
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('@/views/auth/LoginView.vue'),
      meta: { requiresGuest: true }
    },
    {
      path: '/register',
      name: 'register',
      component: () => import('@/views/auth/RegisterView.vue'),
      meta: { requiresGuest: true }
    },
    {
      path: '/forgot-password',
      name: 'forgot-password',
      component: () => import('@/views/auth/ForgotPasswordView.vue'),
      meta: { requiresGuest: true }
    },
    {
      path: '/dashboard',
      component: () => import('@/layouts/DashboardLayout.vue'),
      meta: { requiresAuth: true },
      children: [
        // Instructor routes
        {
          path: 'instructor',
          name: 'instructor-dashboard',
          component: () => import('@/views/instructor/DashboardView.vue'),
          meta: { role: 'instructor' }
        },
        {
          path: 'instructor/classes',
          name: 'instructor-classes',
          component: () => import('@/views/instructor/ClassesView.vue'),
          meta: { role: 'instructor' }
        },
        {
          path: 'instructor/clients',
          name: 'instructor-clients',
          component: () => import('@/views/instructor/ClientsView.vue'),
          meta: { role: 'instructor' }
        },
        {
          path: 'instructor/payments',
          name: 'instructor-payments',
          component: () => import('@/views/instructor/PaymentsView.vue'),
          meta: { role: 'instructor' }
        },
        {
          path: 'instructor/settings',
          name: 'instructor-settings',
          component: () => import('@/views/instructor/SettingsView.vue'),
          meta: { role: 'instructor' }
        },
        // Client routes
        {
          path: 'client',
          name: 'client-dashboard',
          component: () => import('@/views/client/DashboardView.vue'),
          meta: { role: 'client' }
        },
        {
          path: 'client/classes',
          name: 'client-classes',
          component: () => import('@/views/client/ClassesView.vue'),
          meta: { role: 'client' }
        },
        {
          path: 'client/credits',
          name: 'client-credits',
          component: () => import('@/views/client/CreditsView.vue'),
          meta: { role: 'client' }
        },
        {
          path: 'client/book',
          name: 'client-book',
          component: () => import('@/views/client/BookView.vue'),
          meta: { role: 'client' }
        },
        {
          path: 'client/profile',
          name: 'client-profile',
          component: () => import('@/views/client/ProfileView.vue'),
          meta: { role: 'client' }
        },
      ]
    },
    {
      path: '/:pathMatch(.*)*',
      name: 'not-found',
      component: () => import('@/views/NotFoundView.vue')
    }
  ]
})

// Navigation guards
router.beforeEach(async (to, from, next) => {
  const authStore = useAuthStore()

  // Check if route requires authentication
  if (to.meta.requiresAuth) {
    if (!authStore.isAuthenticated) {
      // Try to restore session
      const isValid = await authStore.checkAuth()
      if (!isValid) {
        return next({ name: 'login', query: { redirect: to.fullPath } })
      }
    }

    // Check role
    if (to.meta.role && authStore.currentUser?.role !== to.meta.role) {
      // Redirect to correct dashboard based on role
      const redirectPath = authStore.isInstructor
        ? '/dashboard/instructor'
        : '/dashboard/client'
      return next(redirectPath)
    }
  }

  // Redirect authenticated users away from guest pages
  if (to.meta.requiresGuest && authStore.isAuthenticated) {
    const redirectPath = authStore.isInstructor
      ? '/dashboard/instructor'
      : '/dashboard/client'
    return next(redirectPath)
  }

  next()
})

export default router
```

Update `main.ts`:
```typescript
import router from './router'
app.use(router)
```

### 4. Layout Components

#### Navbar Component
```vue
<!-- src/components/shared/Navbar.vue -->
<template>
  <nav class="border-b border-border bg-background">
    <div class="container-padding">
      <div class="flex items-center justify-between h-16">
        <!-- Logo -->
        <div class="flex items-center gap-4">
          <button
            @click="appStore.toggleSidebar()"
            class="p-2 rounded-md hover:bg-background-secondary lg:hidden"
          >
            <Menu class="w-5 h-5" />
          </button>

          <h1 class="text-xl font-bold font-display">BookWell</h1>
        </div>

        <!-- Right side -->
        <div class="flex items-center gap-4">
          <!-- Theme toggle -->
          <button
            @click="appStore.toggleTheme()"
            class="p-2 rounded-md hover:bg-background-secondary"
          >
            <Sun v-if="appStore.theme === 'dark'" class="w-5 h-5" />
            <Moon v-else class="w-5 h-5" />
          </button>

          <!-- User menu -->
          <div class="flex items-center gap-3">
            <span class="text-sm">{{ authStore.currentUser?.firstName }}</span>
            <Button variant="ghost" size="sm" @click="handleLogout">
              Logout
            </Button>
          </div>
        </div>
      </div>
    </div>
  </nav>
</template>

<script setup lang="ts">
import { Menu, Sun, Moon } from 'lucide-vue-next'
import { Button } from '@/components/ui'
import { useAuthStore } from '@/stores/auth'
import { useAppStore } from '@/stores/app'

const authStore = useAuthStore()
const appStore = useAppStore()

const handleLogout = async () => {
  await authStore.logout()
}
</script>
```

#### Sidebar Component
Create a sidebar with navigation items based on user role.

#### Dashboard Layout
```vue
<!-- src/layouts/DashboardLayout.vue -->
<template>
  <div class="min-h-screen bg-background">
    <Navbar />

    <div class="flex">
      <Sidebar v-if="appStore.sidebarOpen" />

      <main class="flex-1 container-padding py-6">
        <RouterView />
      </main>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import { useAppStore } from '@/stores/app'
import Navbar from '@/components/shared/Navbar.vue'
import Sidebar from '@/components/shared/Sidebar.vue'

const appStore = useAppStore()

onMounted(() => {
  appStore.initTheme()
})
</script>
```

### 5. Authentication Pages

Create views for:
- Login (`src/views/auth/LoginView.vue`)
- Register (`src/views/auth/RegisterView.vue`)
- Forgot Password (`src/views/auth/ForgotPasswordView.vue`)

Use the Button and Input components already created.

### 6. Dashboard Pages

#### Instructor Dashboard
- Home: Stats cards, recent bookings
- Classes: List, create, edit, calendar view
- Clients: Table with credits, attendance
- Payments: Revenue, package management
- Settings: Profile, availability, notifications

#### Client Dashboard
- Home: Upcoming classes, credit summary
- Classes: List of booked classes
- Credits: Active packages with expiry
- Book: Class browser with booking modal
- Profile: Personal settings

### 7. Shared Components

Create additional shared components:
- `EmptyState.vue` - For empty lists
- `LoadingSpinner.vue` - Loading indicator
- `StatCard.vue` - For dashboard stats
- `CreditBadge.vue` - Credit display
- `ClassCard.vue` - Class list item
- `BookingCard.vue` - Booking list item

### 8. Dark Mode Toggle

Already set up in App store! Just need to use it in Navbar.

### 9. Additional Features

#### Calendar Component
For class scheduling, consider using a library like:
- `v-calendar` - Lightweight calendar for Vue 3
- Or build a custom simple calendar

#### Form Validation
Already have validation utilities. Create a `useForm` composable:
```typescript
// src/composables/useForm.ts
import { ref, reactive } from 'vue'
import type { FormErrors } from '@/types'

export const useForm = <T extends Record<string, any>>(
  initialValues: T,
  validationSchema: Record<keyof T, (value: any) => string | undefined>
) => {
  const values = reactive<T>({ ...initialValues })
  const errors = ref<FormErrors>({})
  const isSubmitting = ref(false)

  const validate = (field?: keyof T) => {
    if (field) {
      const error = validationSchema[field]?.(values[field])
      if (error) {
        errors.value[field as string] = error
      } else {
        delete errors.value[field as string]
      }
      return !error
    }

    // Validate all fields
    const newErrors: FormErrors = {}
    let isValid = true

    for (const key in validationSchema) {
      const error = validationSchema[key](values[key])
      if (error) {
        newErrors[key] = error
        isValid = false
      }
    }

    errors.value = newErrors
    return isValid
  }

  const handleSubmit = async (onSubmit: (values: T) => Promise<void>) => {
    if (!validate()) return

    isSubmitting.value = true
    try {
      await onSubmit(values)
    } finally {
      isSubmitting.value = false
    }
  }

  const reset = () => {
    Object.assign(values, initialValues)
    errors.value = {}
  }

  return {
    values,
    errors,
    isSubmitting,
    validate,
    handleSubmit,
    reset,
  }
}
```

## Testing the Application

1. Start the API backend
2. Create `.env` file with proper API URL
3. Run `npm run dev`
4. Navigate to `http://localhost:5173`

## Deployment

### Build for production:
```bash
npm run build
```

### Preview production build:
```bash
npm run preview
```

### Deploy to:
- Vercel
- Netlify
- AWS Amplify
- Any static host

## Performance Optimizations

1. **Lazy Loading**: Routes are already lazy-loaded
2. **Code Splitting**: Vite handles this automatically
3. **Image Optimization**: Use WebP format, lazy load images
4. **Bundle Analysis**: `npm install -D rollup-plugin-visualizer`
5. **PWA**: Consider adding Vite PWA plugin

## Accessibility Checklist

- ✅ Semantic HTML
- ✅ ARIA labels
- ✅ Keyboard navigation
- ✅ Focus management
- ✅ Color contrast (WCAG AA)
- ⬜ Screen reader testing
- ⬜ Keyboard-only navigation testing

## Browser Testing

Test on:
- Chrome (desktop & mobile)
- Firefox
- Safari (desktop & iOS)
- Edge

## Final Steps

1. Add error boundary for global error handling
2. Add analytics (Google Analytics, Plausible, etc.)
3. Add monitoring (Sentry for error tracking)
4. Setup CI/CD pipeline
5. Add E2E tests (Playwright or Cypress)
6. Document component usage (Storybook)
7. Performance monitoring (Lighthouse CI)

## Resources

- [Vue 3 Docs](https://vuejs.org/)
- [Tailwind CSS Docs](https://tailwindcss.com/)
- [Better Auth Docs](https://better-auth.com/)
- [Pinia Docs](https://pinia.vuejs.org/)
- [Vue Router Docs](https://router.vuejs.org/)

Good luck building your BookWell dashboard! 🚀
