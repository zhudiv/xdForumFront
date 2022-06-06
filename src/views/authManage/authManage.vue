<!--
 * @Author: zdh
 * @Date: 2022-05-30 16:57:30
 * @LastEditTime: 2022-06-02 11:04:50
 * @Description: 
-->
<script setup lang="ts">
import { userList } from '@/apis/userApi'
import { ref, onBeforeMount } from 'vue';
import type { FormInstance, FormRules } from 'element-plus'
import { ElMessage, ElMessageBox } from 'element-plus'

const userArr = ref()
const dialogFormVisible = ref(false)
const formLabelWidth = '140px'

const form = reactive({
  name: '',
  password: '',
  type: ''
})

const ruleFormRef = ref<FormInstance>()

const rules = reactive<FormRules>({
  name: [
    { required: true, message: '请输入用户名', trigger: 'blur' }
  ],
  password: [
    { required: true, message: '请输入密码', trigger: 'blur' },
    { min: 6, max: 20, message: '密码长度在 6-20 之间', trigger: 'blur' },
  ],
  type: [
    { required: true, message: '请选择权限', trigger: 'blur' }
  ]
})

const submitForm = async (formEl: FormInstance | undefined) => {
  if (!formEl) return
  await formEl.validate((valid, fields) => {
    if (valid) {
      open()
      console.log('submit!')
    } else {
      console.log('error submit!', fields)
    }
  })
}

const open = () => {
  ElMessageBox.confirm(
    '即将添加新用户，是否继续？?',
    '提醒',
    {
      confirmButtonText: '确认',
      cancelButtonText: '取消',
      type: 'warning',
    }
  )
    .then(() => {
      
      ElMessage({
        type: 'success',
        message: 'Delete completed',
      })
    })
    .catch(() => {
      ElMessage({
        type: 'info',
        message: 'Delete canceled',
      })
    })
}

onBeforeMount( () => {
  userList().then( res => {
    userArr.value = res.data
  })
})

</script>

<template>
<div class="container mx-auto px-4 sm:px-8">
    <div class="py-8">
        <div class="-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto">
            <div class="inline-block min-w-full shadow rounded-lg overflow-hidden">
                <el-table :data="userArr" style="width: 100%">
    <el-table-column label="用户名" width="180">
      <template #default="scope">
        <el-popover effect="light" trigger="hover" placement="top" width="auto">
          <template #default>
            <div>name: {{ scope.row.name }}</div>
          </template>
          <template #reference>
            <el-tag>{{ scope.row.name }}</el-tag>
          </template>
        </el-popover>
      </template>
    </el-table-column>
    <el-table-column label="密码" width="180">
      <template #default="scope">
        <div style="display: flex; align-items: center">
          <el-icon><timer /></el-icon>
          <span style="margin-left: 10px">{{ scope.row.password }}</span>
        </div>
      </template>
    </el-table-column>
    
    <el-table-column label="角色" width="180">
      <template #default="scope">
        <!-- <el-popover effect="light" trigger="hover" placement="top" width="auto"> -->
          <!-- <template #reference> -->
            <el-tag>{{ scope.row.type === '1' ? '超级管理员' : '管理员'}}</el-tag>
          <!-- </template> -->
        <!-- </el-popover> -->
      </template>
    </el-table-column>

    <el-table-column label="操作">
      <template #default="scope">
        <el-button size="small" @click="handleEdit(scope.$index, scope.row)"
          >修改</el-button
        >
        <el-button
          size="small"
          type="danger"
          @click="handleDelete(scope.$index, scope.row)"
          >删除</el-button
        >
      </template>
    </el-table-column>
  </el-table>

    <div class="flex justify-between bg-white p-2">
      <el-pagination style="background: #fff;" background layout="prev, pager, next" :total="userArr?.length " />
      <el-button type="primary" @click="dialogFormVisible = true">添加</el-button>
    </div>
                
                <!-- <el-pagination background layout="prev, pager, next" :total="20" /> -->

        
            </div>
        </div>
    </div>

<el-dialog v-model="dialogFormVisible" title="用户">
    <el-form :model="form" ref="ruleFormRef" :rules="rules">
      <el-form-item label="用户" :label-width="formLabelWidth" prop="name">
        <el-input v-model="form.name" autocomplete="off" />
      </el-form-item>
      <el-form-item label="密码" :label-width="formLabelWidth" prop="password">
        <el-input v-model="form.password" autocomplete="off" />
      </el-form-item>
      <el-form-item label="权限" :label-width="formLabelWidth" prop="type">
        <el-select v-model="form.type" placeholder="请选择权限">
          <el-option label="超级管理员" value="1" />
          <el-option label="管理员" value="2" />
          <el-option label="普通用户" value="3" />
          <el-option label="其他" value="0" />
        </el-select>
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取消</el-button>
        <el-button type="primary" @click="submitForm(ruleFormRef)">确认</el-button
        >
      </span>
    </template>
  </el-dialog>
</div>
</template>

<style scoped lang="scss">

</style>