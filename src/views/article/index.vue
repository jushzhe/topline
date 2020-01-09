<template>
  <div>
    <!--搜索卡片区-->
    <el-card class="box-card">
      <!--命名插槽，头部内容-->
      <div slot="header" class="clearfix">
        <span>全部图文</span>
      </div>
      <!--匿名插槽，内容主体-->
      <div class="text item">
        <!-- el-form搜索表单区域 -->
        <el-form ref="searchFormRef" :model="searchForm" label-width="100px">
          <el-form-item label="文章状态：">
            <el-radio v-model="searchForm.status" label>全部</el-radio>
            <el-radio v-model="searchForm.status" label="0">草稿</el-radio>
            <el-radio v-model="searchForm.status" label="1">待审核</el-radio>
            <el-radio v-model="searchForm.status" label="2">审核通过</el-radio>
            <el-radio v-model="searchForm.status" label="3">审核失败</el-radio>
          </el-form-item>
          <el-form-item label="频道列表：">
            <el-form-item label="频道列表：">
              <el-select v-model="searchForm.channel_id" placeholder="请选择" clearable>
                <el-option
                  v-for="item in channeLlist"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-form-item>
          <el-form-item label="时间选择：">
            <el-form-item label="时间选择：">
              <el-date-picker
                v-model="timetotime"
                type="daterange"
                range-separator="至"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
                value-format="yyyy-MM-dd"
              ></el-date-picker>
            </el-form-item>
          </el-form-item>
        </el-form>
      </div>
    </el-card>
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>共找到{{tot}}条符合条件的内容</span>
      </div>
      <el-table :data="articleList" stripe style="width: 100%">
        <el-table-column label="图标">
          <img
            :src="stData.row.cover.images[0]"
            slot-scope="stData"
            alt="没有图标"
            width="150"
            height="100"
          />
        </el-table-column>
        <el-table-column prop="title" label="标题"></el-table-column>
        <el-table-column prop="status" label="状态">
          <template slot-scope="stData">
            <el-tag v-if="stData.row.status===0">草稿</el-tag>
            <el-tag v-else-if="stData.row.status===1" type="success">待审核</el-tag>
            <el-tag v-else-if="stData.row.status===2" type="info">审核通过</el-tag>
            <el-tag v-else-if="stData.row.status===3" type="warning">审核失败</el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="pubdate" label="发布时间"></el-table-column>

        <!-- <el-row>
          <el-button icon="el-icon-search" circle></el-button>
          <el-button type="primary" icon="el-icon-edit" circle></el-button>
          <el-button type="success" icon="el-icon-check" circle></el-button>
          <el-button type="info" icon="el-icon-message" circle></el-button>
          <el-button type="warning" icon="el-icon-star-off" circle></el-button>
          <el-button type="danger" icon="el-icon-delete" circle></el-button>
        </el-row>-->
        <el-table-column label="操作">
          <el-button type="primary" icon="el-icon-edit" circle size="small"></el-button>
          <el-button type="warning" icon="el-icon-star-off" circle size="small"></el-button>
          <el-button type="danger" icon="el-icon-delete" circle size="small"></el-button>
        </el-table-column>
      </el-table>
      <el-pagination
        background
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="searchForm.page"
        :page-sizes="[10, 20, 30, 40]"
        :page-size="searchForm.per_page"
        layout="total, sizes, prev, pager, next, jumper"
        :total="tot"
      ></el-pagination>
    </el-card>
  </div>
</template>

<script>
export default {
  // 监听器 watch
  watch: {
  // 对searchForm进行深度监听 固定语法
    searchForm: {
      handler: function () {
        this.GetArticleList()
      },
      deep: true
    },

    //   监听的对象 第一个参数代表变化后   第二个参数oldV 代表变化前
    timetotime: function (newV) {
      //  判断
      if (newV) {
        this.searchForm.begin_pubdate = newV[0]
        this.searchForm.end_pubdate = newV[1]
      } else {
        //   清除监听数据
        this.searchForm.begin_pubdate = ''
        this.searchForm.end_pubdate = ''
      }
    }
  },
  name: 'ArticleList',
  //  data 数据
  data () {
    return {
      tot: 0,
      //  文章列表对象
      articleList: [],

      // 搜索表单对象
      searchForm: {
        // 分页成员
        page: 1,
        per_page: 10,

        //   文章开始
        begin_pubdate: '',
        // 文章结束
        end_pubdate: '',
        //   文章id
        channel_id: '',
        // 文章状态
        status: ''
      },
      //   日期对象
      timetotime: '',
      //   创建对象
      channeLlist: []
    }
  },
  //   获得频道
  created () {
    //   展示数据方法调用
    this.GetchanneLlist()
    // 文章列表数据方法调用
    this.GetArticleList()
  },
  //   方法
  methods: {
    // 回调处理 参数代表变化后
    handleSizeChange (val) {
      // 更新页数
      this.searchForm.per_page = val
      // 重新获取文章列表
      // this.GetArticleList()
    },
    //
    handleCurrentChange (val) {
      // 更新页数
      this.searchForm.page = val
      // 重新获取文章列表
      // this.GetArticleList()
    },
    // 通过axios请求服务器获取文章列表
    // 创建方法
    GetArticleList () {
      // 过滤
      // 声明一个空变量接收
      let searchData = {}
      for (var i in this.searchForm) {
        // i:代表对象的成员属性名称, status、channel_id、begin_pudate等等
        if (this.searchForm[i] || this.searchForm[i] === 0) {
          // 成员值非空
          searchData[i] = this.searchForm[i]
        }
      }

      this.$http({
        // 地址
        url: '/mp/v1_0/articles',
        // 请求类型
        method: 'GET',
        params: searchData
      })
        // 成功时
        .then(result => {
          // console.log(result)
          // 接收数据
          this.articleList = result.data.data.results
          // 接收总条数
          this.tot = result.data.data.total_count
        })
        // 失败时
        .catch(err => {
          return this.$message.error('获取频道失败' + err)
        })
    },

    GetchanneLlist () {
      this.$http({
        //   地址
        url: '/mp/v1_0/channels',
        // 请求类型
        method: 'get'
        // 没有参数
      })
        //   成功时
        .then(result => {
          //   console.log(result)
          //   接收数据
          this.channeLlist = result.data.data.channels
        })
        // 失败时
        .catch(err => {
          //   console.log(err)
          return this.$message.error('获取频道失败' + err)
        })
    }
  }
}
</script>

<style lang="less" scoped>
.box-card {
  margin-bottom: 15px;
}
.el-pagination {
  margin-top: 15px;
  // margin: 0 auto;
  display: flex;
  justify-content: center;
}
</style>
