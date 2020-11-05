import axios from 'axios'

axios.defaults.timeout = 1500000


export const base = process.env.ENV_CONFIG === 'prod' ? '' : '/api'

axios.interceptors.request.use(
  config => {
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
  response => {
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
export const POST = (url: string, params: unknown) => {
  return axios.post(`${base}/${url}`, params).then(res =>
    res
  )
}

export const PUT = (url: string, params: unknown) => {
  return axios.put(`${base}/${url}`, params).then(res => res)
}

export const GET = (url: string, params: unknown) => {
  return axios
    .get(`${base}/${url}`, {
      params: params
    })
    .then(res => res)
}
