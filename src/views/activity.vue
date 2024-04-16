<template>
    <div>
        <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/welcome' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>管理员入口</el-breadcrumb-item>
            <el-breadcrumb-item>活动入口</el-breadcrumb-item>
        </el-breadcrumb>
        <el-card class="father_card">
            <el-row>
                <el-col :span="11">
                    <el-card class="son_card">
                        <el-table :data="tableData" class="activityTable"
                        :height="tableHeight">
                            <el-table-column
                        type="index"
                        width="50">
                            </el-table-column>
                            <el-table-column
                                prop="activityName"
                                label="活动名称">
                            </el-table-column>
                            <el-table-column
                                prop="startDate"
                                label="开始时间"
                                width="150">
                            </el-table-column>
                            <el-table-column
                                prop="endDate"
                                label="结束时间"
                                width="150">
                            </el-table-column>
                        </el-table>
                    </el-card>
                </el-col>
                <el-col :span="13">
                    <el-card class="son_active">
                        <div class="active_title">创建新活动</div>
                        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
                            <el-form-item label="活动名称" prop="name">
                                <el-input v-model="ruleForm.name"></el-input>
                            </el-form-item>
                            <el-form-item label="开始时间" required>
                                <el-col :span="11">
                                  <el-form-item prop="startDate">
                                      <el-date-picker type="date" placeholder="选择日期" v-model="ruleForm.startDate" style="width: 100%;"></el-date-picker>
                                  </el-form-item>
                                </el-col>
                                <el-col class="line" :span="2">-</el-col>
                                <el-col :span="11">
                                  <el-form-item prop="startTime">
                                      <el-time-picker placeholder="选择时间" v-model="ruleForm.startTime"></el-time-picker>
                                  </el-form-item>
                                </el-col>
                            </el-form-item>
                            <el-form-item label="结束时间" required>
                                <el-col :span="11">
                                  <el-form-item prop="endDate">
                                      <el-date-picker type="date" placeholder="选择日期" v-model="ruleForm.endDate" style="width: 100%;"></el-date-picker>
                                  </el-form-item>
                                </el-col>
                                <el-col class="line" :span="2">-</el-col>
                                <el-col :span="11">
                                  <el-form-item prop="endTime">
                                      <el-time-picker placeholder="选择时间" v-model="ruleForm.endTime"></el-time-picker>
                                  </el-form-item>
                                </el-col>
                            </el-form-item>
                            <el-form-item>
                                <el-button type="primary" @click="submitForm('ruleForm')">立即创建</el-button>
                                <el-button @click="resetForm('ruleForm')">重置</el-button>
                            </el-form-item>
                        </el-form>
                    </el-card>
                </el-col>
            </el-row>
        </el-card>
    </div>
</template>

<script>
export default {
    data() {
      return {
        tableData:[
          {
            activityName:'第一次双选活动',
            startDate:'2024-4-01 12:00:00',
            endDate:'2024-4-15 12:00:00'
          }
        ],
        ruleForm: {
          name: '',
          startDate: '',
          startTime: '',
          endDate:'',
          endTime: '',
        },
        rules: {
          name: [
            { required: true, message: '请输入活动名称', trigger: 'blur' },
            { min: 3, max: 15, message: '长度在 3 到 15 个字符', trigger: 'blur' }
          ],
          startDate: [
            { type: 'date', required: true, message: '请选择日期', trigger: 'change' }
          ],
          startTime: [
            { type: 'date', required: true, message: '请选择时间', trigger: 'change' }
          ],
          endDate: [
            { type: 'date', required: true, message: '请选择日期', trigger: 'change' }
          ],
          endTime: [
            { type: 'date', required: true, message: '请选择时间', trigger: 'change' }
          ],
        },
        tableHeight: 250,
      };
    },
    methods: {
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            if(this.ruleForm.startDate.getTime() > this.ruleForm.endDate.getTime() || (this.ruleForm.startDate.getTime() == this.ruleForm.endDate.getTime() && this.ruleForm.endTime.getTime()<this.ruleForm.startTime.getTime())){
              this.$message.warning("结束时间小于开始时间，请重新选择")
              return
            }else{
              this.$message.success("创建成功")
            }
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      }
    },
    mounted(){
      this.$nextTick(function () {
            this.tableHeight = window.innerHeight / 2 -130;
            // 监听窗口大小变化
            let self = this;
            window.onresize = function() {
                self.tableHeight = window.innerHeight / 2 -130;
            }
      })
    }
};
</script>

<style scoped lang="scss">
.father_card{
    .son_active{
      margin-left:1em;
        .active_title{
            text-align:center;
            margin-bottom:1em;
            font-size:18px;
            font-weight:bold;
        }
        .el-form{
            .el-form-item{
              margin-bottom: 1em;
              width:80%;
              &:first-child{
                width:80%;
                margin-bottom:2em;
              }
            }
        }
    }
}
</style>
<style lang="scss">
@import "../assets/scss/mixin.scss";
.activityTable tr td .cell {
  @include clamp(1);
}
</style>