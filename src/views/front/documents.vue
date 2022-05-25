<!--
 * @Author: zdh
 * @Date: 2022-05-16 16:26:10
 * @LastEditTime: 2022-05-25 14:25:19
 * @Description: 
-->
<script lang="ts">
import { reactive, onMounted, toRefs, nextTick } from 'vue'
import { ColorResult, colorTest } from '@/apis/colorApi'

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
        colorList: [] as ColorResult[]
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
  <div class="w-full max-w-8xl mx-auto z-10">
    <main class="min-h-screen w-full bg-gray-100 text-gray-700">
        <div class="flex">
            <aside class="flex w-72 flex-col space-y-2 border-r-2 border-gray-200 bg-white p-2 overflow-y-auto" style="height: 90.5vh">
                <a href="#" class="flex items-center space-x-1 rounded-md px-2 py-3 hover:bg-gray-100 hover:text-blue-600">
                    <span class="text-xl w-6"><i class="fas fa-a"></i></span>
                    <span>字体</span>
                </a>

                <a href="#" class="flex items-center space-x-1 rounded-md px-2 py-3 hover:bg-gray-100 hover:text-blue-600">
                    <span class="text-xl w-6"><i class="fas fa-icons"></i></span>
                    <span>图标</span>
                </a>

                <a href="#" class="flex items-center space-x-1 rounded-md px-2 py-3 hover:bg-gray-100 hover:text-blue-600">
                    <span class="text-xl w-6"><i class="fab fa-connectdevelop"></i></span>
                    <span>模板引擎</span>
                </a>
                <a href="#" class="flex items-center space-x-1 rounded-md px-2 py-3 hover:bg-gray-100 hover:text-blue-600">
                    <span class="text-xl w-6"><i class="fab fa-leanpub"></i></span>
                    <span>学习网站</span>
                </a>

                <a href="#" class="flex items-center space-x-1 rounded-md px-2 py-3 hover:bg-gray-100 hover:text-blue-600">
                    <span class="text-2xl"><i class="bx bx-heart"></i></span>
                    <span>My Favourite</span>
                </a>

                <a href="#" class="flex items-center space-x-1 rounded-md px-2 py-3 hover:bg-gray-100 hover:text-blue-600">
                    <span class="text-2xl"><i class="bx bx-user"></i></span>
                    <span>Profile</span>
                </a>
            </aside>

            <div class="w-full p-4 bg-white ml-2 mr-2 overflow-y-auto">
              <section>
                <h2 class="text-2xl tracking-tight font-extrabold text-gray-900 mt-10 mb-8">图标</h2>
                <ul class="grid sm:grid-cols-2 gap-6 xl:gap-8">
                  <li class="flex items-start space-x-4 p-2 hover:border-2  hover:shadow-sm hover:rounded-md">
                    <a class="fab fa-autoprefixer text-4xl bg-gray-100 p-2 rounded-xl hover:text-blue-400 border-1 hover:cursor-pointer"
                            href="https://www.iconfont.cn/manage/index?spm=a313x.7781069.1998910419.20&manage_type=myprojects&projectId=2026639&keyword=&project_type=&page=" target="_blank"></a>
                      <div class="flex-auto">
                        <h3 class="font-bold text-gray-900">ThinkRD 1.0</h3>
                        <p class="hidden sm:block">老项目的图标库</p>
                      </div>
                  </li>
                  <li class="flex items-start space-x-4 p-2 hover:border-2  hover:shadow-sm hover:rounded-md">
                    <a class="fab fa-app-store text-4xl bg-gray-100 p-2 rounded-xl hover:text-blue-400 border-1 hover:cursor-pointer"
                            href="https://www.iconfont.cn/manage/index?spm=a313x.7781069.1998910419.20&manage_type=myprojects&projectId=1606220&keyword=&project_type=&page="></a>
                      <div class="flex-auto">
                        <h3 class="font-bold text-gray-900">ThinkRD 2.0</h3>
                        <p class="hidden sm:block">新项目的图标库</p>
                      </div>
                  </li>
                </ul>
              </section>

              <section>
                <h2 class="text-2xl tracking-tight font-extrabold text-gray-900 mt-10 mb-8">模板引擎</h2>
                <ul class="grid sm:grid-cols-2 gap-6 xl:gap-8">
                  <li class="hover:border-2  hover:shadow-sm hover:rounded-md">
                    <a href="https://www.lodashjs.com/" target="_blank" class="flex items-start space-x-4 p-2">
                      <img src="/images/documents/lo.png" class="w-16 h-16 object-cover rounded-full border-8 border-white mb-5" />
                    <div class="flex-auto">
                      <h3 class="font-bold text-gray-900">Lodash</h3>
                      <p class="hidden sm:block">Lodash 通过降低 array、number、objects、string 等等的使用难度从而让 JavaScript 变得更简单。 Lodash 的模块化方法 非常适用于</p>
                    </div>
                     </a>
                  </li>
                </ul>
              </section>

              <section>
                <h2 class="text-2xl tracking-tight font-extrabold text-gray-900 mt-10 mb-8">学习网站</h2>
                <ul class="grid sm:grid-cols-2 gap-6 xl:gap-8">
                  <li class="hover:border-2  hover:shadow-sm hover:rounded-md">
                    <a href="https://www.houdunren.com/" target="_blank" class="flex items-start space-x-4 p-2">
                      <img src="/images/documents/houdunren.png" class="w-16 h-16 object-cover rounded-full border-8 border-white mb-5" />
                    <div class="flex-auto">
                      <h3 class="font-bold text-gray-900">后盾人</h3>
                      <p class="hidden sm:block">传播互联网前沿技术</p>
                    </div>
                     </a>
                  </li>
                </ul>
              </section>
            </div>
        </div>
    </main>
  </div>
</template>

<style scoped lang="scss"></style>
