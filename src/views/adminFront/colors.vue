<script lang="ts" setup>
import { reactive, onMounted, toRefs, nextTick } from 'vue'
import { colorList, colorInsert } from '@/apis/colorApi'
import { ElMessage, ElMessageBox } from 'element-plus'
import { ElTable } from 'element-plus'
import { ColorUnit } from '@/apis/types/colors'
// import _ from 'lodash'




const colorListArr = ref<ColorUnit[]>()

const getColorList =  async () =>{
  const { data} = await colorList()
  colorListArr.value = data
}

onMounted( () => {
  getColorList()
})


  // export default {
  //   setup() {
  //     const state = reactive({
  //       colorList: [] as ColorResult[],
  //       colors: [] as ColorUnit[],
  //       dialogFormVisible: false,
  //       form: {
  //         name: ''
  //       }
  //     })


  //     onMounted( () => {
  //       getColorList()
  //     })

  //     const getColorList = async () => {
  //       const { data} = await colorList( {colorId: 1} )

  //       let a = [{name: 1, key: 2}, {name: 3, key: 4}]

  //       state.colorList = data.map( item =>{
  //         let tmp: ColorResult = {
  //           colorId: item.colorId,
  //           color: item.color,
  //           colors: JSON.parse(item.colors)

  //         }
  //         console.dir(tmp)
  //         return tmp
  //       })
  //       state.colors = state.colorList[0].colors
  //     }

  //     const addColorGroup = (v:any) => {

  //     }
  //     const handleEdit = (index: number, row: ColorUnit) => {
  //       console.log(index, row)
  //     }
  //     const handleDelete = (index: number, row: ColorUnit) => {
  //       console.log(index, row)
  //     }

  //     const goAddColor = (v:any) => {
  //       ElMessageBox.confirm(
  //         '是否增加新颜色？',
  //         '提示',
  //         {
  //           confirmButtonText: '确认',
  //           cancelButtonText: '取消',
  //           type: 'warning',
  //         }
  //       )
  //       .then(() => {
  //         colorInsert({
  //           color: state.form.name
  //         }).then(res => {
  //           ElMessage({
  //             type: 'success',
  //             message: '添加成功',
  //           })
  //           state.dialogFormVisible = false
  //           getColorList()
  //         })
  //         return
  //       })
  //       .catch(() => {
  //         ElMessage({
  //           type: 'info',
  //           message: '已取消',
  //         })
  //       })
  //     }

  //     const handleClose = (done: () => void) => {
  //       ElMessageBox.confirm('Are you sure to close this dialog?')
  //         .then(() => {
  //           done()
  //         })
  //         .catch(() => {
  //           // catch error
  //         })
  //     }

  //     return {
  //       ...toRefs(state),
  //       addColorGroup,
  //       handleEdit,
  //       handleDelete,
  //       goAddColor,
  //       handleClose,
  //       getColorList
  //     }
  //   }
  // }

  // test().then(({ data }) => (tests.value = data))
</script>


<template>
<div class="w-full flex">
  <div
    class="min-w-0 flex-auto pt-4 pb-24 lg:pb-16"
  >
  <div class="w-full flex">
    <div class="xl:text-sm block flex-none w-48 mr-8 relative">
      <div>
        <el-tree :data="colorList" :props="defaultProps" @node-click="handleNodeClick" />
        <el-menu
          default-active="1"
          class="el-menu-vertical-demo">
          <el-menu-item v-for="(item, index) in colorList" :key="'color-'+ index" :index="String(item.colorId)">
            <span>{{item.color}}</span>
          </el-menu-item>
        </el-menu>
      </div>
      <div>
        <el-divider />
        <el-button type="primary" @click="dialogFormVisible = true">增加</el-button>
      </div>
    </div>
    <div class="min-w-0 flex-auto pb-24 lg:pb-16">
      <el-table :data="colors">
        <el-table-column type="index" width="50" />
        <el-table-column label="name" prop="name"/>
        <el-table-column label="key" prop="key"/>
        <el-table-column label="Operations">
          <template #default="scope">
            <el-button size="small" @click="handleEdit(scope.$index, scope.row)">修改</el-button>
            <el-button
              size="small"
              type="danger"
              @click="handleDelete(scope.$index, scope.row)"
              >删除</el-button
            >
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
    <!-- <div>
      <div class="grid grid-cols1 gap-8">
        <div v-for="(item, index) in colorList" :key="'color'+ index" class="hover:cursor-pointer hover:bg-gray-200">
          <div
            class="space-y-3 sm:flex-row text-xs sm:space-y-0 sm:space-x-4"
          >
            <div class="w-32 flex-shrink-0">
              <div class="h-10 flex flex-col justify-center">
                <div class="text-sm font-semibold text-gray-900">
                  {{ item.color }}
                </div>
                <div>
                  <code class="text-xs text-gray-500">
                    colors.{{ item.color }}
                  </code>
                </div>
              </div>
            </div>
            <div
              class="min-w-0 flex-1 grid grid-cols-5 2xl:grid-cols-10 gap-x-4 gap-y-3 2xl:gap-x-2"
            >
              <div class="space-y-1.5" v-for="(s) in item.colors" :key="s.id">
                <div
                  class="h-10 w-full rounded ring-1 ring-inset ring-black ring-opacity-0"
                  :style="'background-color: ' + s.key"
                ></div>
                <div
                  class="px-0.5 md:flex md:justify-between md:space-x-2 2xl:space-x-0 2xl:block"
                >
                  <div class="w-6 font-medium text-gray-900">{{ s.name }}</div>
                  <div>{{s.key}}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div> -->
  </div>

  <el-dialog v-model="dialogFormVisible" title="添加颜色" :before-close="handleClose">
    <el-form :model="form">
      <el-form-item label="颜色" :label-width="formLabelWidth">
        <el-input v-model="form.name" autocomplete="off" />
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取消</el-button>
        <el-button type="primary" @click="goAddColor">确认</el-button>
      </span>
    </template>
  </el-dialog>
</div>
</template>

<style scoped lang="scss">

</style>