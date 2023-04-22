import Vue from 'vue'
import VueRouter from 'vue-router'
//import { createRouter, createWebHistory } from 'vue-router'
Vue.use(VueRouter)

const routes = [
  {
    path: '/srm/:id',
    name: 'App',
    component: () => import('../App.vue'),
   
  },
  
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
