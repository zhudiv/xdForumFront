<script lang="ts">
import { reactive, onMounted, toRefs, nextTick } from 'vue'
import { colorTest } from '@/apis/colorApi'
// import _ from 'lodash'

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
        const { data} = await colorTest( {id: 1} )

        let a = [{name: 1, key: 2}, {name: 3, key: 4}]

        state.colorList = data.map( item =>{
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
<div class="w-full flex">
  <div
    class="min-w-0 flex-auto px-4 sm:px-6 xl:px-8 pt-10 pb-24 lg:pb-16"
  >
    <div>
      <div class="grid grid-cols1 gap-8">
        <div v-for="(item, index) in colorList" :key="'color'+ index">
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
              <div class="space-y-1.5" v-for="(s) in item.colors" :key="s.id">
                <div
                  class="h-10 w-full rounded ring-1 ring-inset ring-black ring-opacity-0"
                  :style="'background-color: ' + s.key"
                ></div>
                <div
                  class="px-0.5 md:flex md:justify-between md:space-x-2 2xl:space-x-0 2xl:block"
                >
                  <div class="w-6 font-medium text-gray-900">{{ s.name }}</div>
                  <div>{{s.key}}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <!-- <div class="border-gray-200 rounded-md border-2 border-dotted flex align-middle justify-center p-2">
        <i class="fas fa-plus text-gray-400 text-2xl cursor-pointer" @click="addColorGroup()"></i>
      </div> -->
    </div>
  </div>
  <div class="hidden xl:text-sm xl:block flex-none w-64 pl-8 mr-8">
    <div
      class="flex flex-col justify-between  sticky max-h-(screen-18) pt-10 pb-6 top-18"
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
</template>

<style scoped lang="scss">

</style>