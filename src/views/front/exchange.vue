<!--
 * @Author: zdh
 * @Date: 2022-05-16 16:26:10
 * @LastEditTime: 2022-06-17 08:59:45
 * @Description: 
-->
<script lang="ts" setup>
import { exchangeInsert, exchangeList, exchangeInfo } from '@/apis/exchangeApi'
import { ExchangePerUnit } from '@/apis/types/exchange'
const exchangeArr = ref<ExchangePerUnit[]>([])

onMounted( () => {
  getExchangeList()
})

const getExchangeList = function(){
  exchangeList().then( res => {
    exchangeArr.value = res.data
  })
}

  // test().then(({ data }) => (tests.value = data))
</script>

<template>
  <div class="w-full max-w-8xl mx-auto">
    <div class="container flex flex-col mx-auto w-full items-center justify-center">
    <ul class="flex flex-col">
        <li v-for="(item) in exchangeArr" :key="item.id" class="bg-gray-100 flex flex-row mb-2 w-[600px]" @click="open(item.id)">
            <div class="shadow border select-none cursor-pointer bg-blue rounded-md flex flex-1 items-center p-4">
                <div class="flex flex-col w-10 h-10 justify-center items-center mr-4">
                    <a href="#" class="block relative">
                        <img alt="profil" :src="item.img" class="mx-auto object-cover rounded-full h-10 w-10 "/>
                    </a>
                </div>
                <div class="flex-1 pl-1 md:mr-16">
                    <div class="font-medium ">
                        {{ item.title }}
                    </div>
                    <div class="text-gray-600 dark:text-gray-200 text-sm">
                        {{ item.illustrate }}
                    </div>
                </div>
                <!-- <div class="text-gray-600 dark:text-gray-200 text-xs">
                    6:00 AM
                </div> -->
                <button class="w-24 text-right flex justify-end">
                    <svg width="12" fill="currentColor" height="12" class="hover:text-gray-800 dark:hover:text-white dark:text-gray-200 text-gray-500" viewBox="0 0 1792 1792" xmlns="http://www.w3.org/2000/svg">
                        <path d="M1363 877l-742 742q-19 19-45 19t-45-19l-166-166q-19-19-19-45t19-45l531-531-531-531q-19-19-19-45t19-45l166-166q19-19 45-19t45 19l742 742q19 19 19 45t-19 45z">
                        </path>
                    </svg>
                </button>
            </div>
        </li>
    </ul>
  </div>
  </div>
</template>

<style scoped lang="scss"></style>
