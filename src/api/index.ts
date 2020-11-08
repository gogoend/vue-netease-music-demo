import Axios, { AxiosRequestConfig, AxiosResponse } from 'axios'

export const baseURL = process.env.ENV_CONFIG === 'prod' ? '' : '/api'

const axios = Axios.create({
  timeout: 20000,
  headers: {},
  baseURL
})

axios.interceptors.request.use(
  (config: AxiosRequestConfig) => {
    const token = 0
    if (token) {
      config.headers['X-Access-Token'] = token
    }
    return config
  },
  error => {
    console.log(error)
    return Promise.reject(error)
  }
)

axios.interceptors.response.use(
  (response: AxiosResponse) => {
    if (response.status !== 200) {
      console.error('请求失败')
    }
    return response
  },
  error => {
    let msg = error.response.data.error.message
    if (error.response.status === 500) {
      msg = '网络异常'
    }
    console.error(msg)
    return Promise.reject(error)
  }
)

export const POST = (url: string, params?: unknown, config?: object) => {
  return axios.post(`${url}`, params, {
    ...config
  })
}

export const PUT = (url: string, params?: unknown, config?: object) => {
  return axios.put(`${url}`, params, {
    ...config
  })
}

export const GET = (url: string, params?: unknown, config?: object) => axios
  .get(`${url}`, {
    params,
    ...config
  })

export const Download = (url: string, params?: unknown, config?: object) => {
  const opts: object = {
    method: 'get',
    url: `${url}`,
    params,
    ...config,
    responseType: 'blob'
  }
  return axios(opts)
}