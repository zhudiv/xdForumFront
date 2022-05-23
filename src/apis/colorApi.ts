/*
 * @Author: zdh
 * @Date: 2022-05-23 11:04:50
 * @LastEditTime: 2022-05-23 11:12:12
 * @Description: 
 */
import { http } from '@/plugins/axios'

export interface Color {
  id: number
}

export function colorTest(data: Color) {
  console.log("4444444444")
  return http.request<Color[]>({
    url: `color/list`,
    method: 'post',
    data
  })
}
