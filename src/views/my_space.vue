<template>
    <div>
        <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/welcome' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>个人空间</el-breadcrumb-item>
        </el-breadcrumb>
        <el-card class="space_content">
            <div class="space_title">个人信息</div>
            <div class="space_form">
                <el-form ref="form" :model="form" :rules="rules" label-width="auto" hide-required-asterisk> 
                    <el-form-item label="学号">
                        <el-input v-model="form.userId" disabled></el-input>
                    </el-form-item>
                    <el-form-item label="姓名">
                        <el-input v-model="form.userName" disabled></el-input>
                    </el-form-item>
                    <el-form-item label="性别">
                        <el-select v-model="form.sex" placeholder="请选择性别">
                            <el-option label="男" value="男"></el-option>
                            <el-option label="女" value="女"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="邮箱" prop="email">
                        <el-input v-model="form.email"></el-input>
                    </el-form-item>
                    <el-form-item label="手机" prop="phone">
                        <el-input v-model="form.phone"></el-input>
                    </el-form-item>
                    <el-form-item label="个人简介">
                        <el-input type="textarea" v-model="form.desc"></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" @click="submitForm('form')">确认修改</el-button>
                        <el-button @click="resetForm('form')">重置</el-button>
                    </el-form-item>
                </el-form>
            </div>
        </el-card>
    </div>
</template>

<script>
export default {
    data() {
        return {
            form:{
                userId:'2022413516',
                userName:'测试',
                sex:'男',
                email:"123456@23.com",
                phone:13545678911,
                desc:'测试简介'
            },
            rules:{
                phone: [{ required: true, validator: this.phoneReg, trigger: "blur" }],
                email: [{ required: true, validator: this.emailReg, trigger: "blur" }],
            }
        };
    },
    created() {

    },
    mounted() {

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
        submitForm(formName) {
            this.$refs[formName].validate((valid) => {
            if (valid) {
                this.$confirm('确定修改个人信息?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
                }).then(() => {
                    alert('submit!');
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消删除'
                    });          
                });
               
            } else {
                console.log('error submit!!');
                return false;
            }
            });
        },
        resetForm(formName) {
            this.$refs[formName].resetFields();
        }
    }
};
</script>

<style scoped lang="scss">
    .space_content{
        .space_title{
            text-align: center;
            font-size: 20px;
            font-weight: bold;
            letter-spacing: 0.3em;
            color: #2A3F54;
            margin-top: 0.2em;
            margin-bottom: 1em;
        }
        .space_form{
            width:30%;
            margin:0 auto;
            .el-form-item{
                &:last-child{
                    width:100%;
                }
            }
        }
    }
</style>
<style lang="scss">
@import "../assets/scss/color.scss";
.space_content {
  .el-input.is-disabled .el-input__inner {
    background-color: #fff;
    color: $color_dark;
    font-weight: bold;
  }
  .el-select {
    width:100%;
  }
}
</style>