import { createRouter, createWebHistory, createWebHashHistory, RouteRecordRaw } from 'vue-router'
import Home from '../views/Home/index.vue';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    redirect: '/Home'
  },
  {
    path: '/Home',
    name: 'Home',
    component: () => import('@/views/Home/index.vue')
  },
  {
    path: '/Singers',
    name: 'Singers',
    component: () => import('@/views/Singers/index.vue')
  },
  {
    path: '/HighqualityPlayList',
    name: 'HighqualityPlayList',
    component: () => import('@/views/HighqualityPlayList/index.vue')
  },
  {
    path: '/RecommendSong',
    name: 'RecommendSong',
    component: () => import('@/views/RecommendSong/index.vue')
  }
]

const router = createRouter({
  history: createWebHashHistory(process.env.BASE_URL),
  routes
})

export default router
