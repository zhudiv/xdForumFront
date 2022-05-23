/*
 * @Author: zdh
 * @Date: 2022-05-16 16:22:05
 * @LastEditTime: 2022-05-17 13:24:19
 * @Description: 
 */
import { RouteRecordRaw } from 'vue-router'

export default {
  name: 'front',
  path: '/front',
  component: () => import('@/layouts/admin.vue'),
  meta: { auth: true, menu: { title: '前端', icon: 'Deeplink' } },
  children: [
    {
      name: 'front.styles',
      path: 'styles',
      component: () => import('@/views/front/styles.vue'),
      meta: { menu: { title: '前端样式' } },
      children: [
        {
          name: 'front.styles.common',
          path: 'common',
          component: () => import('@/views/front/common.vue'),
          meta: { menu: { title: '前端common样式' } },
        }
      ]
    }
  ],
} as RouteRecordRaw
