/*
 * @Author: zdh
 * @Date: 2022-05-23 11:04:50
 * @LastEditTime: 2022-06-02 14:02:54
 * @Description: 
 */
import { http } from '@/plugins/axios'

export interface Color {
  id: number
}

export interface StylesResult {
  parentId: number,
  name: string,
  id: number,
  level: number,
  src: string,
  children: Array<StylesResult>
}

export function stylesList(data: null) {
  return http.request<StylesResult[]>({
    url: `styles/list`,
    method: 'post',
    data
  })
}
