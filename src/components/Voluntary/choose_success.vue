<template>
  <div v-show="showSuccess" class="choose_success_content">
    <el-form :model="chooseForm" label-width="100px" class="demo-ruleForm">
      <div class="form_title">
        {{ chooseForm.name }} 志愿选择结果
        <el-tag v-if="!isConfirm" type="danger">待确认</el-tag>
        <el-tag v-else type="success">已确认</el-tag>
      </div>
        <el-form-item>
          <div class="wishName">------ 第一志愿 -------</div>
       </el-form-item>
      <el-form-item label="导师编号" prop="tutor_work_id1">
        <el-input
          v-model="chooseForm.tutor_work_id1"
          :disabled="true"
        ></el-input>
      </el-form-item>
      <el-form-item label="导师姓名" prop="tutor_name1" >
        <el-input v-model="chooseForm.tutor_name1" :disabled="true"></el-input>
      </el-form-item>
      <el-form-item>
          <div class="wishName">------ 第二志愿 --------</div>
       </el-form-item>
      <el-form-item label="导师编号" prop="tutor_work_id2" >
        <el-input
          v-model="chooseForm.tutor_work_id2"
          :disabled="true"
        ></el-input>
      </el-form-item>
      <el-form-item label="导师姓名" prop="tutor_name2" >
        <el-input v-model="chooseForm.tutor_name2" :disabled="true"></el-input>
      </el-form-item>
    </el-form>
    <div class="btn_group">
      <el-button style="margin-top: 12px;" @click="before">上一步</el-button>
      <el-button style="margin-top: 12px;" @click="chooseConfirm" type="primary"
        >确认选择</el-button
      >
    </div>
  </div>
</template>

<script>
export default {
  components: {},
  props: {
    showSuccess: {
      type: Boolean,
      default: false,
      require: true,
    },
  },
  data() {
    return {
      chooseForm: {
        id: "Xb18620207",
        name: "测试员",
        phone: "13506879544",
        tutor_work_id1: "A20180620",
        tutor_name1: "测试教师1",
        tutor_phone_num1: "12345678910",
        tutor_work_id2: "A20180620",
        tutor_name2: "测试教师2",
        tutor_phone_num2: "12345678910",
      },
      isConfirm: false,
    };
  },
  created() {},
  mounted() {},
  methods: {
    before() {
      this.$emit("step", "-3");
    },
    chooseConfirm() {
      this.$confirm("填报信息确认无误?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          this.isConfirm = true;
          this.$emit("step", "3");
        })
        .catch(() => {
        });
    },
  },
};
</script>

<style scoped lang="scss">
@import "../../assets/scss/color.scss";
.choose_success_content {
  .el-form {
    width: 50%;
    margin: 0 auto;
    margin-top: 2em;
    padding: 2em;
    padding-top: 1em;
    border: 2px solid $color_middle_grey;
    .el-form-item {
      margin-bottom: 1em;
      font-weight: bold;
      font-size: 18px;
      .wishName{
        margin-bottom:0;
        margin-left:-5em;
        height:20px;
      }
      &:last-child {
        margin-bottom: 0;
      }
    }
    .form_title {
      font-size: 25px;
      font-weight: bold;
      margin-bottom: 0.2em;
      color: $color_middle_dark;
      display: flex;
      justify-content: center;
      align-items: center;
      margin-left: 2em;
      .hide {
        display: none;
      }
      .el-tag {
        font-size: 15px;
        height: 28px;
        margin: 0 1em;
        padding-bottom: 1em;
      }
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
.choose_success_content {
  .el-input.is-disabled .el-input__inner {
    background-color: #fff;
    color: $color_middle_dark;
    font-weight: bold;
    font-size: 15px;
  }
}
</style>
