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
            <el-radio v-model="searchForm.status" label="1">草稿</el-radio>
            <el-radio v-model="searchForm.status" label="2">待审核</el-radio>
            <el-radio v-model="searchForm.status" label="3">审核通过</el-radio>
            <el-radio v-model="searchForm.status" label="4">审核失败</el-radio>
            <el-radio v-model="searchForm.status" label="5">已删除</el-radio>
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
  </div>
</template>

<script>
export default {
  // 监听器 watch
  watch: {
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
      // 搜索表单对象
      searchForm: {
        //   文章开始
        begin_pubdate: '',
        // 文章结束
        end_pubdate: '',
        //   id
        channel_id: '',
        status: '0'
      },
      //   日期对象
      timetotime: [],
      //   创建对象
      channeLlist: []
    }
  },
  //   获得频道
  created () {
    //   展示数据
    this.GetchanneLlist()
  },
  //   方法
  methods: {
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
</style>
