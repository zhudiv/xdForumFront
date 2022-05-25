/*
 * @Author: zdh
 * @Date: 2022-05-07 17:12:55
 * @LastEditTime: 2022-05-25 11:05:55
 * @Description: 
 */
import { RouteEnum } from '../../enum/RouteEnum'
import { CacheEnum } from '../../enum/CacheEnum'
import store from '@/utils/store'
import router from '@/router'
import axios, { AxiosRequestConfig } from 'axios'
import errorStore from '@/store/errorStore'
import { ElMessage } from 'element-plus'
// import { MessagePlugin } from 'tdesign-vue-next'

export default class Axios {
  private instance
  constructor(config: AxiosRequestConfig) {
    this.instance = axios.create(config)
    this.interceptors()
  }

  public async request<T, D = ResponseResult<T>>(config: AxiosRequestConfig) {
    console.log('666666')
    return new Promise(async (resolve, reject) => {
      try {
        const response = await this.instance.request<D>(config)
        resolve(response.data)
      } catch (error) {
        reject(error)
      }
    }) as Promise<D>
  }

  private interceptors() {
    this.interceptorsRequest()
    this.interceptorsResponse()
  }

  private interceptorsRequest() {
    this.instance.interceptors.request.use(
      (config: AxiosRequestConfig) => {
        errorStore().resetError()
        config.headers = {
          Accept: 'application/json',
          Authorization: `Bearer ${store.get(CacheEnum.TOKEN_NAME)}`,
        }
        return config
      },
      (error: any) => {
        return Promise.reject(error)
      },
    )
  }
  private interceptorsResponse() {
    console.log('-----7777777-----interceptorsResponse-----')
    this.instance.interceptors.response.use(
      (response) => {
        return response
      },
      (error) => {
        const {
          response: { status, data, msg },
        } = error

        switch (status) {
          case 401:
            store.remove(CacheEnum.TOKEN_NAME)
            router.push({ name: RouteEnum.LOGIN })
            break
          case 500:
            console.log('55555555')
            ElMessage.error(error.response.msg)
            break;
          case 422:
            errorStore().setErrors(error.response.data.errors)
            break
          default:
            const { message } = data
            if (message) {
              ElMessage({ type: 'error', message: message })
            }
        }
        return Promise.reject(error)
      },
    )
  }
}
