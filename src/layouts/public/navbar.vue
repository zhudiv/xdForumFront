<script setup lang="ts">
import { ref } from 'vue'
import userStore from '@/store/userStore'
import utils from '@/utils'
import menuService from '@/composables/useMenu'
import { RouteEnum } from '@/enum/RouteEnum'
import { number } from 'yup/lib/locale'
import { useRouter } from 'vue-router'

const router = useRouter()
const user = userStore()

const isFullScreen = ref<boolean>(false)
const fullScreen = () => {
  isFullScreen.value ? document.exitFullscreen() : document.documentElement.requestFullscreen()
  isFullScreen.value = !isFullScreen.value
}

document.addEventListener('fullscreenchange', (e) => {
  isFullScreen.value = Boolean(document.fullscreenElement)
})

let activeIndex = ref(1)
let activeName = ref('Styles')
let dropDownVisible = ref(false)
let handleIndex = (sel:number):void => {
  switch(sel){
    case 2:
      activeName.value = 'Components'
      router.push({ name: 'front.docs' });
      break;
    case 3:
      activeName.value = '文档'
      router.push({ name: 'front.documents' });
      break;
    case 4:
      activeName.value = '交流'
      router.push({ name: 'front.exchange' });
      break;
     default:
      activeName.value = 'Styles'
      router.push({ name: 'front.styles' });
      break;
  }
  dropDownVisible.value = false
  activeIndex.value = sel
}
</script>

<template>
  <div class="bg-white p-3 px-5 flex justify-between items-center z-50">
    <div class="flex items-center">
      <img src="/images/navIcon.png" class="w-6 h-6 object-cove hover:cursor-auto" @click="$router.push('/')"/>
      <span class="pl-3 font-medium hidden sm:block">XD Design UI</span>
      <!-- <div @click="menuService.toggleState" class="mr-2">
        <icon-menu-fold-one
          theme="filled"
          size="24"
          fill="#10ad57"
          v-if="menuService.close.value"
          class="cursor-pointer" />
        <icon-menu-unfold-one theme="filled" size="24" fill="#10ad57" v-else class="cursor-pointer" />
      </div>
      <HdBreadcrumb class="hidden md:block" /> -->
    </div>
    <div class="sm:hidden flex flex-1 justify-end">
      <div class=" relative inline-block text-left dropdown">
        <span class="rounded-md shadow-sm" @click="dropDownVisible = true">
          <button class="inline-flex justify-center w-full px-4 py-2 text-sm font-medium leading-5 text-gray-700 transition duration-150 ease-in-out bg-white rounded-md hover:text-gray-500 focus:outline-none focus:border-blue-300 focus:shadow-outline-blue active:bg-gray-50 active:text-gray-800" 
                type="button" aria-haspopup="true" aria-expanded="true" aria-controls="headlessui-menu-items-117">
            <span> {{activeName}} </span>
            <svg class="w-5 h-5 ml-2 -mr-1" viewBox="0 0 20 20" fill="currentColor"><path fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
          </button>
        </span>
        <div v-show="dropDownVisible" class="dropdown-menu transition-all duration-300 transform -translate-y-2 scale-95">
          <div class="absolute right-0 w-56 mt-2 bg-white border border-gray-200 divide-y divide-gray-100 rounded-md shadow-lg outline-none">
            <div class="py-1">
              <a href="javascript:void(0)" @click="handleIndex(1)" tabindex="0" class="text-gray-700 flex justify-between w-full px-4 py-2 text-sm leading-5 text-left" >Styles</a>
              <a href="javascript:void(0)" @click="handleIndex(2)" class="text-gray-700 flex justify-between w-full px-4 py-2 text-sm leading-5 text-left" >Components</a>
              <a href="javascript:void(0)" @click="handleIndex(3)" class="text-gray-700 flex justify-between w-full px-4 py-2 text-sm leading-5 text-left" >文档</a>
              <a href="javascript:void(0)" @click="handleIndex(4)" class="text-gray-700 flex justify-between w-full px-4 py-2 text-sm leading-5 text-left" >交流</a>
            </div>
          </div>
        </div>
      </div>

      <!-- <el-dropdown>
        <span class="el-dropdown-link">
          Dropdown List
          <el-icon class="el-icon--right">
            <arrow-down />
          </el-icon>
        </span>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item>Action 1</el-dropdown-item>
            <el-dropdown-item>Action 2</el-dropdown-item>
            <el-dropdown-item>Action 3</el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown> -->
    </div>
    <div class="hidden sm:block">
      <nav class="flex flex-col sm:flex-row">
        <button class="text-gray-600 py-4 px-6 block hover:text-blue-500 focus:outline-none" @click="handleIndex(1)" :class="activeIndex == 1 ? 'text-blue-500 border-b-2 border-blue-500 font-medium' : ''">
            Styles
        </button>
        <button class="text-gray-600 py-4 px-6 block hover:text-blue-500 focus:outline-none" @click="handleIndex(2)" :class="activeIndex == 2 ? 'text-blue-500 border-b-2 border-blue-500 font-medium' : ''">
            Components
        </button>
        <button class="text-gray-600 py-4 px-6 block hover:text-blue-500 focus:outline-none" @click="handleIndex(3)" :class="activeIndex == 3 ? 'text-blue-500 border-b-2 border-blue-500 font-medium' : ''">
            文档
        </button>
        <button class="text-gray-600 py-4 px-6 block hover:text-blue-500 focus:outline-none" @click="handleIndex(4)" :class="activeIndex == 4 ? 'text-blue-500 border-b-2 border-blue-500 font-medium' : ''">
            交流
        </button>
      </nav>
    </div>
    <div class="flex justify-center items-center relative cursor-pointer">
      <HdNotification class="mr-8" />
      <icon-off-screen theme="outline" size="24" fill="#333" @click="fullScreen" class="mr-5 hidden sm:block" v-if="isFullScreen"/>
      <icon-full-screen-one theme="outline" size="24" fill="#333" @click="fullScreen" class="mr-5 hidden sm:block" v-else />
      <div class="group relative">
        <div class="flex justify-center items-center">
          <ElImage
            v-if="user.info?.avatar"
            :src="user.info?.avatar"
            fit="cover"
            class="w-8 h-8 rounded-full border-white" />
          <span class="ml-1 text-sm text-gray-600">{{ user.info?.name }}</span>
        </div>
        <section
          class="group-hover:block absolute right-0 top-full z-50 bg-white shadow-sm px-5 whitespace-nowrap border rounded-md hidden">
          <div class="flex items-center cursor-pointer border-b py-3">
            <icon-log theme="outline" size="18" fill="#333" />
            <span class="text-xs text-gray-600 ml-2">文档资料</span>
          </div>
          <div class="flex items-center cursor-pointer py-3" @click="$router.push({ name: RouteEnum.HOME })">
            <icon-home theme="outline" size="18" fill="#333" />
            <span class="text-xs text-gray-600 ml-2">网站首页</span>
          </div>
          <div class="flex items-center cursor-pointer py-3" @click="utils.user.logout()">
            <icon-logout theme="outline" size="18" fill="#333" />
            <span class="text-xs text-gray-600 ml-2">退出登录</span>
          </div>
        </section>
      </div>
      <a class="fab fa-github text-2xl" href="https://git.thinkdid.com/think-incubator/think_ui_static" target="_blank"></a>
    </div>
  </div>
</template>

<style scoped>
.dropdown:focus-within .dropdown-menu {
  opacity:1;
  transform: translate(0) scale(1);
  visibility: visible;
}
</style>
