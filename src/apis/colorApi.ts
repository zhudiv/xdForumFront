/*
 * @Author: zdh
 * @Date: 2022-05-23 11:04:50
 * @LastEditTime: 2022-06-07 16:51:06
 * @Description: 
 */
import { http } from '@/plugins/axios'
import { ColorUnit } from './types/colors'




export function colorList() {
  return http.request< ColorUnit[]>({
    url: `color/list`,
    method: 'post'
  })
}

export function colorInsert(data: ColorUnit){
  return http.request({
    url: `color/insert`,
    method: 'post',
    data
  })
}
