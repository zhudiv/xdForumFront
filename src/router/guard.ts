import store from '@/utils/store'
import { CacheEnum } from '../enum/CacheEnum'
import util from '@/utils'
import { RouteLocationNormalized, Router } from 'vue-router'
import errorStore from '@/store/errorStore'

class Guard {
  constructor(private router: Router) {}

  public run() {
    this.router.beforeEach(this.beforeEach.bind(this))
  }

  private async beforeEach(to: RouteLocationNormalized, from: RouteLocationNormalized) {
    errorStore().resetError()

    if (to.meta.auth && !this.token()) {
      store.set(CacheEnum.REDIRECT_ROUTE_NAME, to.name)
      return { name: 'login' }
    }

    if (to.meta.guest && this.token()) return from
  }

  private token(): string | null {
    return util.store.get(CacheEnum.TOKEN_NAME)
  }
}

export default (router: Router) => {
  new Guard(router).run()
}
