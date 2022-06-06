/*
 * @Author: zdh
 * @Date: 2022-05-07 17:12:55
 * @LastEditTime: 2022-06-01 15:52:48
 * @Description: 
 */
import { Router, RouteRecordRaw } from 'vue-router'
import util from '@/utils'
import getRoutes from './view'
import autoloadModuleRoutes from './module'
import userStore from '@/store/userStore'

import store from '@/utils/store'
import { CacheEnum } from '@/enum/CacheEnum'

let routes: RouteRecordRaw[] = []

console.log('-----------autoloadModuleRoutes----------')
// if(store.get(CacheEnum.TOKEN_TYPE) == 1){  // 管理员登录
  // routes = autoloadModuleRoutes()
// }else{
  // routes = getRoutes()
//   console.log("-------33333344444444555555------")
//   console.dir(routes)
// }

function autoload(router: Router) {
  console.log('-----------autoloadModuleRoutes autoload----------')
  const user = userStore()

  routes = routes.map((route) => {
    route.children = route.children?.filter((r) => {
      const permission = r.meta?.permission
      return permission ? user.info?.permissions?.includes(permission) : true
    })
    return route
  })

  routes.forEach((r) => router.addRoute(r))
}

export default autoload
