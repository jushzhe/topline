import Vue from 'vue'
import App from './App.vue'
import router from './router'
// 引入样式文件
import '@/assets/css/global.css'

// 引入饿了么组件
import Element from 'element-ui'

// 引入Axios
import axios from 'axios'

// 注册根地址
axios.defaults.baseURL = 'http://ttapi.research.itcast.cn'

// 把axios 注册到vue实例对象里
Vue.prototype.$http = axios
// 注册饿了么
Vue.use(Element)
Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
