/*
 * @Author: zdh
 * @Date: 2022-05-07 17:12:55
 * @LastEditTime: 2022-05-31 09:47:30
 * @Description: 
 */
import { ElMessage } from 'element-plus'
// import { MessagePlugin } from 'tdesign-vue-next'
import {
  ILoginAndRegisterResponse,
  ILoginForm,
  IRegisterForm,
  apiLogin,
  apiRegister,
  IForgetPassword,
  apiForgetPassword,
} from '@/apis/userApi'
import { CacheEnum } from '@/enum/CacheEnum'
import store from './store'
import router from '@/router'
import userStore from '@/store/userStore'
import { da } from 'element-plus/lib/locale'

export function isLogin(): boolean {
  return !!store.get(CacheEnum.TOKEN_NAME)
}

export async function login(values: ILoginForm) {
  const { data } = await apiLogin(values)
  loginAndRegisterCallback(data)
}

export async function register(values: IRegisterForm) {
  const { data } = await apiRegister(values)

  loginAndRegisterCallback(data)
}

export async function forgetPassword(values: IForgetPassword) {
  const { data } = await apiForgetPassword(values)

  loginAndRegisterCallback(data)
}

/**
 * 登录与注册回调
 * @param data
 */
function loginAndRegisterCallback(data: ILoginAndRegisterResponse) {
  store.set(CacheEnum.TOKEN_NAME, data.token)
  store.set(CacheEnum.TOKEN_TYPE, data.type)

  userStore().getUserInfo()

  const routeName = store.get(CacheEnum.REDIRECT_ROUTE_NAME) ?? 'home'

  if(data.type == '2'){
    router.push({ name: 'front.styles' })
  }else{
    router.push({ name: routeName })
  }

  ElMessage({ type: 'success', message: '登录成功' })
}

export async function logout() {
  userStore().resetInfo()

  store.remove(CacheEnum.TOKEN_NAME)
  router.push({ name: 'home' })
}
