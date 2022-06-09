<script lang="ts" setup>
import { ref, onBeforeMount } from 'vue'
import type Node from 'element-plus/es/components/tree/src/model/node'
import type { ElTable } from 'element-plus'

import { stylesList } from '@/apis/stylesApi';

import { listToArr } from '@/utils/tools/array'

import { useRouter } from "vue-router"
const router = useRouter()


console.log('3333333333444445555555543')
console.dir(router.currentRoute.value.fullPath)
const saveRouter = '/adminFront/docs/'

interface Tree {
  id: number
  label: string
  children?: Tree[]
}
let id = 1000

const append = (data: Tree) => {
  const newChild = { id: id++, label: 'testtest', children: [] }
  if (!data.children) {
    data.children = []
  }
  data.children.push(newChild)
  dataSource.value = [...dataSource.value]
}

const remove = (node: Node, data: Tree) => {
  const parent = node.parent
  const children: Tree[] = parent.data.children || parent.data
  const index = children.findIndex((d) => d.id === data.id)
  children.splice(index, 1)
  dataSource.value = [...dataSource.value]
}

const dataSource = ref<Tree[]>([
  {
    id: 1,
    label: 'Level one 1',
    children: [
      {
        id: 4,
        label: 'Level two 1-1',
        children: [
          {
            id: 9,
            label: 'Level three 1-1-1',
          },
          {
            id: 10,
            label: 'Level three 1-1-2',
          },
        ],
      },
    ],
  },
  {
    id: 2,
    label: 'Level one 2',
    children: [
      {
        id: 5,
        label: 'Level two 2-1',
      },
      {
        id: 6,
        label: 'Level two 2-2',
      },
    ],
  },
  {
    id: 3,
    label: 'Level one 3',
    children: [
      {
        id: 7,
        label: 'Level two 3-1',
      },
      {
        id: 8,
        label: 'Level two 3-2',
      },
    ],
  },
])



interface User {
  date: string
  name: string
  address: string
}

const listData = ref()

onBeforeMount( () => {
  stylesList(null).then( res => {
    listData.value = listToArr(res.data, 'parentId')
  })
})

const multipleTableRef = ref<InstanceType<typeof ElTable>>()
const multipleSelection = ref<User[]>([])
const toggleSelection = (rows?: User[]) => {
  if (rows) {
    rows.forEach((row) => {
      // TODO: improvement typing when refactor table
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-expect-error
      multipleTableRef.value!.toggleRowSelection(row, undefined)
    })
  } else {
    multipleTableRef.value!.clearSelection()
  }
}
const handleSelectionChange = (val: User[]) => {
  multipleSelection.value = val
}

const tableData: User[] = [
  {
    date: '2016-05-03',
    name: 'Tom',
    address: 'No. 189, Grove St, Los Angeles',
  },
  {
    date: '2016-05-02',
    name: 'Tom',
    address: 'No. 189, Grove St, Los Angeles',
  },
  {
    date: '2016-05-04',
    name: 'Tom',
    address: 'No. 189, Grove St, Los Angeles',
  },
  {
    date: '2016-05-01',
    name: 'Tom',
    address: 'No. 189, Grove St, Los Angeles',
  },
  {
    date: '2016-05-08',
    name: 'Tom',
    address: 'No. 189, Grove St, Los Angeles',
  },
  {
    date: '2016-05-06',
    name: 'Tom',
    address: 'No. 189, Grove St, Los Angeles',
  },
  {
    date: '2016-05-07',
    name: 'Tom',
    address: 'No. 189, Grove St, Los Angeles',
  },
]
</script>

<template>
<div class="p-2 rounded-sm shadow-sm relative">
  <div class="flex gap-2">
    <div class="bg-white p-2 shadow-sm rounded-sm w-1/6">
      <div class="custom-tree-container ">
        <p>模块</p>
        <el-divider />
        <el-tree
          :data="listData"
          node-key="id"
          default-expand-all
          :expand-on-click-node="false"
        >
          <template #default="{ node, data }">
            <span class="custom-tree-node">
              <span><router-link :to="saveRouter + data.src">{{ data.src ? data.src : data.name }}</router-link></span>
              <span>
                <el-tag class="ml-2" type="success" @click="append(data)">增加</el-tag>
                <el-tag class="ml-2" type="danger" @click="remove(node, data)" v-if="!data.children">删除</el-tag>
              </span>
            </span>
          </template>
        </el-tree>
      </div>
    </div>
    <div class="relative bg-white flex-auto  p-2 rounded-sm shadow-sm">
      222
      <router-view></router-view>
    </div>
  </div>

</div>
</template>
<style scoped lang="scss">
  .el-table >>> .headerColor {
    background: red !important;
  }
  .el-divider--horizontal {
    margin: 10px 0;
  }
</style>
