<template>
  <!--卡片区-->
  <el-card class="box-card">
    <!--命名插槽，头部内容设置-->
    <div slot="header" class="clearfix">
      <span>素材管理</span>
      <el-upload
        style="float: right; padding: 3px 0"
        action="http://ttapi.research.itcast.cn/mp/v1_0/user/images"
        :headers="setToken"
        name="image"
        :show-file-list="false"
        :on-success="onSuccess"
      >
        <el-button size="small" type="primary">上传图片</el-button>
      </el-upload>
    </div>
    <!--匿名插槽，卡片主体内容-->
    <div class="text item">
      <ul>
        <li class="image-box" v-for="item in imageList" :key="item.id">
          <img :src="item.url" alt />
          <div class="image-bot">
            <el-button type="success" icon="el-icon-star-off" circle size="small"></el-button>
            <el-button type="danger" icon="el-icon-delete" circle size="small"></el-button>
          </div>
        </li>
      </ul>
    </div>
  </el-card>
</template>

<script>
export default {
  name: 'Material',
  //  数据
  data () {
    return {
      // 素材列表信息
      imageList: [],
      //   素材图片条件信息
      querycdt: {
        collect: false,
        page: 1, // 页码
        per_page: 20 // 页数
      }
    }
  },
  //  生命周期
  created () {
    //   调用方法
    this.getImageList()
  },
  //   方法
  methods: {
    onSuccess () {
      this.$message.success('图片上传成功')
      //   刷新页面 调用图片列表方法
      this.getImageList()
    },
    //   获取图片列表
    getImageList () {
      // 使用axios获取数据
      this.$http({
        //   地址
        url: '/mp/v1_0/user/images',
        // 获取方式
        method: 'get',
        params: this.querycdt
      })
        //   成功
        .then(result => {
          //    imageList接收信息
          this.imageList = result.data.data.results
        })
        // 失败
        .catch(err => {
          // 失败时弹框提示
          return this.$message.error('获取图片列表失败' + err)
        })
    }
  },
  //   计算属性
  computed: {
    setToken () {
      let token = JSON.parse(window.sessionStorage.getItem('userinfo')).token
      return { Authorization: 'Bearer ' + token }
    }
  }
}
</script>

<style lang="less" scoped>
// 素材图片列表样式
.image-box {
  list-style: none;
  width: 200px;
  height: 200px;
  background-color: #fff;
  margin: 10px;
  float: left;
  border: 1px solid #eee;
  img {
    width: 200px;
    height: 140px;
  }
  .image-bot {
    width: 200px;
    height: 60px;
    line-height: 60px;
    text-align: center;
  }
}
</style>
