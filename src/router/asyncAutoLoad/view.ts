import { RouteRecordRaw } from "vue-router"

import { IconType } from '@icon-park/vue-next/es/all'
interface Menu {
  title?: string
  icon?: IconType
  isClick?: boolean
  route?: string
  id: number
  parentId: number
}

/*
 * @Author: zdh
 * @Date: 2022-06-10 11:10:28
 * @LastEditTime: 2022-06-10 11:13:32
 * @Description: 
 */
function getRoutes(menus: Menu[]) {
  const layoutRoutes = [] as RouteRecordRaw[]
  
  menus.forEach(item => {
    console.log("3333333333333333")
    console.dir(item)
  });

  const modules = import.meta.globEager('../module/**/*.ts')
  console.dir('pppppppppppppppp')
  console.dir(modules)
  Object.keys(modules).forEach(key => {
    console.dir()
    if(menus.find(function(item) {
      return item.route == modules[key].default.name;
    })){
      console.log('66666666')
      layoutRoutes.push(modules[key].default)
    }

    console.dir(modules[key].default)
})
  return layoutRoutes
}
export default getRoutes