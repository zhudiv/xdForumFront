/*
 * @Author: zdh
 * @Date: 2022-06-01 16:35:05
 * @LastEditTime: 2022-06-01 16:59:30
 * @Description: 
 */
import { defineStore } from 'pinia'
import { RouteRecordRaw } from 'vue-router'

export default defineStore('routerStore', {
  state: () => {
    return {
      routerLink: [] as RouteRecordRaw[]
    }
  },
  actions: {
    resetRouterLink(links: RouteRecordRaw[]) {
      this.routerLink = links
    }
  }
})