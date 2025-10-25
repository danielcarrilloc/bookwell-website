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
        // Default redirect based on role (handled in navigation guard)
        {
          path: '',
          redirect: (to) => {
            const authStore = useAuthStore()
            return authStore.isInstructor ? '/dashboard/instructor' : '/dashboard/client'
          }
        },
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

    // Check role-based access
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
