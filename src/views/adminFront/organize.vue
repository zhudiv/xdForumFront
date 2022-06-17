<!--
 * @Author: zdh
 * @Date: 2022-06-16 14:08:16
 * @LastEditTime: 2022-06-17 09:34:32
 * @Description: 
-->
<script setup lang="ts">
import { ref, reactive, toRefs } from 'vue'
import { organizeInsert, organizeList, organizeInfo } from '@/apis/organizeApi'
import { OrganizePerUnit } from '@/apis/types/organize'
import type { UploadRawFile, UploadFile, FormInstance, Action, UploadRequestHandler, UploadRequestOptions } from 'element-plus';
import { uploadVueImage } from '@/apis/uploadApi'
import { ElMessage, ElMessageBox } from 'element-plus';
import { Delete, Download, Plus, ZoomIn } from '@element-plus/icons-vue'
const mdFlag = ref(false)
const htmlFlag = ref(false)

const organizeArr = ref<OrganizePerUnit[]>([])

const childRef = ref()

const content = ref('')

const content2 = ref('')

const uploadFile = ref();
const form = reactive({
  title: '',
  illustrate: ''
})
const state = reactive({
  bannerUrl: '',
  fileList: [],
  fileName: '',
})

const submit = function(){

let replaceRegex = /(\n\r|\r\n|\r|\n)/g
  organizeInsert({
    valueHtml: content.value.replace(replaceRegex, '<br/>')
  }).then(res => {
    console.log('----------')
  })
}

onMounted( () => {
  getOrganizeList()
})

const getOrganizeList = function(){
  organizeList().then( res => {
    organizeArr.value = res.data
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

const uploadA = (options: UploadRequestOptions) => {
  
}

const handleSuccess = (data: any) => {
  console.log('--------success-----')

  state.bannerUrl = data.data
}

const open = (id: number) => {
  console.log('-----open------')
  console.dir(id)
  htmlFlag.value = true
  let param: OrganizePerUnit = {
    id: id,
    valueHtml: ''
  };
  
  

  organizeInfo(param).then(res => {
    console.dir(res)
    var tmp:OrganizePerUnit  = {
      title: '',
      illustrate: '',
      valueHtml: '',
      organize: ''
    }
    tmp = res.data as OrganizePerUnit

    content2.value = tmp.organize
  })
}

</script>

<template>
<div>
  <div class="grid grid-cols-4 gap-4">
    <!-- <div v-for="(item) in organizeArr" :key="item.id">
      <img class="w-60 h-60 object-fill" :src="item.img" />
      <div>
        {{ item.title }}
        {{ item.illustrate }}
      </div>
    </div> -->
    <el-card v-for="(item) in organizeArr" :key="item.id" :body-style="{ padding: '0px' }" @click="open(item.id)" class="group relative hover:cursor-pointer">
        <img
          :src="item.img"
          class="image"
        />
        <div style="padding: 14px">
          <span>{{ item.title }}</span>
          <div class="bottom">
            <time class="text-[12px] text-gray-400">{{ item.illustrate }}</time>
            <!-- <el-button text class="button">Operating</el-button> -->
          </div>
        </div>
      </el-card>
  </div>
  
  <ElButton @click="mdFlag = true">组件1</ElButton>
  <ElButton>组件2</ElButton>
  <ElButton>组件3</ElButton>
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
              <img class="el-upload-list__item-thumbnail" :src="state.bannerUrl" alt="" />
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
        <!-- <EditorWangEditor ref="childRef" class=" h-full"></EditorWangEditor> -->
        <EditorMarkdown v-model="content"></EditorMarkdown>
      </el-form-item>
    </el-form>
    <ElButton @click="submit()">提交</ElButton>
  </div>
</div>
</template>

<style scoped lang="scss">

</style>