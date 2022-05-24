<!--
 * @Author: zdh
 * @Date: 2022-05-24 18:56:16
 * @LastEditTime: 2022-05-24 19:26:20
 * @Description: 
-->
<script setup lang="ts">
import { reactive, onMounted, toRefs, nextTick } from 'vue'
import { colorTest } from '@/apis/colorApi'
</script>


<template>
<div class="w-full flex">
  <div class="min-w-0 flex-auto px-4 sm:px-6 xl:px-8 pt-10 pb-24 lg:pb-16">
    <div class="pb-10">
      <div><h1 class="inline-block text-3xl font-extrabold text-gray-900 tracking-tight">按钮</h1></div>
      <p class="mt-1 text-lg text-gray-500">按钮用于开始一个即时操作。</p>
    </div>

    <div class="overflow-y-auto scrollbar-w-2 scrollbar-track-gray-lighter scrollbar-thumb-rounded scrollbar-thumb-gray scrolling-touch lg:max-h-sm">
      
      <el-button>默认按钮</el-button>
      
      <table class="w-full text-left border-collapse"><thead><tr><th class="z-20 sticky top-0 text-sm font-semibold text-gray-600 bg-white p-0"><div class="pb-2 pr-2 border-b border-gray-200">Class</div></th><th class="z-20 sticky top-0 text-sm font-semibold text-gray-600 bg-white p-0"><div class="pb-2 pl-2 border-b border-gray-200">Properties</div></th></tr></thead><tbody class="align-baseline"><tr><td translate="no" class="py-2 pr-2 font-mono text-xs text-violet-600 whitespace-nowrap">leading-3</td><td translate="no" class="py-2 pl-2 font-mono text-xs text-light-blue-600 whitespace-pre">line-height: .75rem;</td></tr><tr><td translate="no" class="py-2 pr-2 font-mono text-xs text-violet-600 whitespace-nowrap border-t border-gray-200">leading-4</td><td translate="no" class="py-2 pl-2 font-mono text-xs text-light-blue-600 whitespace-pre border-t border-gray-200">line-height: 1rem;</td></tr><tr><td translate="no" class="py-2 pr-2 font-mono text-xs text-violet-600 whitespace-nowrap border-t border-gray-200">leading-5</td><td translate="no" class="py-2 pl-2 font-mono text-xs text-light-blue-600 whitespace-pre border-t border-gray-200">line-height: 1.25rem;</td></tr><tr><td translate="no" class="py-2 pr-2 font-mono text-xs text-violet-600 whitespace-nowrap border-t border-gray-200">leading-6</td><td translate="no" class="py-2 pl-2 font-mono text-xs text-light-blue-600 whitespace-pre border-t border-gray-200">line-height: 1.5rem;</td></tr><tr><td translate="no" class="py-2 pr-2 font-mono text-xs text-violet-600 whitespace-nowrap border-t border-gray-200">leading-7</td><td translate="no" class="py-2 pl-2 font-mono text-xs text-light-blue-600 whitespace-pre border-t border-gray-200">line-height: 1.75rem;</td></tr><tr><td translate="no" class="py-2 pr-2 font-mono text-xs text-violet-600 whitespace-nowrap border-t border-gray-200">leading-8</td><td translate="no" class="py-2 pl-2 font-mono text-xs text-light-blue-600 whitespace-pre border-t border-gray-200">line-height: 2rem;</td></tr><tr><td translate="no" class="py-2 pr-2 font-mono text-xs text-violet-600 whitespace-nowrap border-t border-gray-200">leading-9</td><td translate="no" class="py-2 pl-2 font-mono text-xs text-light-blue-600 whitespace-pre border-t border-gray-200">line-height: 2.25rem;</td></tr><tr><td translate="no" class="py-2 pr-2 font-mono text-xs text-violet-600 whitespace-nowrap border-t border-gray-200">leading-10</td><td translate="no" class="py-2 pl-2 font-mono text-xs text-light-blue-600 whitespace-pre border-t border-gray-200">line-height: 2.5rem;</td></tr><tr><td translate="no" class="py-2 pr-2 font-mono text-xs text-violet-600 whitespace-nowrap border-t border-gray-200">leading-none</td><td translate="no" class="py-2 pl-2 font-mono text-xs text-light-blue-600 whitespace-pre border-t border-gray-200">line-height: 1;</td></tr><tr><td translate="no" class="py-2 pr-2 font-mono text-xs text-violet-600 whitespace-nowrap border-t border-gray-200">leading-tight</td><td translate="no" class="py-2 pl-2 font-mono text-xs text-light-blue-600 whitespace-pre border-t border-gray-200">line-height: 1.25;</td></tr><tr><td translate="no" class="py-2 pr-2 font-mono text-xs text-violet-600 whitespace-nowrap border-t border-gray-200">leading-snug</td><td translate="no" class="py-2 pl-2 font-mono text-xs text-light-blue-600 whitespace-pre border-t border-gray-200">line-height: 1.375;</td></tr><tr><td translate="no" class="py-2 pr-2 font-mono text-xs text-violet-600 whitespace-nowrap border-t border-gray-200">leading-normal</td><td translate="no" class="py-2 pl-2 font-mono text-xs text-light-blue-600 whitespace-pre border-t border-gray-200">line-height: 1.5;</td></tr><tr><td translate="no" class="py-2 pr-2 font-mono text-xs text-violet-600 whitespace-nowrap border-t border-gray-200">leading-relaxed</td><td translate="no" class="py-2 pl-2 font-mono text-xs text-light-blue-600 whitespace-pre border-t border-gray-200">line-height: 1.625;</td></tr><tr><td translate="no" class="py-2 pr-2 font-mono text-xs text-violet-600 whitespace-nowrap border-t border-gray-200">leading-loose</td><td translate="no" class="py-2 pl-2 font-mono text-xs text-light-blue-600 whitespace-pre border-t border-gray-200">line-height: 2;</td></tr></tbody></table></div>
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
.markdown{
  @apply text-black text-2xl leading-3
}
</style>