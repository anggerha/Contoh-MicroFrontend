import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/homepage',
    name: 'home',
    component: () => import(/* webpackChunkName: "about" */ '../views/HomeView.vue')
  },
  {
    path: '/homepage/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
  }
]

const router = createRouter({
  base: '/vue',
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
