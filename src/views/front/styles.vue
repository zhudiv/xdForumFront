<!--
 * @Author: zdh
 * @Date: 2022-05-16 16:26:10
 * @LastEditTime: 2022-05-24 18:57:36
 * @Description: 
-->
<script lang="ts">
import { reactive, onMounted, toRefs, nextTick } from 'vue'
import { colorTest } from '@/apis/colorApi'
import _ from 'lodash'

interface Color {
  id: number
}

interface ColorResult {
  colorId: string,
  color: string,
  colors: any[]
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
        colorList: [] as ColorResult[]
      })

      onMounted(async () => {
        console.log("999999999")
        const { data} = await colorTest( {id: 1} )
        console.log('88888888')
        console.dir(data)
        let a = [{name: 1, key: 2}, {name: 3, key: 4}]
        console.dir(JSON.stringify(a))
        console.log('+++++')
        state.colorList = data.map( item =>{
          console.dir(item)
          console.dir(item.colors)
          console.dir(JSON.parse(item.colors))
          let tmp: ColorResult = {
            colorId: item.colorId,
            color: item.color,
            colors: JSON.parse(item.colors)

          }
          console.dir(tmp)
          return tmp
        })
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
          class="h-full scrolling-touch lg:h-auto lg:block lg:relative lg:sticky lg:bg-transparent overflow-hidden lg:top-18 bg-white mr-24 lg:mr-0"
        >
          <nav
            class="px-1 pt-6 font-medium text-base sm:px-3 xl:px-5 lg:text-sm pb-10 lg:pt-10 lg:pb-14 sticky?lg:h-(screen-18)"
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
