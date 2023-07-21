import Vue from 'vue'
import VueRouter from 'vue-router'
//import { createRouter, createWebHistory } from 'vue-router'
Vue.use(VueRouter)

const routes = [
  {
    path: '/srm/AdminPage',
    name: 'AdminPage',
    component: () => import('../components/AdminPage.vue'),
  },
  {
    path: '/srm/FormData',
    name: 'FormData',
    component: () => import ('../components/FormData.vue')
  },
  {
    path: '/srm/DosenPage',
    name: 'DosenPage',
    component: () => import('../components/DosenPage.vue'),
  },
  {
    path: '/srm/MahasiswaPage',
    name: 'MahasiswaPage',
    component: () => import('../components/MahasiswaPage.vue'),
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
