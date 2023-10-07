import axios, { AxiosInstance } from 'axios'

const instance: AxiosInstance = axios.create({
  timeout: 30000,
  headers: {
    'Content-type': 'application/json;charset=UTF-8',
    'X-Requested-With': 'XMLHttpRequest',
  },
  withCredentials: true, // 跨域
  baseURL: '/api',
})

const checkStatus = (res: any) => {
  if (res && (res.status === 200 || res.status === 304 || res.status === 400)) {
    return res
  }
  return {
    code: 404,
    msg: '网络异常',
  }
}

const checkCode = (res: any) => {
  if (res.status === 404) {
    global.alert(res.msg)
  }
  return res
}

instance.interceptors.request.use(
  (config: any) => config,
  (error: any) => Promise.reject(error)
)

instance.interceptors.response.use(
  (res: any) => checkStatus(res),
  (error: { response: any }) => Promise.resolve(error.response)
)

instance.interceptors.response.use(
  (res: any) => checkCode(res),
  (error: { response: any }) => Promise.resolve(error.response)
)

instance.interceptors.response.use(
  (res: { data: any }) => (res && res.data ? res.data : res),
  (error: { response: any }) => Promise.resolve(error.response)
)

export default instance
