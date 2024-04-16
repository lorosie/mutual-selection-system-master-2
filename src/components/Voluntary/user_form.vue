<template>
  <div>
    <div class="user_form_box" v-show="showMsg">
      <!-- 个人信息表单 -->
      <el-form
        :model="userForm"
        :rules="rules"
        ref="userForm"
        label-width="100px"
        class="demo-ruleForm"
      >
        <el-alert
          title="请仔细填写、检查个人信息，不可修改内容有误请联系管理员修改！"
          type="warning"
          show-icon
          center
          :closable="false"
        >
        </el-alert>
        <el-form-item label="学号" prop="id">
          <el-input v-model="userForm.id" :disabled="true"></el-input>
        </el-form-item>
        <el-form-item label="姓名" prop="name">
          <el-input v-model="userForm.name" :disabled="true"></el-input>
        </el-form-item>
        <el-form-item label="性别" prop="sex">
          <el-input v-model="userForm.sex"></el-input>
        </el-form-item>
        <el-form-item label="联系方式" prop="phone">
          <el-input v-model="userForm.phone"></el-input>
        </el-form-item>
        <el-form-item label="邮箱" prop="email">
          <el-input v-model="userForm.email"></el-input>
        </el-form-item>
        <el-form-item label="个人简介" prop="desc">
          <el-input
            type="textarea"
            v-model="userForm.desc"
            maxlength="200"
            show-word-limit
          >
          </el-input>
        </el-form-item>
      </el-form>
      <div class="btn_group">
        <el-button style="margin-top: 12px" disabled>上一步</el-button>
        <el-button type="primary" style="margin-top: 12px" @click="next">下一步</el-button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      userForm: {
        id: "Xb18620207",
        name: "测试员",
        phone: "13506879544",
        sex: "男",
        email: "123456@qq.com",
        desc: "这个人很懒，啥都没留下~",
      },
      rules: {
        id: [
          { required: true, message: "请输入正确的学号", trigger: "blur" },
          {
            min: 3,
            max: 10,
            message: "长度在 3 到 10 个字符",
            trigger: "blur",
          },
        ],
        name: [
          { required: true, message: "请输入正确的姓名", trigger: "blur" },
          { min: 2, max: 5, message: "长度在 3 到 5 个字符", trigger: "blur" },
        ],
        phone: [{ required: true, validator: this.phoneReg, trigger: "blur" }],
        email: [{ required: true, validator: this.emailReg, trigger: "blur" }],
      },
    };
  },
  created() {},
  mounted() {},
  props: {
    showMsg: {
      type: Boolean,
      default: false,
      require: true,
    },
  },
  methods: {
    phoneReg(rule, value, callback) {
      const reg = /^1(3[0-9]|4[01456879]|5[0-35-9]|6[2567]|7[0-8]|8[0-9]|9[0-35-9])\d{8}$/;
      if (value == null || String(value).trim() === "") {
        return callback(new Error("不能为空"));
      } else if (!reg.test(value)) {
        return callback(new Error("请输入正确的手机号码！"));
      } else {
        return callback();
      }
    },
    emailReg(rule, value, callback) {
      const reg = /^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/;
      if (value == null || String(value).trim() === "") {
        return callback(new Error("不能为空，最终结果将通过邮箱发送！"));
      } else if (!reg.test(value)) {
        return callback(
          new Error("邮箱格式不正确，请仔细填写，最终结果将通过邮箱发送！")
        );
      } else {
        return callback();
      }
    },
    before() {
      this.$emit("step", "-1");
    },
    next() {
      this.$refs["userForm"].validate((valid) => {
        if (valid) {
          // 当用户切换到下一页的时候，先将信息暂时存储于到session里面
          this.$emit("step", "1");
        } else {
          this.$message.warning("请输入正确的个人信息！");
          return false;
        }
      });
    },
  },
};
</script>

<style scoped lang="scss">
.user_form_box {
  .el-form {
    width: 50%;
    margin: 0 auto;
    margin-top: 2%;
    .el-form-item {
      margin-bottom: 2%;
      &:last-child {
        margin-bottom: 0;
      }
    }
    .el-alert {
      width: 480px;
      margin-left: 20%;
      margin-bottom: 2%;
    }
  }
  .btn_group {
    float: right;
    overflow: hidden;
    margin-bottom: 1em;
  }
}
</style>
<style lang="scss">
@import "../../assets/scss/color.scss";
.user_form_box {
  .el-input.is-disabled .el-input__inner {
    background-color: #fff;
    color: $color_dark;
    font-weight: bold;
  }
}
</style>