<template>
  <el-container>
    <!-- 左侧导航 -->
    <el-aside :width="isCollapse?'65px':'200px'">
      <el-menu
        background-color="#353B4E"
        text-color="goldenrod"
        active-text-color="yellowgreen"
        :collapse="isCollapse"
        :collapse-transition="false"
        router
      >
        <el-menu-item index="/welcome" :style="isCollapse?'65px':'200px'">
          <i class="el-icon-location"></i>
          <span slot="title">首页</span>
        </el-menu-item>
        <el-submenu index="2" :style="isCollapse?'65px':'200px'">
          <template slot="title">
            <i class="el-icon-menu"></i>
            <span>内容管理</span>
          </template>
          <el-menu-item index="articleadd">发布文章</el-menu-item>
          <el-menu-item index="/article" >文章列表</el-menu-item>
          <el-menu-item index="2-3">评论列表</el-menu-item>
          <el-menu-item index="/material">素材管理</el-menu-item>
        </el-submenu>
        <el-menu-item index="/fans" :style="isCollapse?'65px':'200px'">
          <i class="el-icon-document"></i>
          <span slot="title">粉丝管理</span>
        </el-menu-item>
        <el-menu-item index="/account" :style="isCollapse?'65px':'200px'">
          <i class="el-icon-setting"></i>
          <span slot="title">账户管理</span>
        </el-menu-item>
      </el-menu>
    </el-aside>
    <el-container>
      <el-header>
        <div class="lt">
          <i
            :class="isCollapse?'el-icon-s-unfold':'el-icon-s-fold'"
            @click="isCollapse=!isCollapse"
          ></i>
          <span style="margin:0 10px">江苏传智播客教育科技股份有限公司</span>
        </div>
        <div class="rt">
          <el-input type="text" placeholder="请输入搜索文章内容" style="width:250px">
            <i slot="prefix" class="el-input__icon el-icon-search"></i>
          </el-input>
          <span style="margin:0 10px">消息</span>
          <el-dropdown>
            <span class="el-dropdown-link">
              <img :src="photo" alt width="40" height="40" />
              {{name}}
              <i class="el-icon-arrow-down el-icon--right"></i>
            </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item>个人信息</el-dropdown-item>
              <el-dropdown-item>github地址</el-dropdown-item>
              <el-dropdown-item @click.native="logout()">退出</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </div>
      </el-header>
      <el-main>
           <router-view />
      </el-main>
    </el-container>
  </el-container>

</template>

<script>
import bus from '@/utils/bus.js'

export default {
  // 生命周期 created
  created () {
    // 名称更新
    bus.$on('upAccountName', nm => {
      // 更新name信息
      let userinfo = JSON.parse(window.sessionStorage.getItem('userinfo'))
      userinfo.name = nm
      window.sessionStorage.setItem('userinfo', JSON.stringify(userinfo))
      // 更新数据
      this.tmpname = nm
    })
    // 头像更新
    bus.$on('upAccountPhoto', ph => {
      //  更新photo信息
      let userinfo = JSON.parse(window.sessionStorage.getItem('userinfo'))
      // let userinfo = JSON.parse(window.sessionStorage.getItem('userinfo'))
      userinfo.photo = ph
      window.sessionStorage.setItem('userinfo', JSON.stringify(userinfo))
      // 更新数据
      this.tmpphoto = ph
    })
  },
  // 数据
  data () {
    return {
      // 临时账户名称
      tmpname: '',
      // 临时账户头像
      tmpphoto: '',
      isCollapse: false
    }
  },
  // 方法
  methods: {
    // 退出功能
    logout () {
      this.$confirm('确定要退出系统吗', '退出', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
      // 成功时
        .then(() => {
          //  清空数据并跳转主页面
          window.sessionStorage.clear()
          // 固定语法 跳转主页面
          this.$router.push({ name: 'login' })
        })
        // 失败时
        .catch(() => {

        })
    }
  },
  // 计算属性
  computed: {
    // 获取账户名称
    name: function () {
      return this.tmpname || JSON.parse(window.sessionStorage.getItem('userinfo')).name
    },
    // 获取账户头像
    photo: function () {
      return this.tmpphoto || JSON.parse(window.sessionStorage.getItem('userinfo')).photo
    }
  }
}
</script>

<style lang="less" scoped>
.el-container {
  height: 100%;
  // 左导航
  .el-aside {
    background-color: rgb(50, 55, 69);
    // background-color:#000;
  }
  // 头部
  .el-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 10px 0 9px;
    background-color: white;
    min-width: 950px;
    // color:yellowgreen
    // color: goldenrod
    // 头部右侧
    .rt {
      height: 100%;
      width: 50%;
      display: flex;
      justify-content: flex-end;
      align-items: center;
      .el-dropdown-link {
        display: flex;
        align-items: center;
        img {
          border-radius: 50%;
          margin: 0 10px;
          // background-image:none;
        }
      }
    }
    // 头部左侧
    .lt {
      height: 100%;
      width: 40%;
      display: flex;
      align-items: center;
      font-size: 20px;
      margin: 0 10px;
    }
  }
  // 右下模块
  .el-main {
    background-color: #f2f3f5;
  }
}
</style>
