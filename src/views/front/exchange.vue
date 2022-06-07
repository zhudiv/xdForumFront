<!--
 * @Author: zdh
 * @Date: 2022-05-16 16:26:10
 * @LastEditTime: 2022-06-07 10:09:35
 * @Description: 
-->
<script lang="ts">
import { reactive, onMounted, toRefs, nextTick } from 'vue'
import { colorList } from '@/apis/colorApi'

interface Color {
  colorId: string,
  color: string,
  colors: string
}


export default {
  setup() {
    const state = reactive({
      colorList: [] as Color[]
    })

    onMounted(async () => {
      const { data} = await colorList( {id: 1} )
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
