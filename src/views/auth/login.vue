
<script setup lang="ts">
import useCaptcha from '@/composables/useCaptcha'
import errorStore from '@/store/errorStore'
import utils from '@/utils'
import Footer from './footer.vue'

// import router from '@/router'

import app from '@/main'


import autoloadModuleRoutes from '@/router/autoload/module'

import { useRouter } from 'vue-router'
import { getCurrentInstance } from 'vue'

import { CacheEnum } from '@/enum/CacheEnum'

import routerStore from '@/store/routerStore'

const router = useRouter()

const form = reactive({ account: '', password: '', captcha_code: '', captcha_key: '' })
const storeError = errorStore()
const { loadCaptcha } = useCaptcha()
const onSubmit = async () => {
  await utils.user.login(form)

  const a = autoloadModuleRoutes()
  // // console.log("mmmmmmmmmmmmm")
  // // console.dir(a)
  // // console.dir(router.getRoutes())
  a.forEach(item => {
    router.addRoute(item)
  })

  const store = routerStore()
  store.resetRouterLink(a)
  utils.store.set( 'router_list', JSON.stringify(autoloadModuleRoutes()))
  router.push({name: 'admin.home'})
  // console.dir(router.getRoutes())
  // console.dir(router)

  // console.log('ooooooooooooo')
  // console.dir(app)
  // app.use(router)

}
</script>

<template>
  <form class @submit.prevent="onSubmit">
    <div
      class="w-[720px] translate-y-32 md:translate-y-0 bg-gray-50 md:grid grid-cols-2 rounded-md shadow-md overflow-hidden">
      <div class="p-6 flex flex-col justify-between">
        <div>
          <h2 class="text-center text-gray-700 text-lg mt-3">用户登录</h2>
          <div class="mt-8">
            <FormInput v-model="form.account" placeholder="请输入邮箱或手机号" />
            <FormError name="account" />

            <FormInput
              v-model="form.password"
              class="mt-3"
              type="password"
              placeholder="请输入登录密码"
              v-clearError="'password'" />
            <FormError name="password" />

            <!-- <HdCaptcha v-model:captcha_code="form.captcha_code" v-model:captcha_key="form.captcha_key" class="mt-2" /> -->
          </div>

          <FormButton class="w-full mt-3 primary" :disabled="storeError.hasError">登录</FormButton>

          <div class="flex justify-center mt-3">
            <i class="fab fa-weixin text-green-300 text-2xl"></i>
            <!-- <icon-wechat
              theme="outline"
              size="24"
              fill="#fff"
              class="fab fa-weixin bg-green-600 text-white rounded-full p-1 cursor-pointer" /> -->
          </div>
        </div>
        <Footer />
      </div>
      <div class="hidden md:block relative">
        <img src="/images/login.jpg" class="absolute h-full w-full object-cover" />
      </div>
    </div>
  </form>
</template>

<style lang="scss">
form {
  @apply bg-slate-300 h-screen flex justify-center items-start md:items-center p-5;
}
</style>
