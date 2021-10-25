import { createRouter, createWebHistory, createWebHashHistory, RouteRecordRaw } from 'vue-router'
import Home from '../views/Home/index.vue';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    redirect: '/Home'
  },
  {
    path: '/Home',
    component: () => import('@/views/Home/index.vue')
  },
  {
    path: '/Singers',
    component: () => import('@/views/Singers/index.vue')
  },
  {
    path: '/HighqualityPlayList',
    component: () => import('@/views/HighqualityPlayList/index.vue')
  },
  {
    path: '/RecommendSong',
    component: () => import('@/views/RecommendSong/index.vue')
  }
]

const router = createRouter({
  history: createWebHashHistory(process.env.BASE_URL),
  routes
})

export default router
