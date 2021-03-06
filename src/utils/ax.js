// 存放axios文件

// 引入Axios
import axios from 'axios'
// 引入路由
import router from '@/router'
// 引入vue

import Vue from 'vue'

// 引入json-bigint
import JSONbig from 'json-bigint'
axios.defaults.transformResponse = [function (data) {
  if (data) {
    return JSONbig.parse(data)
  }
  return data
}]

// 配置响应拦截器
axios.interceptors.response.use(function (response) {
  // 正常响应处理
  return response
}, function (error) {
  // 非正常响应处理(包括401)
  // console.dir(error) // 对象： config request response isAxiosError toJSON
  if (error.response.status === 401) {
    // token不ok(token在服务器端已经失效了，2个小时时效)
    // 强制用户重新登录系统，以刷新服务器端的token时效
    router.push('/login')
    // 不要给做错误提示了
    return new Promise(function () { }) // 空的Promise对象，没有机会执行catch，进而不做错误提示了
  }
  // return new Promise((resolve,reject)=>{
  // reject('获得文章失败！')
  // })
  return Promise.reject(error)
})

// 注册根地址
axios.defaults.baseURL = 'http://ttapi.research.itcast.cn'

// 把axios 注册到vue实例对象里
Vue.prototype.$http = axios

// 配置请求拦截器
axios.interceptors.request.use(function (config) {
  // userinfo并不是始终存在的，要做判断使用
  let userinfo = window.sessionStorage.getItem('userinfo')

  if (userinfo) {
    let token = JSON.parse(userinfo).token
    // 给axios请求头配置token
    config.headers.Authorization = 'Bearer ' + token
  }
  return config
}, function (error) {
  return Promise.reject(error)
})
