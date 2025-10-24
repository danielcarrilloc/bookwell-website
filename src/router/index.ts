import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import Landing from '@/views/Landing.vue'
import Login from '@/views/auth/Login.vue'
import Register from '@/views/auth/Register.vue'
import ForgotPassword from '@/views/auth/ForgotPassword.vue'
import InstructorDashboard from '@/views/dashboard/InstructorDashboard.vue'
import ClientDashboard from '@/views/dashboard/ClientDashboard.vue'
import { useUserStore } from '@/stores/user'

const routes: RouteRecordRaw[] = [
  { path: '/', redirect: '/landing' },
  { path: '/landing', name: 'Landing', component: Landing, meta: { public: true } },
  { path: '/auth/login', name: 'Login', component: Login, meta: { public: true } },
  { path: '/auth/register', name: 'Register', component: Register, meta: { public: true } },
  { path: '/auth/forgot', name: 'ForgotPassword', component: ForgotPassword, meta: { public: true } },
  { path: '/dashboard/instructor', name: 'InstructorDashboard', component: InstructorDashboard, meta: { role: 'instructor' } },
  { path: '/dashboard/client', name: 'ClientDashboard', component: ClientDashboard, meta: { role: 'client' } },
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

router.beforeEach((to) => {
  const store = useUserStore()
  if (to.meta.public) return true
  if (!store.isAuthenticated) return { name: 'Login' }
  if (to.meta.role && store.role !== to.meta.role) {
    return store.role === 'instructor' ? { name: 'InstructorDashboard' } : { name: 'ClientDashboard' }
  }
  return true
})

export default router