/*
 * @Author: zdh
 * @Date: 2022-05-07 17:12:55
 * @LastEditTime: 2022-06-16 20:07:01
 * @Description: 
 */
import { http } from '@/plugins/axios'

export interface IUploadImage {
  url: string
}

export function uploadImage(data: FormData) {
  return http.request<IUploadImage>({
    url: `upload/image`,
    method: 'post',
    data,
  })
}

export function uploadVueImage(data: FormData) {
  return http.request<IUploadImage>({
    url: `upload/vueImage`,
    method: 'post',
    data,
  })
}
