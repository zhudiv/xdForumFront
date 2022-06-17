/*
 * @Author: zdh
 * @Date: 2022-05-07 17:12:55
 * @LastEditTime: 2022-06-10 14:42:27
 * @Description: 
 */
import { RouteRecordRaw } from 'vue-router'

const routes = [
  {
    path: '/',
    name: 'home',
    component: () => import('@/views/home.vue'),
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/auth/login.vue'),
    meta: { guest: true },
  },
  {
    path: '/register',
    name: 'register',
    component: () => import('@/views/auth/register.vue'),
    meta: { guest: true },
  },
  {
    path: '/forget-password',
    name: 'forgetPassword',
    component: () => import('@/views/auth/forgetPassword.vue'),
    meta: { guest: true },
  },
  {
    path: '/article',
    name: 'article',
    component: () => import('@/views/article.vue'),
  },

  {
    path: '/front',
    name: 'front',
    component: () => import('@/views/front.vue'),
    redirect: '/front/styles',
    children: [
      {
        path: 'styles',
        name: 'front.styles',
        component: () => import('@/views/front/styles.vue')
      },
      {
        path: 'docs',
        name: 'front.docs',
        component: () => import('@/views/front/docs.vue')
      },
      {
        path: 'documents',
        name: 'front.documents',
        component: () => import('@/views/front/documents.vue')
      },
      {
        path: 'exchange',
        name: 'front.exchange',
        component: () => import('@/views/front/exchange.vue')
      }
    ]
  },
  {
    path: '/:any(.*)',
    name: 'notFound',
    component: () => import('@/views/errors/404.vue'),
  },
] as RouteRecordRaw[]

export default routes
