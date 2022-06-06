/*
 * @Author: zdh
 * @Date: 2022-06-02 13:43:39
 * @LastEditTime: 2022-06-02 13:58:35
 * @Description: 
 */
const listToArr = function(list: any[], name: string): any[] {
  const data = JSON.parse(JSON.stringify(list)) // 浅拷贝不改变源数据
  const result: any[] = []
  if (!Array.isArray(data)) {
    return result
  }
  data.forEach(item => {
    delete item.children
  })
  const map = {} as any
  data.forEach(item => {
    map[item.id] = item
  })
  data.forEach(item => {
    const parent = map[item.parentId]
    if (parent) {
      (parent.children || (parent.children = [])).push(item)
    } else {
      result.push(item)
    }
  })
  return result
}

export { listToArr }