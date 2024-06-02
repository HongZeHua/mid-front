import axios from 'axios'
import store from '../store'
const service = axios.create({
  baseURL: import.meta.env.VITE_BASE_API,
  timeout: 5000
})
//请求拦截器
service.interceptors.request.use(
  (config) => {
    //添加icode
    config.headers.icode = '7AAB5FE1E9E9F400'
    if (store.getters.token) {
      //如果token存在 注入token
      config.headers.Authorization = `Bearer ${store.getters.token}`
    }
    return config //必须返回配置
  },
  (error) => {
    return Promise.reject(error)
  }
)
//响应拦截器
service.interceptors.response.use((response) => {
  const { success, message, data } = response.data
  if (success) {
    return data
  } else {
    //TODO:业务错误
    return Promise.reject(new Error(message))
  }
})
export default service
