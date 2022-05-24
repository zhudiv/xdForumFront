<!--
 * @Author: zdh
 * @Date: 2022-05-16 16:26:10
 * @LastEditTime: 2022-05-24 10:48:28
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
    exchange..
  </div>
</template>

<style scoped lang="scss"></style>
