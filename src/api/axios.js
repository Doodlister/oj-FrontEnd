import axios from 'axios'
import browser from '../common/browser'
import { Message } from 'iview'
import utils from '../common/utils'

// 创建 axios 实例
let http = axios.create({
  // headers: {'Content-Type': 'application/json'},
  timeout: 60000
})

axios.baseURL = 'http:127.0.0.1:8080'
// 设置 post、put 默认 Content-Type
http.defaults.headers.post['Content-Type'] = 'application/json'
http.defaults.headers.put['Content-Type'] = 'application/json'

// 添加请求拦截器
http.interceptors.request.use(config => {
  let token = localStorage.getItem('token')
  if (token) {
    config.headers['Authorization'] = token
  }
  if (config.method === 'post' || config.method === 'put') {
    // post、put 提交时，将对象转换为string, 为处理Java后台解析问题
    config.data = JSON.stringify(config.data)
  } else if (config.method === 'get' && browser.isIE) {
    // 给GET 请求后追加时间戳， 解决IE GET 请求缓存问题
    let symbol = config.url.indexOf('?') >= 0 ? '&' : '?'
    config.url += symbol + '_=' + Date.now()
  }
  // 请求发送前进行处理
  return config
}, error => {
  // 请求错误处理
  return Promise.reject(error)
})

// 添加响应拦截器
http.interceptors.response.use(response => {
  // 添加登录逻辑
  let token = response.headers['authorization']
  if (token != null) {
    var rep = {
      code: '201',
      msg: token
    }
    return rep
  }
  let { data } = response
  return data
}, error => {
  let info = {}
  console.log(error.response)
  let { status, statusText, data } = {}
  if (typeof error.response === 'undifined') {
    status = error.response.status
    statusText = error.response.statusText
    data = error.response.data
  }

  if (!error.response) {
    info = {
      code: 5000,
      msg: '请检查您的网络连接是否正常'
    }
    Message.error({
      content: '错误代码:' + ':' + info.code + ':' + info.msg,
      duration: 5,
      closable: true
    })
  } else {
    // 统一判断相应格式
    // 此处整理错误信息格式
    // 判断是否token失效

    if (error.response.data.code == '40101') {
      // localStorage.removeItem('token')
      utils.setLogout()
    }
    Message.error({
      content: error.response.data.msg,
      duration: 1.5,
      closable: true
    })
    info = {
      code: status,
      data: data,
      msg: statusText
    }
  }

  return Promise.reject(info)
})

/**
 * 创建统一封装过的 axios 实例
 * @return {AxiosInstance}
 */
export default function () {
  return http
}
