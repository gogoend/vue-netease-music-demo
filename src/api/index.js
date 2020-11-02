import axios from 'axios'

axios.defaults.timeout = 1500000

const devBase = 'http://120.77.146.86:3000'
const proBase = 'http://120.77.146.86:3000'

export const base = process.env.ENV_CONFIG === 'prod' ? proBase : devBase

axios.interceptors.request.use(
  config => {
    const token = 0
    if(token){
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
    if (response.status === 200) {
      return response
    } else {
      console.error('请求失败')
    }
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
export const POST = (url, params) => {
  return axios.post(`${base}/${url}`, params).then(res =>
    res
  )
}

export const PUT = (url, params) => {
  return axios.put(`${base}/${url}`, params).then(res => res)
}

export const GET = (url, params) => {
  return axios
    .get(`${base}/${url}`, {
      params: params
    })
    .then(res => res)
}
