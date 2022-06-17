<!--
 * @Author: zdh
 * @Date: 2022-06-16 14:08:16
 * @LastEditTime: 2022-06-17 09:08:30
 * @Description: 
-->
<script setup lang="ts">
import { ref, reactive, toRefs } from 'vue'
import { exchangeInsert, exchangeList, exchangeInfo } from '@/apis/exchangeApi'
import { ExchangePerUnit } from '@/apis/types/exchange'
import type { UploadRawFile, UploadFile, FormInstance, Action, UploadRequestHandler, UploadRequestOptions } from 'element-plus';
import { uploadVueImage } from '@/apis/uploadApi'
import { ElMessage, ElMessageBox } from 'element-plus';
import { Delete, Download, Plus, ZoomIn } from '@element-plus/icons-vue'
const mdFlag = ref(false)

const exchangeArr = ref<ExchangePerUnit[]>([])

const childRef = ref()

const uploadFile = ref();
const form = reactive({
  title: '',
  illustrate: ''
})

const url = ref('');

const state = reactive({
  bannerUrl: '',
  fileList: [],
  fileName: '',
})

const submit = function(){
  exchangeInsert({
    valueHtml: childRef.value.valueHtml
  }).then(res => {
    console.log('----------')
  })
}

onMounted( () => {
  getExchangeList()
})

const getExchangeList = function(){
  exchangeList().then( res => {
    exchangeArr.value = res.data
  })
}

const handleExceed = (files: File[], fileList: UploadFile[]) => {
  if (state.fileList.length >= 1) {
      ElMessage.error('只能上传一个图片')
      return;
  }
}

const beforeUpload = (file: UploadRawFile) => {
  const type = ['image/jpeg', 'image/jpg', 'image/png']
  if (type.indexOf(file.type) === -1) {
      ElMessage.error('上传的文件必须是JPG、JPEG、PNG三种之一!')
      return false
  } else if (file.size / 1024 / 1024 > 2) {
      ElMessage.error('图片大小不能超过2MB!')
      return false
  }
  return true
}

const dialogImageUrl = ref('')

const handleRemove = (file: UploadFile) => {
  console.log('-------handleRemove------------')
  console.log(file)
}

const handlePictureCardPreview = (file: UploadFile) => {
  console.log('--------handlePictureCardPreview-----------')
  // dialogImageUrl.value = file.url!
}

const handleDownload = (file: UploadFile) => {
  console.log('--------handleDownload-----------')
  console.log(file)
}

const uploadAction = (option: UploadRequestOptions) => {
  console.log('-------uploadAction------')
  let param = new FormData();
  param.append('file', option.file)
  // uploadVueImage(param).then((res: any) => {
  //     if (res && res.code === 0) {
  //         state.fileName = res.data.fileName;
  //         state.bannerUrl = res.data.imageUrl;
  //         ElMessage.success('图片上传成功！');
  //     } else {
  //         if (res && res.msg) {
  //             ElMessage.error(res.msg);
  //         } else {
  //             ElMessage.error('图片上传失败！');
  //         }
  //     }
  // })
  return uploadVueImage(param)
}


const handleSuccess = (data: any) => {
  console.log('--------success-----')

  url.value = data.data
}

const open = (id: number) => {
  console.log('-----open------')
  console.dir(id)
  mdFlag.value = true
  let param: ExchangePerUnit = {
    id: id,
    valueHtml: ''
  };
  
  

  exchangeInfo(param).then(res => {
    console.dir(res)
    var tmp:ExchangePerUnit  = {
      title: '',
      illustrate: '',
      valueHtml: ''
    }
    tmp = res.data as ExchangePerUnit

    form.title = tmp?.title as string
    form.illustrate = tmp.illustrate as string
    url.value = tmp.img as string
    childRef.value.valueHtml = tmp.organize
  })
}

</script>

<template>
<div class="bg-white rounded-sm shadow-sm h-full p-2">
  <div v-show="!mdFlag">
    <div class="container flex flex-col mx-auto w-full items-center justify-center">
      <ul class="flex flex-col">
          <li v-for="(item) in exchangeArr" :key="item.id" class="bg-gray-100 flex flex-row mb-2 w-[600px]" @click="open(item.id)">
              <div class="shadow border select-none cursor-pointer bg-blue rounded-md flex flex-1 items-center p-4">
                  <div class="flex flex-col w-10 h-10 justify-center items-center mr-4">
                      <a href="#" class="block relative">
                          <img alt="profil" :src="item.img" class="mx-auto object-cover rounded-full h-10 w-10 "/>
                      </a>
                  </div>
                  <div class="flex-1 pl-1 md:mr-16">
                      <div class="font-medium ">
                          {{ item.title }}
                      </div>
                      <div class="text-gray-600 dark:text-gray-200 text-sm">
                          {{ item.illustrate }}
                      </div>
                  </div>
                  <!-- <div class="text-gray-600 dark:text-gray-200 text-xs">
                      6:00 AM
                  </div> -->
                  <button class="w-24 text-right flex justify-end">
                      <svg width="12" fill="currentColor" height="12" class="hover:text-gray-800 dark:hover:text-white dark:text-gray-200 text-gray-500" viewBox="0 0 1792 1792" xmlns="http://www.w3.org/2000/svg">
                          <path d="M1363 877l-742 742q-19 19-45 19t-45-19l-166-166q-19-19-19-45t19-45l531-531-531-531q-19-19-19-45t19-45l166-166q19-19 45-19t45 19l742 742q19 19 19 45t-19 45z">
                          </path>
                      </svg>
                  </button>
              </div>
          </li>
      </ul>
    </div>
  </div>


  <!-- <EditorMarkdown v-show="mdFlag" class="w-full h-full"></EditorMarkdown> -->
  <div v-show="mdFlag">
    <el-form :model="form" label-width="120px">
      <el-form-item label="标题">
        <el-input v-model="form.title" />
      </el-form-item>
      <el-form-item label="说明">
        <el-input v-model="form.illustrate" />
      </el-form-item>
      <el-form-item label="主图">
        <el-upload
          list-type="picture-card"

              drag
              action="#"
          :http-request="uploadAction"
          :on-success="handleSuccess">
            <el-icon><Plus /></el-icon>

            <template #file="{ file }">
              <div>
                <img class="el-upload-list__item-thumbnail" :src="url" alt="" />
                <span class="el-upload-list__item-actions">
                  <span
                    class="el-upload-list__item-preview h-100 h-100"
                    @click="handlePictureCardPreview(file)"
                  >
                    <el-icon><zoom-in /></el-icon>
                  </span>
                  <span
                    class="el-upload-list__item-delete"
                    @click="handleDownload(file)"
                  >
                    <el-icon><Download /></el-icon>
                  </span>
                  <span
                    class="el-upload-list__item-delete"
                    @click="handleRemove(file)"
                  >
                    <el-icon><Delete /></el-icon>
                  </span>
                </span>
              </div>
            </template>
          </el-upload>
      </el-form-item>
      <el-form-item label="内容">
        <EditorWangEditor ref="childRef" class=" h-full"></EditorWangEditor>
      </el-form-item>
    </el-form>

    <ElButton @click="submit()">提交</ElButton>
    <ElButton @click="mdFlag = false">取消</ElButton>
  </div>
  
</div>
</template>

<style scoped lang="scss">

</style>