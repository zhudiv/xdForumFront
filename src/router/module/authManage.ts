/*
 * @Author: zdh
 * @Date: 2022-06-01 17:59:50
 * @LastEditTime: 2022-06-10 13:58:46
 * @Description: 
 */
import { RouteRecordRaw } from 'vue-router'
export default {
  name: 'authManage',
  path: '/authManage',
  component: () => import('@/layouts/admin.vue'),
  meta: { auth: true, menu: { title: '用户管理', icon: 'User' } },
  children: [
    {
      name: 'user',
      path: 'user',
      component: () => import('@/views/authManage/authManage.vue'),
      meta: { menu: { title: '用户' } },
    }
  ],
}