<!--
 * @Author: zdh
 * @Date: 2022-06-10 16:12:20
 * @LastEditTime: 2022-06-10 16:22:01
 * @Description: 
-->
<template>
<div id="content" class="think-content">
  <!-- 搜索栏 -->
    <GlobalSearch v-if="!formConfig.isHide" :page-loading.sync="pageSet.pageLoading" :loading.sync="loading" :config="formConfig" :search-arr.sync="searchArr" @doSearch="doSearch">
      <!-- 搜索栏插槽，最前面 -->
      <template slot="searchFormItem">
        <slot name="searchOptionsFirst" />
      </template>
      <!-- 搜索栏插槽，放置个性化筛选内容 -->
      <slot name="searchOptionsBefore" />
      <el-button v-if="formConfig.itemList.length > 0" type="primary" icon="el-icon-search" :size="formConfig.size" @click="doSearch" />
      <el-button v-if="!formConfig.refreshHide" icon="el-icon-refresh" :size="formConfig.size" @click="doSearch" />
      <!-- 搜索栏插槽，放置个性化筛选内容 -->
      <slot name="searchOptions" />
    </GlobalSearch>
</div>
</template>

<script>

</script>
<style lang="scss" scoped>
.xd-icon-delete{
  font-size: 14px;
}
::v-deep :focus{outline:0;}
</style>
