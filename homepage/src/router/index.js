import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  // {
  //   path: '/homepage',
  //   name: 'App',
  //   component: () => import('../App.vue')
  // },
  {
    path: '/listmenu',
    name: 'ListMenu',
    component: () => import('../components/ListMenu.vue')
  },
  {
    path: '/formpage',
    name: 'FormPage',
    component: () => import('../components/FormPage.vue')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
