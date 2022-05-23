<!--
 * @Author: zdh
 * @Date: 2022-05-16 16:26:10
 * @LastEditTime: 2022-05-23 16:55:35
 * @Description: 
-->
<script lang="ts">
import { reactive, onMounted, toRefs, nextTick } from 'vue'
import { colorTest } from '@/apis/colorApi'

interface Color {
  id: number
}

  // console.dir(colorTest)
  // const colorList = ref()
  // colorTest( {id: 1} ).then( result  => {
  //   // tests.value = data
  //   // console.log('777777777777')
  //   // console.dir(data)
  //   colorList.value = result.data
  // })

  export default {
    setup() {
      const state = reactive({
        colorList: [] as Color[]
      })

      onMounted(async () => {
        console.log("999999999")
        const { data} = await colorTest( {id: 1} )
        console.log('88888888')
        console.dir(data)
        state.colorList = data
      })
      const addColorGroup = (v:any) => {
        console.log('77777')
        console.dir(v)
      }

      return {
        ...toRefs(state),
        addColorGroup
      }
    }
  }

  // test().then(({ data }) => (tests.value = data))
</script>

<template>
  <div class="w-full max-w-8xl mx-auto">
    <div class="lg:flex bg-white">
      <div
        class="fixed z-40 inset-0 flex-none h-full bg-black bg-opacity-25 w-full lg:bg-white lg:static lg:h-auto lg:overflow-y-visible lg:pt-0 lg:w-60 xl:w-72 lg:block hidden"
      >
        <div
          class="h-full overflow-y-auto scrolling-touch lg:h-auto lg:block lg:relative lg:sticky lg:bg-transparent overflow-hidden lg:top-18 bg-white mr-24 lg:mr-0"
        >
          <nav
            class="px-1 pt-6 overflow-y-auto font-medium text-base sm:px-3 xl:px-5 lg:text-sm pb-10 lg:pt-10 lg:pb-14 sticky?lg:h-(screen-18)"
          >
            <ul>
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
                      href="/front/styles/common"
                      ><span
                        class="rounded-md absolute inset-0 bg-cyan-50 opacity-0"
                      ></span
                      ><span class="relative">Preflight</span></a
                    >
                  </li>
                </ul>
              </li>
              <li>2</li>
            </ul>
          </nav>
        </div>
      </div>
      <div
        class="min-w-0 w-full flex-auto lg:static lg:max-h-full lg:overflow-visible"
      >
        <router-view />
        <div class="w-full flex">
          <div
            class="min-w-0 flex-auto px-4 sm:px-6 xl:px-8 pt-10 pb-24 lg:pb-16"
          >
            <div>
              <div class="grid grid-cols1 gap-8">
                <div v-for="(item) in colorList" :key="item.id">
                  <div
                    class="flex flex-col space-y-3 sm:flex-row text-xs sm:space-y-0 sm:space-x-4"
                  >
                    <div class="w-32 flex-shrink-0">
                      <div class="h-10 flex flex-col justify-center">
                        <div class="text-sm font-semibold text-gray-900">
                          {{ item.color }}
                        </div>
                        <div>
                          <code class="text-xs text-gray-500">
                            colors.{{ item.color }}
                          </code>
                        </div>
                      </div>
                    </div>
                    <div
                      class="min-w-0 flex-1 grid grid-cols-5 2xl:grid-cols-10 gap-x-4 gap-y-3 2xl:gap-x-2"
                    >
                      <div class="space-y-1.5">
                        <div
                          class="h-10 w-full rounded ring-1 ring-inset ring-black ring-opacity-0"
                          style="background-color: #0097fd"
                        ></div>
                        <div
                          class="px-0.5 md:flex md:justify-between md:space-x-2 2xl:space-x-0 2xl:block"
                        >
                          <div class="w-6 font-medium text-gray-900">-</div>
                          <div>#0097FD</div>
                        </div>
                      </div>
                      <div class="space-y-1.5">
                        <div
                          class="h-10 w-full rounded ring-1 ring-inset ring-black ring-opacity-0"
                          style="background-color: #e6f1fc"
                        ></div>
                        <div
                          class="px-0.5 md:flex md:justify-between md:space-x-2 2xl:space-x-0 2xl:block"
                        >
                          <div class="w-6 font-medium text-gray-900">100</div>
                          <div>#E6F1FC</div>
                        </div>
                      </div>
                      <div class="space-y-1.5">
                        <div
                          class="h-10 w-full rounded ring-1 ring-inset ring-black ring-opacity-0"
                          style="background-color: #A3D0FD"
                        ></div>
                        <div
                          class="px-0.5 md:flex md:justify-between md:space-x-2 2xl:space-x-0 2xl:block"
                        >
                          <div class="w-6 font-medium text-gray-900">200</div>
                          <div>#A3D0FD</div>
                        </div>
                      </div>
                      <div class="space-y-1.5">
                        <div
                          class="h-10 w-full rounded ring-1 ring-inset ring-black ring-opacity-0"
                          style="background-color: #0587ff"
                        ></div>
                        <div
                          class="px-0.5 md:flex md:justify-between md:space-x-2 2xl:space-x-0 2xl:block"
                        >
                          <div class="w-6 font-medium text-gray-900">300</div>
                          <div>#0587ff</div>
                        </div>
                      </div>
                      <div class="space-y-1.5">
                        <div
                          class="h-10 w-full rounded ring-1 ring-inset ring-black ring-opacity-0"
                          style="background-color: #1d4ed8"
                        ></div>
                        <div
                          class="px-0.5 md:flex md:justify-between md:space-x-2 2xl:space-x-0 2xl:block"
                        >
                          <div class="w-6 font-medium text-gray-900">400</div>
                          <div>#1d4ed8</div>
                        </div>
                      </div>
                      <div class="space-y-1.5">
                        <div
                          class="h-10 w-full rounded ring-1 ring-inset ring-black ring-opacity-0"
                          style="background-color: #1e40af"
                        ></div>
                        <div
                          class="px-0.5 md:flex md:justify-between md:space-x-2 2xl:space-x-0 2xl:block"
                        >
                          <div class="w-6 font-medium text-gray-900">500</div>
                          <div>#1e40af</div>
                        </div>
                      </div>
                      <div class="space-y-1.5">
                        <div
                          class="h-10 w-full rounded ring-1 ring-inset ring-black ring-opacity-0"
                          style="background-color: #1e3a8a"
                        ></div>
                        <div
                          class="px-0.5 md:flex md:justify-between md:space-x-2 2xl:space-x-0 2xl:block"
                        >
                          <div class="w-6 font-medium text-gray-900">600</div>
                          <div>#1e3a8a</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="border-gray-200 rounded-md border-2 border-dotted flex align-middle justify-center p-2">
                <i class="fas fa-plus text-gray-400 text-2xl cursor-pointer" @click="addColorGroup()"></i>
              </div>
            </div>
          </div>
          <div class="hidden xl:text-sm xl:block flex-none w-64 pl-8 mr-8">
            <div
              class="flex flex-col justify-between overflow-y-auto sticky max-h-(screen-18) pt-10 pb-6 top-18"
            >
              <div class="mb-8">
                <h5
                  class="text-gray-900 uppercase tracking-wide font-semibold mb-3 text-sm lg:text-xs"
                >
                  本页目录
                </h5>
                <ul class="">
                  <li>
                    <a
                      href="#class-refrence"
                      class="block transform transition-colors duration-200 py-2 hover:text-gray-900"
                      >test</a
                    >
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss"></style>
