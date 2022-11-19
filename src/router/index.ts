import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Home',
    component: () =>
      import(
        '@/pages/HomePage.vue'
        )
  },

  {
    path: '/',
    name: 'Level',
    component: () =>
      import(
        '@/pages/LevelList.vue'
        )
  },
  {
    path: '/',
    name: 'Game',
    component: () =>
      import(
        '@/pages/GameLayout.vue'
        )
  }
]

export const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})
