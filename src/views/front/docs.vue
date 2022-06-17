<!--
 * @Author: zdh
 * @Date: 2022-05-16 16:26:10
 * @LastEditTime: 2022-06-17 08:57:33
 * @Description: 
-->
<script lang="ts" setup>
import { reactive, onMounted, toRefs, nextTick } from 'vue'
import { OrganizePerUnit } from '@/apis/types/organize'
import { organizeInsert, organizeList, organizeInfo } from '@/apis/organizeApi'

const organizeArr = ref<OrganizePerUnit[]>([])

onMounted( () => {
  getOrganizeList()
})

const getOrganizeList = function(){
  organizeList().then( res => {
    organizeArr.value = res.data
  })
}

</script>

<template>
  <div class="w-full max-w-8xl mx-auto">
    <div class="z-20 pb-6 mb-6 flex items-center text-center" style="background-image: linear-gradient(120deg, #84fab0 0%, #8fd3f4 100%);">
      <div class="flex flex-col w-full justify-center items-center pt-6 md:pt-16">
        <div class="px-3">
          <h1 class="pt-6">
            <span class="bg-brand font-bold text-center text-white text-3xl sm:text-4xl px-3 mb-5 sm:mb-16" style="box-decoration-break: clone;-webkit-box-decoration-break: clone;"><span>Components</span></span>
          </h1>
          <p class="max-w-3xl mx-auto leading-normal my-6 font-bold text-base lg:text-xl text-left lg:text-center">不断增加中...</p>
        </div>
      </div>
    </div>
    <div class="grid grid-cols-4 gap-4">
      <el-card v-for="(item) in organizeArr" :key="item.id" :body-style="{ padding: '0px' }" @click="open(item.id)">
        <img
          :src="item.img"
          class="image"
        />
        <div style="padding: 14px">
          <span>{{ item.title }}</span>
          <div class="bottom">
            <time class="text-[12px] text-gray-400">{{ item.illustrate }}</time>
            <!-- <el-button text class="button">Operating</el-button> -->
          </div>
        </div>
      </el-card>
  </div>
  </div>
</template>

<style scoped lang="scss"></style>
