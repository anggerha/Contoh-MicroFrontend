import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/listmenu',
    name: 'ListMenu',
    component: () => import('../components/ListMenu.vue')
  },
  {
    path: '/formpage',
    name: 'FormPage',
    component: () => import('../components/FormPage.vue')
  },
  {
    path: '/profile',
    name: 'Profile',
    component: () => import('../components/Profile.vue')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
