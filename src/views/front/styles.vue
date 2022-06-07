<!--
 * @Author: zdh
 * @Date: 2022-05-16 16:26:10
 * @LastEditTime: 2022-06-07 10:09:58
 * @Description: 
-->
<script setup lang="ts">
import { reactive, onMounted, toRefs, nextTick } from 'vue'
import { stylesList } from '@/apis/stylesApi'
// import _ from 'lodash'

const stylesListArr = ref()

interface Color {
  id: number
}

interface ColorResult {
  colorId: string,
  color: string,
  colors: any[]
}


stylesList(null).then(res => {
  console.log("-----------")

  let tmp = res.data;
  console.dir(tmp)
  let des = tmp.filter(item => {
    if(item.level == 1){
      item.children = []
      return true
    }
  })

  des.forEach(item => {
    tmp.forEach(s => {
      if(s.parentId == item.id){
        item.children.push(s)
      }
    })
  })
  stylesListArr.value = des
})



  // test().then(({ data }) => (tests.value = data))
</script>

<template>
  <div class="w-full max-w-8xl mx-auto">
    <div class="lg:flex bg-white">
      <div
        class="fixed z-40 inset-0 flex-none h-full bg-black bg-opacity-25 w-full lg:bg-white lg:static lg:h-auto lg:overflow-y-visible lg:pt-0 lg:w-60 xl:w-72 lg:block hidden"
      >
        <div
          class="h-full scrolling-touch lg:h-auto lg:block lg:relative lg:sticky lg:bg-transparent overflow-hidden lg:top-18 bg-white mr-24 lg:mr-0"
        >
          <nav
            class="px-1 pt-6 font-medium text-base sm:px-3 xl:px-5 lg:text-sm pb-10 lg:pt-10 lg:pb-14 sticky?lg:h-(screen-18)"
          >
            <ul>
              <li class="mt-8" v-for="item in stylesListArr" :key="item.id">
                <h5
                  class="px-3 mb-3 lg:mb-3 uppercase tracking-wide font-semibold text-sm lg:text-xs text-gray-900"
                >
                  {{ item.name }}
                </h5>
                <ul>
                  <li v-for="s in item.children" :key="s.id">
                    <a
                      class="px-3 py-2 transition-colors duration-200 relative block hover:text-gray-900 text-gray-500"
                      href="/front/styles/colors"
                      ><span
                        class="rounded-md absolute inset-0 bg-cyan-50 opacity-0"
                      ></span
                      ><span class="relative">{{ s.name }}</span></a
                    >
                  </li>
                </ul>
              </li>

              <li class="mt-8">
                <h5 class="px-3 mb-3 lg:mb-3 uppercase tracking-wide font-semibold text-sm lg:text-xs text-gray-900">
                  说明
                </h5>
              </li>
              <li class="mt-8">
                <h5
                  class="px-3 mb-3 lg:mb-3 uppercase tracking-wide font-semibold text-sm lg:text-xs text-gray-900"
                >
                  颜色
                </h5>
                <ul>
                  <li>
                    <a
                      class="px-3 py-2 transition-colors duration-200 relative block hover:text-gray-900 text-gray-500"
                      href="/front/styles/colors"
                      ><span
                        class="rounded-md absolute inset-0 bg-cyan-50 opacity-0"
                      ></span
                      ><span class="relative">配色</span></a
                    >
                  </li>
                </ul>
              </li>
              <li class="mt-8">
                <h5
                  class="px-3 mb-3 lg:mb-3 uppercase tracking-wide font-semibold text-sm lg:text-xs text-gray-900"
                >
                  按钮
                </h5>
                <ul>
                  <li>
                    <a
                      class="px-3 py-2 transition-colors duration-200 relative block hover:text-gray-900 text-gray-500"
                      href="/front/styles/buttons"
                      ><span
                        class="rounded-md absolute inset-0 bg-cyan-50 opacity-0"
                      ></span
                      ><span class="relative">说明</span></a
                    >
                  </li>
                </ul>
              </li>
            </ul>
          </nav>
        </div>
      </div>
      <div
        class="min-w-0 w-full flex-auto lg:static lg:max-h-full lg:overflow-visible"
      >
        <router-view />
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss"></style>
