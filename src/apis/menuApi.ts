/*
 * @Author: zdh
 * @Date: 2022-06-09 15:34:07
 * @LastEditTime: 2022-06-09 16:21:45
 * @Description: 
 */
import { http } from "@/plugins/axios";


export function menuList(data: string){
  return http.request({
    url: `menu/list`,
    method: 'post',
    data
  })
}