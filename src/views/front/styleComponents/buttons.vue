<!--
 * @Author: zdh
 * @Date: 2022-05-24 18:56:16
 * @LastEditTime: 2022-06-07 10:10:10
 * @Description: 
-->
<script setup lang="ts">
import { reactive, onMounted, toRefs, nextTick } from 'vue'
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

      <div class="overflow-hidden rounded-md bg-purple-400 mt-2">
        <pre class="flex align-middle scrollbar-none overflow-x-auto text-sm leading-snug language-html text-white bg-black bg-opacity-75">
          <code class="language-html">
            <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>el-button</span><span class="token attr-value"></span><span class="token punctuation">&gt;</span></span>默认按钮<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>el-button</span><span class="token punctuation">&gt;</span></span>
          </code>
          </pre>
      </div>
      <table class="w-full text-left border-collapse mt-5">
        <thead>
          <tr>
            <th class="z-20 sticky top-0 text-sm font-semibold text-gray-600 bg-white p-0">
              <div class="pb-2 pr-2 border-b border-gray-200">颜色</div>
            </th>
            <th class="z-20 sticky top-0 text-sm font-semibold text-gray-600 bg-white p-0">
              <div class="pb-2 pl-2 border-b border-gray-200">
                Code
              </div>
            </th>
            <th class="z-20 sticky top-0 text-sm font-semibold text-gray-600 bg-white p-0">
              <div class="pb-2 pr-2 border-b border-gray-200">预览</div>
            </th>
          </tr>
        </thead>
        <tbody class="align-baseline">
          <tr>
            <td translate="no" class="py-2 pr-2 font-mono text-xs text-grey whitespace-nowrap">
              <div class="flex">
                <div class="w-4 h-4 bg-green-500"></div>
                <span class="ml-2">主要操作</span>
              </div>
            </td>
            <td translate="no" class="py-2 pl-2 font-mono text-xs text-light-blue-600 whitespace-pre">
              <code class="language-html">
                <span class="token tag">
                  <span class="token tag">
                    <span class="token punctuation">&lt;</span>el-button type=<span class="token punctuation">"</span>success<span class="token punctuation">"</span>
                  </span>
                  <span class="token attr-value"></span>
                  <span class="token punctuation">&gt;</span>
                </span>主要操作<span class="token tag">
                  <span class="token tag">
                    <span class="token punctuation">&lt;/</span>el-button</span>
                  <span class="token punctuation">&gt;</span>
                </span>
              </code>
            </td>
            <td translate="no" class="py-2 pl-2 font-mono text-xs text-light-blue-600 whitespace-pre">
              <el-button type="success">主要操作</el-button>
            </td>
          </tr>
          <tr>
            <td translate="no" class="py-2 pr-2 font-mono text-xs text-grey whitespace-nowrap">
              <div class="flex">
                <div class="w-4 h-4 bg-blue-500"></div>
                <span class="ml-2">辅助操作</span>
              </div>
            </td>
            <td translate="no" class="py-2 pl-2 font-mono text-xs text-light-blue-600 whitespace-pre">
              <code class="language-html">
                <span class="token tag">
                  <span class="token tag">
                    <span class="token punctuation">&lt;</span>el-button type=<span class="token punctuation">"</span>primary<span class="token punctuation">"</span>
                  </span>
                  <span class="token attr-value"></span>
                  <span class="token punctuation">&gt;</span>
                </span>辅助操作<span class="token tag">
                  <span class="token tag">
                    <span class="token punctuation">&lt;/</span>el-button</span>
                  <span class="token punctuation">&gt;</span>
                </span>
              </code>
            </td>
            <td translate="no" class="py-2 pl-2 font-mono text-xs text-light-blue-600 whitespace-pre">
              <el-button type="primary">辅助操作</el-button>
            </td>
          </tr>

          <tr>
            <td translate="no" class="py-2 pr-2 font-mono text-xs text-grey whitespace-nowrap">
              <div class="flex">
                <div class="w-4 h-4 bg-yellow-500"></div>
                <span class="ml-2">警示操作</span>
              </div>
            </td>
            <td translate="no" class="py-2 pl-2 font-mono text-xs text-light-blue-600 whitespace-pre">
              <code class="language-html">
                <span class="token tag">
                  <span class="token tag">
                    <span class="token punctuation">&lt;</span>el-button type=<span class="token punctuation">"</span>warning<span class="token punctuation">"</span>
                  </span>
                  <span class="token attr-value"></span>
                  <span class="token punctuation">&gt;</span>
                </span>警示操作<span class="token tag">
                  <span class="token tag">
                    <span class="token punctuation">&lt;/</span>el-button</span>
                  <span class="token punctuation">&gt;</span>
                </span>
              </code>
            </td>
            <td translate="no" class="py-2 pl-2 font-mono text-xs text-light-blue-600 whitespace-pre">
              <el-button type="warning">警示操作</el-button>
            </td>
          </tr>
          
          <tr>
            <td translate="no" class="py-2 pr-2 font-mono text-xs text-grey whitespace-nowrap">
              <div class="flex">
                <div class="w-4 h-4 bg-red-500"></div>
                <span class="ml-2">流程中断操作</span>
              </div>
            </td>
            <td translate="no" class="py-2 pl-2 font-mono text-xs text-light-blue-600 whitespace-pre">
              <code class="language-html">
                <span class="token tag">
                  <span class="token tag">
                    <span class="token punctuation">&lt;</span>el-button type=<span class="token punctuation">"</span>danger<span class="token punctuation">"</span>
                  </span>
                  <span class="token attr-value"></span>
                  <span class="token punctuation">&gt;</span>
                </span>流程中断操作<span class="token tag">
                  <span class="token tag">
                    <span class="token punctuation">&lt;/</span>el-button</span>
                  <span class="token punctuation">&gt;</span>
                </span>
              </code>
            </td>
            <td translate="no" class="py-2 pl-2 font-mono text-xs text-light-blue-600 whitespace-pre">
              <el-button type="danger">流程中断操作</el-button>
            </td>
          </tr>

          <tr>
            <td translate="no" class="py-2 pr-2 font-mono text-xs text-grey whitespace-nowrap">
              <div class="flex">
                <div class="w-4 h-4 bg-gray-300"></div>
                <span class="ml-2">次要操作</span>
              </div>
            </td>
            <td translate="no" class="py-2 pl-2 font-mono text-xs text-light-blue-600 whitespace-pre">
              <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>el-button</span><span class="token attr-value"></span><span class="token punctuation">&gt;</span></span>次要操作<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>el-button</span><span class="token punctuation">&gt;</span></span>
            </td>
            <td translate="no" class="py-2 pl-2 font-mono text-xs text-light-blue-600 whitespace-pre">
              <el-button>次要操作</el-button>
            </td>
          </tr>
        </tbody>
      </table>
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
.markdown{
  @apply text-black text-2xl leading-3
}
</style>