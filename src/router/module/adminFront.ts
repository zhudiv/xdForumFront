/*
 * @Author: zdh
 * @Date: 2022-05-16 16:22:05
 * @LastEditTime: 2022-06-17 09:55:56
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
      meta: { menu: { title: '模块', menuHidden: true } },
      children: [
        {
          name: 'adminFront.modularization.colors',
          path: 'colors',
          component: () => import('@/views/adminFront/components/colors.vue'),
          meta: { menu: { title: '颜色修改' } },
        },
        {
          name: 'adminFront.modularization.buttons',
          path: 'buttons',
          component: () => import('@/views/adminFront/components/buttons.vue'),
          meta: { menu: { title: '按钮修改' } },
        },
        {
          name: 'adminFront.modularization.test',
          path: 'test',
          component: () => import('@/views/adminFront/components/test.vue'),
          meta: { menu: { title: 'test' } },
        }
      ]
    },
    {
      name: 'adminFront.organize',
      path: 'organize',
      component: () => import('@/views/adminFront/organize.vue'),
      meta: { menu: { title: '组件', menuHidden: true } }
    },
    {
      name: 'adminFront.exchange',
      path: 'exchange',
      component: () => import('@/views/adminFront/exchange.vue'),
      meta: { menu: { title: '交流', menuHidden: true } }
    }
  ]
}
