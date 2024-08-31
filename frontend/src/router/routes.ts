import { useAuthStore } from 'src/stores/auth.store'
import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  // @ts-ignore
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '',
      name: 'home',
      component: HomeView,
      meta: { auth: true },
    },
    {
      path: '/profile',
      name: 'profile',
      meta: { auth: true },
      component: () => import('../views/profile/Profile.page.vue'),
      children: [
        {
          name: 'change-password',
          path: 'change-password',
          component: () => import('../views/profile/ChangePassword.page.vue'),
        },
        {
          path: 'delete-account',
          name: 'delete-account',
          component: () => import('../views/profile/DeleteAccount.page.vue'),
        },
      ]
    },
    { path: '/login', name: 'login', component: () => import('../views/LoginView.vue') },
    { path: '/signup', name: 'signup', component: () => import('../views/LoginView.vue') },
    {
      path: '', meta: { authRoute: true }, children: [
        { path: '/forgot-password', name: 'forgot-password', component: () => import('../views/LoginView.vue') },
        { path: '/email-verified', component: () => import('@/views/EmailVerifiedView.vue') },
      ]
    },
  ]
})

router.beforeEach(async (to, from) => {
  const auth = useAuthStore()

  if (to.meta.auth && !auth.isLoggedIn) return '/login'

  if (to.meta.authRoute && auth.isLoggedIn) return '/profile'
})

export default router
