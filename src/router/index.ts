import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Home',
    component: () =>
      import(
        '@/pages/Home.vue'
        )
  },

  {
    path: '/',
    name: 'Level',
    component: () =>
      import(
        '@/pages/Level.vue'
        )
  },
  {
    path: '/',
    name: 'Game',
    component: () =>
      import(
        '@/pages/Game.vue'
        )
  }
]

export const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})
