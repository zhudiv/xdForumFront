<!--
 * @Author: zdh
 * @Date: 2022-05-16 16:26:10
 * @LastEditTime: 2022-06-07 10:08:14
 * @Description: 
-->
<script lang="ts">
import { reactive, onMounted, toRefs, nextTick } from 'vue'
import { ColorResult, colorList } from '@/apis/colorApi'

interface Color {
  id: number
}

export default {
  setup() {
    const state = reactive({
      colorList: [] as ColorResult[]
    })

    onMounted(async () => {
      console.log("999999999")
      const { data} = await colorList( {id: 1} )
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
    components..
  </div>
</template>

<style scoped lang="scss"></style>
