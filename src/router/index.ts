import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'
import Home from '../views/Home/index.vue'
import NotFound from '../views/404.vue'

import search from './search'
import user from './user'
import auth from './auth'

Vue.use(VueRouter)

const routes: Array<RouteConfig> = [
  {
    path: '/',
    name: 'home',
    component: Home
  },
  search,
  user,
  auth,
  {
    path: '*',
    name: '404',
    component: NotFound
  }
]

const router = new VueRouter({
  routes
})

export default router
