<script lang="ts" setup>
import { reactive, onMounted, toRefs, nextTick } from 'vue'
import { colorList, colorInsert, colorDelete, colorListById, colorEdit } from '@/apis/colorApi'
import { ElMessage, ElMessageBox } from 'element-plus'
import { ElTable } from 'element-plus'
import { ColorUnit, ColorsPerUnit } from '@/apis/types/colors'
// import _ from 'lodash'




const colorListArr = ref<ColorUnit[]>([])
const currentNodeKey = ref<string | number>()
const dialogFormVisible = ref(false)
const dialogColorEditVisible = ref(false)
const formLabelWidth = '140px'
const form = reactive({
  name: ''
})

const selectColor = reactive<ColorsPerUnit>({
  name: '',
  key: ''
})

const colors = ref<ColorsPerUnit[]>([])
const selectPerColor = ref(0)
watch(currentNodeKey, (val) => {
  console.log('watch 已触发', val)
  getColorListById(val as number)
})

const getColorList =  async () =>{
  const { data} = await colorList()
  colorListArr.value = data
  currentNodeKey.value = data[0].id
}

const getColorListById = async (id: number) => {
  const { data} = await colorListById({id: id})
  colors.value = JSON.parse(data.colors as string)
}

onMounted( () => {
  getColorList()
})

interface Tree {
  id: number
  label: string
  children?: Tree[]
}

const defaultProps = {
  children: 'children',
  label: 'color'
}

const handleNodeClick = (data: Tree) => {
  console.log("333333333333333333333333")

  currentNodeKey.value = data.id
}

const goAddColor = (v:any) => {
  ElMessageBox.confirm(
    '是否增加新颜色？',
    '提示',
    {
      confirmButtonText: '确认',
      cancelButtonText: '取消',
      type: 'warning',
    }
  )
  .then(() => {
    colorInsert({
      color: form.name
    }).then(res => {
      ElMessage({
        type: 'success',
        message: '添加成功',
      })
      dialogFormVisible.value = false
      getColorList()
    })
    return
  })
  .catch(() => {
    ElMessage({
      type: 'info',
      message: '已取消',
    })
  })
}

const goEditPerColor = (v:any) => {
  console.log("444444444")
  ElMessageBox.confirm(
    '是否修改颜色？',
    '提示',
    {
      confirmButtonText: '确认',
      cancelButtonText: '取消',
      type: 'warning',
    }
  )
  .then(() => {
    console.log("88888888")
    console.log("090909090909090909090909090909090909")
    // let index:number = selectPerColor.value
    // colors.value[selectPerColor.value] = selectColor
    // colorListArr.value[Number(currentNodeKey.value)].colors = JSON.stringify(colors)
    console.log("090909090909")
    console.dir(colorListArr.value[Number(currentNodeKey.value)])
    colors.value[selectPerColor.value] = selectColor
    let tmp:ColorUnit = {}
    colorListArr.value.forEach(item => {
      if(item.id == currentNodeKey.value){
        item.colors = JSON.stringify(colors)
        tmp.id = item.id
        tmp.color = item.color
        tmp.colors = JSON.stringify(colors.value)
      }
    })
    // return
    colorEdit(tmp).then(res => {
      ElMessage({
        type: 'success',
        message: '修改成功',
      })
    })
    return
  })
  .catch(() => {
    ElMessage({
      type: 'info',
      message: '已取消',
    })
  })
}


const remove = (node: Node, data: Tree) => {
  ElMessageBox.confirm(
    '确认是否删除?',
    '提示',
    {
      confirmButtonText: '确认',
      cancelButtonText: '取消',
      type: 'warning',
    }
  )
    .then(() => {
        colorDelete({
          id: data.id
        }).then(res => {
          if(res.code == 200){
            ElMessage({
              type: 'success',
              message: '删除成功',
            })
            setTimeout( () => {
              getColorList()
            }, 1200)
          }
        })
    })
    .catch(() => {
      ElMessage({
        type: 'info',
        message: '已取消删除',
      })
    })
}

const handleEdit = (index: number, row: ColorsPerUnit) => {
  console.log(index, row)
  selectPerColor.value = index
  dialogColorEditVisible.value = true
  selectColor.name = row.name
  selectColor.key = row.key
}
const handleDelete = (index: number, row: ColorUnit) => {
  console.log(index, row)
}

const handleClose = (done: () => void) => {
  ElMessageBox.confirm('Are you sure to close this dialog?')
    .then(() => {
      done()
    })
    .catch(() => {
      // catch error
    })
}

const handleColorClose = (done: () => void) => {
  ElMessageBox.confirm('Are you sure to close this dialog?')
    .then(() => {
      done()
    })
    .catch(() => {
      // catch error
    })
}
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
        <el-tree
          :data="colorListArr"
          node-key="id"
          :props="defaultProps"
          highlight-current
          check-on-click-node
          :current-node-key="0"
          @node-click="handleNodeClick"
          id="colorContent"
        >
          <template #default="{ node, data }">
          <span class="custom-tree-node treeLi">
            <span>{{ node.label }}</span>
            <span class="absolute right-0 invisible treeBtn">
              <el-button type="danger" size="small" @click="remove(node, data)">删除</el-button>
            </span>
          </span>
        </template>
      </el-tree>
        <!-- <el-menu
          default-active="1"
          class="el-menu-vertical-demo">
          <el-menu-item v-for="item in colorListArr" :key="item.id">
            <span>{{item.color}}</span>
          </el-menu-item>
        </el-menu> -->
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
        <!-- <el-table-column label="key" prop="key"/> -->
        <el-table-column label="key" #default="scope">
          <div class="flex items-center">
            <span class="w-4 h-4 rounded-sm inline-block" :style="'background: ' + scope.row.key"></span>
            <span class="ml-2">
              {{ scope.row.key }}
            </span>
          </div>
        </el-table-column>
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

  <el-dialog v-model="dialogColorEditVisible" title="修改颜色" :before-close="handleColorClose">
    <el-form :model="selectColor">
      <el-form-item label="颜色" :label-width="formLabelWidth">
        <el-input v-model="selectColor.name" autocomplete="off" />
      </el-form-item>
      <el-form-item label="值" :label-width="formLabelWidth">
        <el-input v-model="selectColor.key" autocomplete="off" />
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="dialogColorEditVisible = false">取消</el-button>
        <el-button type="primary" @click="goEditPerColor">确认</el-button>
      </span>
    </template>
  </el-dialog>
</div>
</template>

<style scoped lang="scss">
#colorContent :deep(div:hover .treeBtn) {
  visibility: visible;
}
// .el-tree .treeLi{
//     background: red;
//   }

// .el-tree >>> .is-current .treeBtn {
//      visibility: visible !important;
//   }
</style>