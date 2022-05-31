/*
 * @Author: zdh
 * @Date: 2022-05-23 11:04:50
 * @LastEditTime: 2022-05-31 16:37:47
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
  children: Array<StylesResult>
}

export function stylesList(data: null) {
  return http.request<StylesResult[]>({
    url: `styles/list`,
    method: 'post',
    data
  })
}
