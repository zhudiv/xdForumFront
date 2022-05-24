/*
 * @Author: zdh
 * @Date: 2022-05-23 11:04:50
 * @LastEditTime: 2022-05-24 16:37:24
 * @Description: 
 */
import { http } from '@/plugins/axios'

export interface Color {
  id: number
}

export interface ColorResult {
  colorId: string,
  color: string,
  colors: string
}

export function colorTest(data: Color) {
  console.log("4444444444")
  return http.request<ColorResult[]>({
    url: `color/list`,
    method: 'post',
    data
  })
}
