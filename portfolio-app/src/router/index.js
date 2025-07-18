import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import PrivacyPoliycView from '@/views/PrivacyPoliycView.vue'
import ImprintView from '@/views/ImprintView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/adatvedelmi-tajekoztato',
      name: 'adatvedelmi-tajekoztato',
      component: PrivacyPoliycView,
    },
    {
      path: '/impresszum',
      name: 'impresszum',
      component: ImprintView,
    },
    {
      path: '/:catchAll(.*)',
      redirect: '/',
    },
  ],
})

export default router
