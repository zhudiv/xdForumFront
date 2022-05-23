/*
 * @Author: zdh
 * @Date: 2022-05-07 17:12:55
 * @LastEditTime: 2022-05-16 16:14:35
 * @Description: 
 */
import { RouteRecordRaw } from 'vue-router'
export default {
  name: 'admin',
  path: '/admin',
  redirect: '/admin/home',
  component: () => import('@/layouts/admin.vue'),
  meta: { auth: true, menu: { title: 'Dashboard', icon: 'DashboardOne' } },
  children: [
    {
      name: 'admin.home',
      path: 'home',
      component: () => import('@/views/admin/home.vue'),
      meta: { menu: { title: '工作台' } },
    }
  ],
} as RouteRecordRaw
