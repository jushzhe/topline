import Vue from 'vue'
import App from './App.vue'
import router from './router'
// 引入样式文件
import '@/assets/css/global.css'

// 引入 ax.js文件
import '@/utils/ax.js'

// 引入饿了么组件
import Element from 'element-ui'

// 注册饿了么
Vue.use(Element)
Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
