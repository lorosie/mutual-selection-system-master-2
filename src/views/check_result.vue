<template>
    <div>
        <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/welcome' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>导师入口</el-breadcrumb-item>
            <el-breadcrumb-item>查看结果</el-breadcrumb-item>
        </el-breadcrumb>
        <el-card>
            <el-table
                :data="tableData.filter(data => !search || 
                data.postgraduate_identity_num.toLowerCase().includes(search.toLowerCase()) ||
                data.postgraduate_name.toLowerCase().includes(search.toLowerCase())
                )"
                border
                :height="tableHeight"
                style="width: 100%">
                <el-table-column
                type="index" label="#" align="center"
                width="40">
                </el-table-column>
                 <el-table-column
                prop="postgraduate_identity_num"
                label="学号"
                align="center"
                sortable>
                </el-table-column>
                <el-table-column
                prop="postgraduate_name"
                align="center"
                label="姓名">
                </el-table-column>
                <el-table-column
                label="性别"
                align="center"
                prop="postgraduate_gender"
                min-width="75"
                sortable>
                <template slot-scope="scope">
                    <i class="el-icon-male" v-if="scope.row.postgraduate_gender == 1" style="color:#409eff;font-size:15px;font-weight:bold">男</i>
                    <i class="el-icon-female" v-else-if="scope.row.postgraduate_gender == 2" style="color:#FF6EB4;font-size:15px;font-weight:bold">女</i>
                </template>
                </el-table-column>
                <el-table-column
                prop="postgraduate_email"
                align="center"
                label="邮箱">
                </el-table-column>
                <el-table-column
                prop="postgraduate_phone_num"
                align="center"
                label="电话">
                </el-table-column>
                <el-table-column
                prop="postgraduate_self_intro"
                label="个人简介"
                align="center"
                show-overflow-tooltip>
                </el-table-column>
                <el-table-column
                fixed="right"
                align="center"
                width="200">
                <template slot="header">
                    <el-input
                    v-model="search"
                    size="mini"
                    placeholder="输入关键字搜索"/>
                </template>
                </el-table-column>
                </el-table>
        </el-card>
    </div>
</template>

<script>
export default {
    components:{
       
    },
    data() {
        return {
            tableData: [
                {
                    postgraduate_identity_num:'2022413515',
                    postgraduate_name:'研究生1',
                    postgraduate_gender:'1',
                    postgraduate_email:'123456@23.com',
                    postgraduate_phone_num:123456789,
                    postgraduate_self_intro:'这家伙啥也没留下'
                },
                {
                    postgraduate_identity_num:'2022413516',
                    postgraduate_name:'研究生2',
                    postgraduate_gender:'2',
                    postgraduate_email:'123457@23.com',
                    postgraduate_phone_num:123456789,
                    postgraduate_self_intro:'这家伙啥也没留下'
                },
                {
                    postgraduate_identity_num:'2022413517',
                    postgraduate_name:'研究生3',
                    postgraduate_gender:'1',
                    postgraduate_email:'123459@23.com',
                    postgraduate_phone_num:123456789,
                    postgraduate_self_intro:'这家伙啥也没留下'
                }
            ],
            search:'',
            tableHeight: 500,
        };
    },
    created() {

    },
    mounted() {
        this.$nextTick(function () {
            this.tableHeight = window.innerHeight / 2 -20;
            // 监听窗口大小变化
            let self = this;
            window.onresize = function() {
                self.tableHeight = window.innerHeight / 2 -20;
            }
        })
    },
    methods: {

    }
};
</script>

<style scoped lang="scss">

</style>
