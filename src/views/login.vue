<template>
  <div class="login_container">
    <div class="login_title">
      <img src="../assets/images/zjlg.png" alt="" />
      <span>重庆工商大学</span>
    </div>
    <div class="login_box">
      <div class="box_title">
        <!-- <p></p> -->
        <p>欢迎来到<br />研究生导师双向选择系统</p>
      </div>
      <div class="box_form">
        <!--  登录表单 -->
        <el-form
          ref="loginFormRef"
          :model="loginForm"
          :rules="loginFormRules"
          label-width="0px"
          class="login_form"
        >
          <!--用户名-->
          <div>学号/工号</div>
          <el-form-item prop="username">
            <el-input v-model="loginForm.username" clearable></el-input>
          </el-form-item>
          <!--密码-->
          <div>密码</div>
          <el-form-item prop="password">
            <el-input
              show-password
              v-model="loginForm.password"
              clearable
            ></el-input>
          </el-form-item>
          <!-- 验证码 -->
          <Vcode :show="isShow" @success="vCodesuccess" @close="vCodeclose" />
          <!--按钮-->
          <el-form-item class="btns">
            <el-button type="primary" @click="login">登录</el-button>
          </el-form-item>
        </el-form>
      </div>
      <div class="box_footer">
        备案号：
      </div>
    </div>
  </div>
</template>

<script>
import Vcode from "vue-puzzle-vcode";
export default {
  name: "Login",
  data() {
    return {
      // 登录表单数据绑定对象
      loginForm: {
        username: "admin",
        password: "123456",
      },
      // 验证表单：
      loginFormRules: {
        username: [
          { required: true, message: "请输入账号名称", trigger: "blur" },
          {
            min: 3,
            max: 10,
            message: "长度在 3 到 10 个字符",
            trigger: "blur",
          },
        ],
        password: [
          { required: true, message: "请输入密码", trigger: "blur" },
          {
            min: 6,
            max: 15,
            message: "长度在 6 到 15 个字符",
            trigger: "blur",
          },
        ],
      },
      // 验证码是否出现
      isShow: false,
    };
  },
  components: {
    Vcode,
  },
  methods: {
    // 重置登录
    resetLoginForm() {
      this.$refs.loginFormRef.resetFields();
    },
    // 登录前预验证
    login() {
      this.isShow = true;
      this.$refs.loginFormRef.validate(async (valid) => {
        if (!valid) {
          return;
        } else {
          this.isShow = true;
        }
      });
    },
    // 用户通过了验证
    vCodesuccess(msg) {
      this.isShow = false; // 通过验证后，需要手动隐藏模态框
      // 预验证方法 validate
      this.$message.success("登录成功");
      // 向sessionStorage 存储token值
      // window.sessionStorage.setItem('token',res.data.token)
      window.sessionStorage.setItem("token", "token");
      window.sessionStorage.setItem("userName", "测试员");
      // 跳转页面
      this.$router.push("/welcome");
    },
    // 用户点击遮罩层，应该关闭模态框
    vCodeclose() {
      this.isShow = false;
    },
  },
};
</script>

<style scoped lang="scss">
@import "../assets/scss/color.scss";
.login_container {
  background-image: url("../assets/images/loadbackground.png");
  height: 100%;
  min-height: 650px;
  overflow: hidden;
  min-width: 1500px;
  background-repeat: no-repeat;
  background-size: 100% 100%;
  -moz-background-size: 100% 100%;
  display: flex;
  justify-content: space-around;
  .login_title {
    width: 55%;
    height: 20%;
    padding-left: 23%;
    margin-top: 5%;
    display: flex;
    img {
      width: 100px;
      height: 100px;
    }
    span {
      display: inline-block;
      height: 100px;
      line-height: 100px;
      align-items: center;
      margin-left: 15px;
      font-size: 25px;
      color: white;
      letter-spacing: 0.5em;
      font-weight: bold;
    }
  }
  .login_box {
    width: 43%;
    height: 100%;
    .box_title {
      height: 35%;
      font-size: 45px;
      color: white;
      font-weight: bold;
      position: relative;
      p {
        position: absolute;
        bottom: 5px;
        &::after {
          content: "";
          position: absolute;
          bottom: -5px;
          left: 0;
          width: 15%;
          height: 4px;
          color: violet;
          background-color: white;
        }
      }
    }
    .box_form {
      height: 50%;
      padding-top: 10px;
      font-size: 18px;
      letter-spacing: 0.1em;
      div {
        padding-bottom: 12px;
        color: white;
      }
      .el-input {
        color: white;
        width: 35em;
      }
      .btns {
        padding-top: 20px;
      }
    }
    .box_footer {
      height: 15%;
      color: $color_deep_grey;
      line-height: 25px;
      padding-bottom: 5%;
    }
  }
}
</style>
<style scoped lang="scss">
@import "../assets/scss/color.scss";
.el-textarea__inner,
::v-deep .el-input__inner {
  background: transparent;
  border-radius: 0.1px;
  border: none;
  border-bottom: 1px solid white;
  color: white;
  font-size: 18px;
  padding-left: 0;
  &::placeholder {
    color: $color_grey;
    font-size: 15px;
  }
}
::v-deep .el-icon-circle-close:before {
  color: white;
  font-size: 18px;
}

.box_form ::v-deep .el-button {
  width: 35em;
}
.el-input ::v-deep.el-input__clear {
  color: white;
  font-size: 18px;
}
</style>
