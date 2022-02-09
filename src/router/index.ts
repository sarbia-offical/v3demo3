/*
 * @Description: 
 * @version: 
 * @Author: zouwenqin
 * @Date: 2021-11-15 10:37:05
 * @LastEditors: zouwenqin
 * @LastEditTime: 2022-01-12 16:35:22
 */
import { createRouter, createWebHistory, createWebHashHistory, RouteRecordRaw } from 'vue-router'
const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    redirect: '/Home'
  },
  {
    path: '/Home',
    name: 'Home',
    component: () => import('@/views/Home/index.vue'),
    children: [
      {
        path: '/SearchPage/:keywords/:type',
        component: () => import('@/views/Home/children/searchPage/index.vue')
      }
    ]
  },
  {
    path: '/Singers',
    name: 'Singers',
    component: () => import('@/views/Singers/index.vue'),
    children: [
      {
        path: '/SingerDetail/:id',
        component: () => import('@/views/Singers/children/SingerDetail/index.vue')
      }
    ]
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
