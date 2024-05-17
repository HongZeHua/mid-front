import axios from 'axios'
const service = axios.create({
  baseURL: import.meta.env.VITE_BASE_API,
  timeout: 5000
})
//请求拦截器
service.interceptors.request.use((config) => {
  //添加icode
  config.headers.icode = '7AAB5FE1E9E9F400'
  return config
})
export default service
