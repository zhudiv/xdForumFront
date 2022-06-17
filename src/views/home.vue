<!--
 * @Author: zdh
 * @Date: 2022-05-07 17:12:55
 * @LastEditTime: 2022-06-10 13:46:46
 * @Description: 
-->
<script setup lang="ts">
import utils from '@/utils'
import { RouteEnum } from '@/enum/routeEnum'
import store from '@/utils/store'


import { useRoute } from 'vue-router'
import { CacheEnum } from '@/enum/CacheEnum'
const router = useRouter()
const visitor = () => {
  router.push({ name: 'front' })
}

const toAdmin = () => {
  if(store.get(CacheEnum.TOKEN_NAME)){
    router.push({ name: RouteEnum.ADMIN })
  }else{ //跳到的登录页面
    router.push({ name: RouteEnum.LOGIN })
  }
}
</script>

<template>
  <div class="h-screen w-screen bg-gray-700 flex flex-col justify-center items-center">
    <img src="/images/xj.jpg" class="w-40 h-40 object-cover rounded-full border-8 border-white mb-5" />
    <div>
      <FormButton @click="visitor()" class="success">游客登录</FormButton>
      <FormButton @click="toAdmin()" class="danger ml-2">后台管理</FormButton>
      <FormButton v-if="!utils.user.isLogin()" class="primary ml-2" @click="$router.push({ name: RouteEnum.LOGIN })">用户登录</FormButton>
    </div>
    <div class="text-gray-300 text-xs font-mono drop-shadow-md mt-6">行迪UI库</div>
  </div>
</template>
