/*
 * @Author: zdh
 * @Date: 2022-05-07 17:12:55
 * @LastEditTime: 2022-05-31 14:06:47
 * @Description: 
 */
import { RouteRecordRaw } from 'vue-router'

const layouts = import.meta.globEager('../layouts/*.vue')
const views = import.meta.globEager('../views/**/*.vue')

console.log('9999999999999')
console.dir(layouts)

function getRoutes() {
    console.log('88888888')
    const layoutRoutes = [] as RouteRecordRaw[]
    console.dir(layouts)

    Object.entries(layouts).forEach(([file, module]) => {
        console.log('77777777777')
        
        const route = getRouteByModule(file, module)
        route.children = getChildrenRoutes(route)
        console.dir(file)
        layoutRoutes.push(route)
    })
    console.dir(layoutRoutes)
    return layoutRoutes
}

//获取布局路由的子路由
function getChildrenRoutes(layoutRoute: RouteRecordRaw) {
    const routes = [] as RouteRecordRaw[]
    Object.entries(views).forEach(([file, module]) => {
        if (file.includes(`../views/${layoutRoute.name as string}`)) {
            const route = getRouteByModule(file, module)
            routes.push(route)
        }
    })
    return routes
}

function getRouteByModule(file: string, module: { [key: string]: any }) {
    const name = file.replace(/.+layouts\/|.+views\/|\.vue/gi, '')
    const route = {
        name: name.replace('/', '.'),
        path: `/${name}`,
        component: module.default,
    } as RouteRecordRaw

    return Object.assign(route, module.default?.route)
}

export default getRoutes
