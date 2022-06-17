/*
 * @Author: zdh
 * @Date: 2022-06-16 16:37:13
 * @LastEditTime: 2022-06-16 23:57:32
 * @Description: 
 */
import { http } from '@/plugins/axios'
import { OrganizePerUnit } from './types/organize'

export function organizeList() {
  return http.request< OrganizePerUnit[]>({
    url: `organize/list`,
    method: 'post'
  })
}

export function organizeInsert(data:  OrganizePerUnit){
  return http.request({
    url: `organize/insert`,
    method: 'post',
    data
  })
}

export function organizeInfo(data:  OrganizePerUnit){
  return http.request({
    url: `organize/info`,
    method: 'post',
    data
  })
}