/*
 * @Author: zdh
 * @Date: 2022-05-07 17:12:55
 * @LastEditTime: 2022-06-09 11:21:49
 * @Description: 
 */
import { App } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'
import routes from './routes'
// import autoload from './autoload'
import asyncAutoLoad from './asyncAutoLoad'
import guard from './guard'

const router = createRouter({
  history: createWebHistory(),
  routes: [...routes],
})

export async function setupRouter(app: App) {
  // console.log('---------setupRouter-------')
  // autoload(router)
  asyncAutoLoad(router)
  guard(router)
  app.use(router)
}

export default router
