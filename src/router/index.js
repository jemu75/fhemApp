import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import ('../views/Devices.vue')
  },

  {
    path: '/system',
    name: 'System',
    component: () => import ('../views/Devices.vue')
  },

  {
    path: '/dashboard',
    name: 'Dashboard',
    component: () => import ('../views/Devices.vue')
  },

  {
    path: '/devices/:filter',
    name: 'Devices',
    component: () => import('../views/Devices.vue')
  },

  {
    path: '/settings',
    name: 'Settings',
    component: () => import('../views/Settings.vue')
  },

  {
    path: '/syslog',
    name: 'Syslog',
    component: () => import ('../views/Syslog.vue')
  }
]

const router = new VueRouter({
  mode: 'hash',
  base: process.env.BASE_URL,
  routes
})

export default router
