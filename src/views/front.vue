<script setup lang="ts">
import Navbar from '../layouts/public/navbar.vue'
</script>

<template>
  <div>
    <Navbar />
    <router-view />
  </div>
</template>

<style lang="scss" scoped>
.article {
  padding: 30px;
  width: 100vw;
  height: 100vh;
  position: relative;
  background-color: #34495e;
  ul {
    li {
      padding: 10px;
      margin-bottom: 20px;
      background: #f1c40f;
      color: #333;
      border-radius: 5px;
    }
  }
}
</style>
