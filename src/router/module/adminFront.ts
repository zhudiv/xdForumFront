/*
 * @Author: zdh
 * @Date: 2022-05-16 16:22:05
 * @LastEditTime: 2022-06-06 09:39:37
 * @Description: 
 */
import { RouteRecordRaw } from 'vue-router'

export default {
  name: 'adminFront',
  path: '/adminFront',
  component: () => import('@/layouts/admin.vue'),
  meta: { auth: false, menu: { title: '前端页面', icon: 'Deeplink' } },
  children: [
    {
      name: 'adminFront.modularization',
      path: 'docs',
      component: () => import('@/views/adminFront/modularization.vue'),
      meta: { menu: { title: '模块' } },
      children: [
        {
          name: 'adminFront.modularization.colors',
          path: 'colors',
          component: () => import('@/views/adminFront/colors.vue'),
          meta: { menu: { title: '颜色修改' } },
        },
        {
          name: 'adminFront.modularization.buttons',
          path: 'buttons',
          component: () => import('@/views/adminFront/buttons.vue'),
          meta: { menu: { title: '按钮修改' } },
        }
      ]
    },
    {
      name: 'adminFront.colors',
      path: 'docs',
      component: () => import('@/views/adminFront/colors.vue'),
      meta: { menu: { title: '颜色' } }
    }
  ]
} as RouteRecordRaw
