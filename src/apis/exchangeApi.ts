/*
 * @Author: zdh
 * @Date: 2022-06-16 16:37:13
 * @LastEditTime: 2022-06-16 23:07:40
 * @Description: 
 */
import { http } from '@/plugins/axios'
import { ExchangePerUnit } from './types/exchange'

export function exchangeList() {
  return http.request< ExchangePerUnit[]>({
    url: `exchange/list`,
    method: 'post'
  })
}

export function exchangeInsert(data:  ExchangePerUnit){
  return http.request({
    url: `exchange/insert`,
    method: 'post',
    data
  })
}

export function exchangeInfo< ExchangePerUnit>(data: ExchangePerUnit){
  return http.request({
    url: `exchange/info`,
    method: 'post',
    data
  })
}