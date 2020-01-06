import Vue from 'vue'
import VueRouter from 'vue-router'
// import Home from '/views/home'
// import Login from '/views/login'

Vue.use(VueRouter)

const routes = [
  //  引入路由
  {
    path: '/login',
    name: 'login',
    component: () =>
            import ('@/views/login')
  },
  {
    path: '/home',
    name: 'home',
    component: () =>
            import ('@/views/home')
  }

]

const router = new VueRouter({
  routes
})

// 配置全局路由守卫 router.beforeEach()固定写法
router.beforeEach((to, from, next) => {
  //   获取登录信息
  let userinfo = window.sessionStorage.getItem('userinfo')
  // 判 断
  if (!userinfo && to.path !== '/login') {
    //   强制登陆
    return next('/login')
  }
  next()
})
export default router
