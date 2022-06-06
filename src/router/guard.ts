import { router } from '@/router';
/*
 * @Author: zdh
 * @Date: 2022-05-07 17:12:55
 * @LastEditTime: 2022-06-01 17:57:40
 * @Description: 
 */
import store from '@/utils/store'
import { CacheEnum } from '../enum/CacheEnum'
import util from '@/utils'
import { RouteLocationNormalized, Router } from 'vue-router'
import errorStore from '@/store/errorStore'

import utils from '@/utils'
import { RouteRecordRaw } from 'vue-router'

import app from '@/main'

import autoloadModuleRoutes from '@/router/autoload/module'
import getRoutes from '@/router/autoload/view'

// import router , { setupRouter } from '@/router'

import routerStore from '@/store/routerStore'


let flag = 0
class Guard {
  // private flag = 0;
  constructor(private router: Router) {}

  public run() {
    this.router.beforeEach(this.beforeEach.bind(this))
  }

  private async beforeEach(to: RouteLocationNormalized, from: RouteLocationNormalized, next) {

    const a =  routerStore()


    console.log("333333333333")
    console.dir(store.get(CacheEnum.TOKEN_TYPE ))

    if(a.routerLink.length == 0){
      // if(store.get(CacheEnum.TOKEN_TYPE) == 2){
      //   console.dir(getRoutes())
      // }
      //   getRoutes().forEach( s => {
      //     this.router.addRoute(s)
      //   })
      //   routerStore().resetRouterLink(getRoutes())
      // }else{
        autoloadModuleRoutes().forEach( s => {
          this.router.addRoute(s)
        })
        routerStore().resetRouterLink(autoloadModuleRoutes())
      // }
      
      next( {path: to.path} )
    }
    errorStore().resetError()

    // if (to.meta.auth && !this.token()) {
    //   store.set(CacheEnum.REDIRECT_ROUTE_NAME, to.name)
    //   return { name: 'login' }
    // }

    if (to.meta.guest && this.token()) return from
    next()
  }

  private token(): string | null {
    return util.store.get(CacheEnum.TOKEN_NAME)
  }
}

export default (router: Router) => {
  new Guard(router).run()
}
