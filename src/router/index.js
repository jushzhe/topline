import Vue from 'vue'
import VueRouter from 'vue-router'

// 引入加载条模块
import NProgress from 'nprogress'
// 导入css模块
import 'nprogress/nprogress.css'

Vue.use(VueRouter)

const routes = [

  //  引入路由
  {
    path: '/login',
    name: 'login',
    component: () =>
      import('@/views/login')
  },
  {
    path: '/home',
    name: 'home',
    component: () =>
      import('@/views/home'),
    // 重定向
    redirect: '/welcome',
    // 子路由配置
    // 设置welcome  后台页面路由
    children: [
      { path: '/welcome', name: 'welcome', component: () => import('@/views/welcome') },
      // 设置article 文章列表路由
      { path: '/article', name: 'article', component: () => import('@/views/article') },
      // 设置articleadd 发布文章页面路由
      { path: '/articleadd', name: 'articleadd', component: () => import('@/views/articleadd') },
      // 设置account  账户管理页面路由
      { path: '/account', name: 'account', component: () => import('@/views/account') },
      // 设置material  素材管理页面路由
      { path: '/material', name: 'material', component: () => import('@/views/material') },
      // 设置fans   粉丝管理页面路由
      { path: '/fans', name: 'fans', component: () => import('@/views/fans') },
      //  设置articleedit 修改文章路由
      { path: '/articleedit/:aid', name: 'articleedit', component: () => import('@/views/articleedit') }

      // { path: '/articleedit/:aid', name: 'articleedit', component: () => import('@/views/articleedit')
      // }
    ]
  }

]

const router = new VueRouter({
  routes
})

// 配置全局前置路由守卫 router.beforeEach()固定写法
router.beforeEach((to, from, next) => {
  NProgress.inc()// 开启加载条
  //   获取登录信息
  let userinfo = window.sessionStorage.getItem('userinfo')
  // 判 断
  if (!userinfo && to.path !== '/login') {
    //   强制登陆
    return next('/login')
  }
  next()
})

// 配置全局后置路由守卫 router. afterEach() 固定写法
router.afterEach((to, from) => {
  NProgress.done()
})

export default router
