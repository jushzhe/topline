<template>
  <div class="login-container">
    <div class="login-box">
      <!-- 绘制登录form表单 -->
      <el-form ref="loginFormRef" :model="loginForm" :rules="loginFormRules">
        <img src="./logo_index.png" alt />
        <el-form-item prop="mobile">
          <el-input v-model="loginForm.mobile" placeholder="请输入手机号码"></el-input>
        </el-form-item>
        <el-form-item prop="code">
          <el-input v-model="loginForm.code" placeholder="请输入验证码"></el-input>
        </el-form-item>
        <el-form-item style="text-align:left" prop="xieyi">
          <!-- 复选框，单个复选框直接设置v-model即可，接收true/false的信息，表示是否选中 -->
          <el-checkbox v-model="loginForm.xieyi" style="margin-right:10px;"></el-checkbox>
          <span>
            我已阅读并同意
            <a href="#">用户协议</a>和
            <a href="#">隐私条款</a>
          </span>
        </el-form-item>
        <el-form-item>
          <!-- 登录按钮 -->
          <el-button type="primary" style="width:100%;" @click="login()">登录</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
// 导入极验JS文件
import './gt'
// import { log } from 'util'
export default {
  name: '',
  data () {
    // 协议验证
    // 声明一个变量接收自定义函数
    var xieyiTest = function (rule, value, callback) {
      // rule 校验规则   value 当前被校验的信息  callback 成功或者失败
      // 判断
      if (value) {
        callback()
      } else {
        return callback(new Error('请认真阅读协议并勾选'))
      }
    }

    return {
      // 表单数据对象
      loginForm: {
        mobile: '13877776666', // 手机号码
        code: '246810', // 验证码
        xieyi: true // 协议复选框
      },
      loginFormRules: {
        // 手机号码
        mobile: [
          { required: true, message: '必填' },
          { pattern: /^1[35789]\d{9}$/, message: '格式不对' }
        ],
        // 验证码
        code: [
          { required: true, message: '必填' }
        ],
        // 协议
        xieyi: [
          {
            validator: xieyiTest
          }
        ]

      }
    }
  },
  // 登录系统
  methods: {
    login () {
      console.log(this)
      this.$refs.loginFormRef.validate(valid => {
        // 判断
        // 如果不等于valid 那么就不执行
        if (!valid) { return false }
        // 人机交互验证
        this.$http({
          url: '/mp/v1_0/captchas/' + this.loginForm.mobile,
          method: 'GET'

        })
          .then(result => {
            // 从result里边解构下述的data对象出来(对象结构赋值)
            let { data } = result.data
            // 请检测data的数据结构， 保证data.gt, data.challenge, data.success有值
            window.initGeetest({
            // 以下配置参数来自服务端 SDK
              gt: data.gt,
              challenge: data.challenge,
              offline: !data.success,
              new_captcha: true,
              product: 'bind' // 设置验证窗口样式的
            },
            captchaObj => {
            // 这里可以调用验证实例 captchaObj 的实例方法
              captchaObj.onReady(() => {
                // 验证码ready之后才能调用verify方法显示验证码(可以显示窗口了)
                captchaObj.verify() // 显示验证码窗口
              })
                .onSuccess(() => {
                // 行为校验正确的处理
                // B. 验证账号，登录系统
                  this.loginAct()
                })
                .onError(() => {
                // 行为校验错误的处理
                })
            }
            )
              .catch(err => {
                return this.$message.error('获取极验秘钥失败：' + err)
              })
          })
      })
    },
    loginAct () {
      this.$http({
        // 地址
        url: '/mp/v1_0/authorizations',
        // 类型
        method: 'POST',
        data: this.loginForm
      })
        // 成功时跳转到后台
        .then(result => {
          // 秘钥 sessionStorage
          window.sessionStorage.setItem('userinfo', JSON.stringify(result.data.data))
          // window.sessionStorage.setItem('userinfo', JSON.stringify(result.data.data))
          //  进入后台系统
          this.$router.push({ name: 'home' })
        })
      // 错误时提示
        .catch(err => {
          console.log(err)

          this.$message.error('手机号码或验证码错误:' + err)
        })
    }
  }
}

</script>

<style lang="less" scoped>
.login-container {
  background-color: gray;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-image: url("./login_bg.jpg");
  background-size: cover;
  .login-box {
    width: 410px;
    height: 340px;
    background-color: white;
    display: flex;
    justify-content: center;
    align-items: center;
    .el-form {
      width: 75%;
      text-align: center;
      img {
        width: 65%;
        margin: 20px auto;
      }
    }
  }
}
</style>
