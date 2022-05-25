// import _ from 'lodash'
import  _cloneDeep from 'lodash/cloneDeep'
const env: any = _cloneDeep(import.meta.env)

Object.entries(import.meta.env as Record<string, any>).forEach(([key, value]) => {
    if (value == 'true' || value == 'false') env[key] = value == 'true' ? true : false
    else if (/^\d+$/.test(value)) env[key] = Number(value)
    else if (value == 'null') env[key] = null
    else if (value == 'undefined') env[key] = undefined
})

export default env as ImportMetaEnv
