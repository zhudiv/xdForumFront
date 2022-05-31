<!--
 * @Author: zdh
 * @Date: 2022-05-16 16:17:42
 * @LastEditTime: 2022-05-31 10:23:29
 * @Description: 
-->
<script setup lang="ts">
import Navbar from './public/navbar.vue'
import { useRoute } from 'vue-router'
import { watch } from 'vue'
import menu from '@/composables/useMenu'

const route = useRoute()
watch(
  route,
  () => {
    menu.addHistoryMenu(route)
  },
  { immediate: true },
)
</script>

<template>
  <div class="admin h-screen w-screen grid">
    <div class="content bg-gray-100 grid grid-rows-[auto_1fr]">
      <div class="z-50 sticky top-0">
        <Navbar />
      </div>
      <div class="m-3 relative z-10">
        <router-view>
          <!-- <Transition
            appear
            class="animate__animated"
            :enter-active-class="route.meta.enterClass ?? 'animate__fadeInRight'"
            :leave-active-class="route.meta.leaveClass ?? 'animate__fadeOutLeft'">
            <component :is="Component" class="absolute w-full" />
          </Transition> -->
        </router-view>
      </div>
    </div>
  </div>
  <!-- <div class="admin h-screen w-screen grid">
    <div class="content bg-gray-100 grid grid-rows-[auto_1fr]">
      <div class="z-50 sticky top-0">
        <Navbar />
      </div>
      <div class="m-3 relative z-10">
        <router-view #default="{ Component, route }">
          <Transition
            appear
            class="animate__animated"
            :enter-active-class="route.meta.enterClass ?? 'animate__fadeInRight'"
            :leave-active-class="route.meta.leaveClass ?? 'animate__fadeOutLeft'">
            <component :is="Component" class="absolute w-full" />
          </Transition>
        </router-view>
      </div>
    </div>
  </div> -->
</template>

<style lang="scss" scoped>
.animate__fadeInRight {
  animation-duration: 0.5s;
}
.animate__fadeOutLeft {
  animation-duration: 0.3s;
}
</style>
