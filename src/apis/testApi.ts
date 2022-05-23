import { http } from '@/plugins/axios'

export interface Test {
  id: number
}

export function test(data: Test) {
  console.log("4444444444")
  return http.request<Test[]>({
    url: `test`,
    method: 'post',
    data
  })
}
