/*
 * @Author: zdh
 * @Date: 2022-05-07 17:12:55
 * @LastEditTime: 2022-05-25 15:19:40
 * @Description: 
 */
// import _ from 'lodash'
import  _cloneDeep from 'lodash/cloneDeep'
export function parseEnv(env: Record<string, any>): ImportMetaEnv {
    const envs: any = _cloneDeep(env)

    Object.entries(env).forEach(([key, value]) => {
        if (value == 'true' || value == 'false') envs[key] = value == 'true' ? true : false
        else if (/^\d+$/.test(value)) envs[key] = Number(value)
        else if (value == 'null') envs[key] = null
        else if (value == 'undefined') envs[key] = undefined
    })
    return envs
}
