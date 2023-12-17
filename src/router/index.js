import { createRouter, createWebHashHistory } from 'vue-router'

const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/:config',
      name: 'home',
      component: () => import('../views/DevicesView.vue')
    },
    {
      path: '/:config/devices/:view',
      name: 'devices',
      component: () => import('../views/DevicesView.vue')
    },
    {
      path: '/:config/settings',
      name: 'settings',
      component: () => import('../views/SettingsView.vue')
    },
    {
      path: '/:config/internals',
      name: 'internals',
      component: () => import('../views/InternalsView.vue')
    }
  ]
})

export default router
