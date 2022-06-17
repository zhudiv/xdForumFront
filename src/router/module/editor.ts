/*
 * @Author: zdh
 * @Date: 2022-05-07 17:12:55
 * @LastEditTime: 2022-06-10 14:34:48
 * @Description: 
 */
import { RouteRecordRaw } from 'vue-router'
export default {
  name: 'editor',
  path: '/editor',
  component: () => import('@/layouts/admin.vue'),
  meta: { auth: true, menu: { title: '编辑器', icon: 'EditOne' } },
  children: [
    {
      name: 'wangEditor',
      path: 'wangEditor',
      component: () => import('@/views/editor/wangeditor.vue'),
      meta: { menu: { title: '富文本编辑器' } },
    },
    {
      name: 'markdown',
      path: 'markdown',
      component: () => import('@/views/editor/markdown.vue'),
      meta: { menu: { title: 'Markdown' } },
    },
  ],
}
