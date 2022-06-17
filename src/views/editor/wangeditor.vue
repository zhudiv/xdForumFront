<!--
 * @Author: zdh
 * @Date: 2022-05-07 17:12:55
 * @LastEditTime: 2022-06-16 14:30:25
 * @Description: 
-->
<script setup lang="ts">
import { ref } from 'vue'
const content = ref('')
</script>

<template>
  <div class>
    <EditorWangEditor v-model="content" />
    <div class="bg-gray-100 mt-3 border p-3">{{ content }}</div>
  </div>
</template>
