<template>
    <div>
        <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/welcome' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>志愿填报</el-breadcrumb-item>
            <el-breadcrumb-item>填报入口</el-breadcrumb-item>
        </el-breadcrumb>
        <el-card class="vol_content" v-show="showMsg || showTable ||showSuccess">
            <!-- 步骤条 -->
            <el-steps :active="active" finish-status="success" align-center  >
                <el-step title="个人信息检查" description="补全、检查个人信息"></el-step>
                <el-step title="选择导师" description="选择导师"></el-step>
                <el-step title="选择成功" description="检查选择结果后提交"></el-step>
            </el-steps>
            <UserForm @step="step" :showMsg= "showMsg"></UserForm>
            <ChooseTable @step="step" :showTable="showTable"></ChooseTable>
            <ChooseSuccess @step="step" :showSuccess="showSuccess"></ChooseSuccess>
            
        </el-card>
        <el-empty v-show="!showMsg && !showTable && !showSuccess" description="暂无活动">
            <el-button type="primary"  :loading="loadFresh" @click="refreshClick">{{loadWord}}</el-button>
        </el-empty>
    </div>
</template>

<script>
    import UserForm from '../components/Voluntary/user_form.vue'
    import ChooseTable from '../components/Voluntary/choose_table.vue'
    import ChooseSuccess from '../components/Voluntary/choose_success.vue'
    export default {
    inject:['reload'], 
    components: {
        UserForm,
        ChooseTable,
        ChooseSuccess
    },
    data() {
        return {
            active: 0,
            showTable:false,
            showMsg:true,
            showSuccess:false,
            loadFresh:false,
            loadWord:'点击刷新'
        };
    },
    created() {

    },
    mounted() {

    },
    methods: {
        step(s){
            if(s == 1){
                this.active++;
                this.showTable = true
                this.showMsg = false
                this.showSuccess = false
            }else if(s == 2){
                this.showTable = false
                this.showSuccess = true
                this.active++;
            }else if(s == 3){
                this.active++;
                this.$notify.success({
                    title: '成功通知',
                    dangerouslyUseHTMLString: true,
                    duration:3000,
                    message: '恭喜，已成功选择该导师。<br/><strong>3s</strong> 后返回首页',
                    showClose: false
                });
                setTimeout(() => {
                    this.$router.push('/welcome')
                }, 3000);
            }else if(s == -2){
                this.showMsg = true
                this.showTable = false
                if(--this.active == -1){
                    this.active = 0
                }
            }else if(s == -3){
                this.showMsg = false
                this.showTable = true
                this.showSuccess = false
                if(--this.active == -1){
                    this.active = 0
                }
            }
        },
         // 点击刷新
         refreshClick(){
            this.loadFresh = true
            this.loadWord = '刷新中...'
            setTimeout(()=>{
                this.reload();
                this.loadFresh = false
            },1000)
            
        }
    }
};
</script>

<style scoped lang="scss">
</style>
