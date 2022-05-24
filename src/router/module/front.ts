/*
 * @Author: zdh
 * @Date: 2022-05-16 16:22:05
 * @LastEditTime: 2022-05-24 18:54:41
 * @Description: 
 */
import { RouteRecordRaw } from 'vue-router'

export default {
  name: 'front',
  path: '/front',
  component: () => import('@/layouts/front.vue'),
  meta: { auth: true, menu: { title: '前端', icon: 'Deeplink' } },
  children: [
    {
      name: 'front.docs',
      path: 'docs',
      component: () => import('@/views/front/docs.vue'),
      meta: { menu: { title: '文档说明' } }
    },
    {
      name: 'front.documents',
      path: 'documents',
      component: () => import('@/views/front/documents.vue'),
      meta: { menu: { title: '参考文档' } }
    },
    {
      name: 'front.exchange',
      path: 'exchange',
      component: () => import('@/views/front/exchange.vue'),
      meta: { menu: { title: '前端交流' } }
    },
    {
      name: 'front.styles',
      path: 'styles',
      component: () => import('@/views/front/styles.vue'),
      meta: { menu: { title: '前端样式' } },
      children: [
        {
          name: 'front.styles.colors',
          path: 'colors',
          component: () => import('@/views/front/styleComponents/colors.vue'),
          meta: { menu: { title: '前端common样式' } },
        },
        {
          name: 'front.styles.buttons',
          path: 'buttons',
          component: () => import('@/views/front/styleComponents/buttons.vue'),
          meta: { menu: { title: '前端common样式' } },
        }
      ]
    }
  ],
} as RouteRecordRaw
