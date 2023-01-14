<template>
  <div class="register-container">
    <!-- 注册内容 -->
    <div class="register">
      <h3>
        注册新用户
        <span class="go"
          >我有账号，去 <a href="login.html" target="_blank">登陆</a>
        </span>
      </h3>
      <div class="content">
        <label>手机号:</label>
        <input type="text" placeholder="请输入你的手机号" v-model="phone" />
        <!-- <span class="error-msg">请输入正确的手机号</span> -->
        <span class="right-msg"><i class="el-icon-check"></i></span>
      </div>
      <div class="content">
        <label>验证码:</label>
        <input type="text" placeholder="请输入验证码" v-model="code" />
        <span class="error-msg">请输入验证码</span>
        <!-- <span class="right-msg">✓</span> -->
        <el-button
          type="primary"
          round
          :disabled="buttonWait"
          @click="getCode(phone)"
          >{{ codeText }}</el-button
        >
      </div>
      <div class="content">
        <label>登录密码:</label>
        <input
          type="password"
          placeholder="请输入你的登录密码"
          v-model="password"
        />
        <span class="error-msg">错误提示信息</span>
        <span class="right-msg">正确提示信息</span>
      </div>
      <div class="content">
        <label>确认密码:</label>
        <input
          type="password"
          placeholder="请输入确认密码"
          v-model="confirmPassword"
        />
        <span class="error-msg">错误提示信息</span>
        <span class="right-msg">正确提示信息</span>
      </div>
      <div class="controls">
        <input name="m1" type="checkbox" />
        <span>同意协议并注册《尚品汇用户协议》</span>
        <span class="error-msg">错误提示信息</span>
        <!-- <span class="right-msg">正确提示信息</span>  -->
      </div>
      <div class="btn">
        <button @click="register(phone,code,password)">完成注册</button>
      </div>
    </div>

    <!-- 底部 -->
    <div class="copyright">
      <ul>
        <li>关于我们</li>
        <li>联系我们</li>
        <li>联系客服</li>
        <li>商家入驻</li>
        <li>营销中心</li>
        <li>手机尚品汇</li>
        <li>销售联盟</li>
        <li>尚品汇社区</li>
      </ul>
      <div class="address">地址：北京市昌平区宏福科技园综合楼6层</div>
      <div class="beian">京ICP备19006430号</div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Register",
  data() {
    return {
      phone: "", //手机号
      code: "", //验证码
      buttonWait: false, //验证码按钮禁用等待
      codeText: "获取验证码", //验证码按钮文字
      count: 5, //验证码等待倒计时
      password: "", //密码
      confirmPassword: "", //确认密码
    };
  },
  methods: {
    //获取验证码
    getCode(phone) {
      console.log("点击获取了");
      if (phone !== "") {
        this.$store
          .dispatch("getCode", phone)
          .then((res) => {
            this.code = res.data;
            // alert("验证码为" + res.data);
            //点击后倒计时5s才能再次获取
            this.buttonWait = true;
            this.codeText = this.count + "s后可重新获取";
            var times = setInterval(() => {
              this.count--; //递减
              this.codeText = this.count + "s后可重新获取";
              if (this.count <= 0) {
                // <=0 时恢复
                this.buttonWait = false;
                this.codeText = "获取验证码";
                this.count = 5;
                clearInterval(times);
              }
            }, 1000); //1000毫秒后执行
          })
          .catch((res) => {
            alert("获取验证失败");
            console.log(res);
          });
      } else {
        alert("请输入正确的手机号码");
      }
    },
    //完成注册
    async register(phone,code,password) {
      const data = { phone, code, password }
     let res = await this.$store.dispatch('register', data)
      if (res.code === 200) {
        console.log(res);
        alert(res.message)
      } else {
        console.log(res);
        alert(res.message)
      }
    }
  },
};
</script>

<style lang="less" scoped>
.register-container {
  .register {
    width: 1200px;
    height: 445px;
    border: 1px solid rgb(223, 223, 223);
    margin: 0 auto;

    h3 {
      background: #ececec;
      margin: 0;
      padding: 6px 15px;
      color: #333;
      border-bottom: 1px solid #dfdfdf;
      font-size: 20.04px;
      line-height: 30.06px;

      span {
        font-size: 14px;
        float: right;

        a {
          color: #e1251b;
        }
      }
    }

    div:nth-of-type(1) {
      margin-top: 40px;
    }

    .content {
      padding-left: 390px;
      margin-bottom: 18px;
      position: relative;

      ::v-deep .el-button--primary {
        background-color: #e1251b;
        border-color: #e1251b;
      }

      label {
        font-size: 14px;
        width: 96px;
        text-align: right;
        display: inline-block;
      }

      input {
        width: 270px;
        height: 38px;
        padding-left: 8px;
        box-sizing: border-box;
        margin-left: 5px;
        outline: none;
        border: 1px solid #999;
      }

      img {
        vertical-align: sub;
      }

      .error-msg {
        position: absolute;
        top: 100%;
        left: 495px;
        color: red;
      }

        .right-msg {
        position: absolute;
        top: 100%;
        left: 495px;
        color: rgb(10, 149, 10);
      }
    }

    .controls {
      text-align: center;
      position: relative;

      input {
        vertical-align: middle;
      }

      .error-msg {
        position: absolute;
        top: 100%;
        left: 495px;
        color: red;
      }
    }

    .btn {
      text-align: center;
      line-height: 36px;
      margin: 17px 0 0 55px;

      button {
        outline: none;
        width: 270px;
        height: 36px;
        background: #e1251b;
        color: #fff !important;
        display: inline-block;
        font-size: 16px;
      }
    }
  }

  .copyright {
    width: 1200px;
    margin: 0 auto;
    text-align: center;
    line-height: 24px;

    ul {
      li {
        display: inline-block;
        border-right: 1px solid #e4e4e4;
        padding: 0 20px;
        margin: 15px 0;
      }
    }
  }
}
</style>
