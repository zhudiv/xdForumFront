/*
 * @Author: zdh
 * @Date: 2022-05-07 17:12:55
 * @LastEditTime: 2022-06-10 14:41:23
 * @Description: 
 */
import { IconType } from '@icon-park/vue-next/es/all'

interface Menu {
  title?: string
  icon?: IconType
  isClick?: boolean
  route?: string
  id: number
  parentId: number,
  menuHidden: boolean
}

export interface IMenu extends Menu {
  children?: Menu[]
}
