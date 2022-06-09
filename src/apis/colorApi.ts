/*
 * @Author: zdh
 * @Date: 2022-05-23 11:04:50
 * @LastEditTime: 2022-06-09 15:41:44
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

export function colorDelete(data: ColorUnit){
  return http.request({
    url: `color/delete`,
    method: 'post',
    data
  })
}
export function colorListById(data: ColorUnit){
  return http.request<ColorUnit>({
    url: `color/search`,
    method: 'post',
    data
  })
}

export function colorEdit(data: ColorUnit){
  return http.request<ColorUnit>({
    url: `color/edit`,
    method: 'post',
    data
  })
}
