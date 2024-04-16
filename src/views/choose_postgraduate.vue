<template>
    <div>
        <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/welcome' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>导师入口</el-breadcrumb-item>
            <el-breadcrumb-item>选择研究生</el-breadcrumb-item>
        </el-breadcrumb>

        <el-card class="post_card">
            <div class="card_title">
                <div>
                    <el-tag type="warning" >注意：请至少选择一位研究生后提交</el-tag>
                </div>
                <div class="title_content">
                    研究生表格
                </div>
                <div>
                    <el-tag>支持学号、姓名搜索</el-tag>
                </div>
            </div>
            <div class="card_progress">
                <div class="percentNum">{{multipleSelection.length}} / {{maxStudent}}</div>
                <el-progress :percentage="percent" :format="format" :color="customColors"></el-progress>       
            </div>
            <el-table
                ref="multipleTable"
                :data="tableData.filter(data => !search || 
                data.postgraduate_identity_num.toLowerCase().includes(search.toLowerCase()) ||
                data.postgraduate_name.toLowerCase().includes(search.toLowerCase())
                ).slice((currentPage-1)*pageSize,currentPage*pageSize)"
                tooltip-effect="dark"
                :height="tableHeight"
                row-key="postgraduate_identity_num"
                border
                style="width: 100%"
                @selection-change="handleSelectionChange">
                <el-table-column
                :reserve-selection="true"
                align="center"
                type="selection"
                width="30"
                :selectable="selectable">
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
                <template slot-scope="scope">
                    <el-button @click="handleClick(scope.row)" type="text" size="small">查看详情</el-button>
                </template>
                </el-table-column>
            </el-table>
            <el-button type="primary" class="commitBtn" @click="commitChoose">确认提交</el-button>
                <!--分页-->
            <el-pagination align='center'
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="currentPage"
            :page-sizes="[1,5,10,20]"
            :page-size="pageSize"
            layout="total, sizes, prev, pager, next, jumper"
            :total="tableData.length">
            </el-pagination>
        </el-card>
    </div>
</template>

<script>
export default {
    data() {
        return {
            tableData: [
                {
                    postgraduate_identity_num:'Xb18622207',
                    postgraduate_name:'研究生1',
                    postgraduate_gender:'1',
                    postgraduate_email:'123456@23.com',
                    postgraduate_phone_num:123456789,
                    postgraduate_self_intro:'这家伙啥也没留下'
                },
                {
                    postgraduate_identity_num:'Xb17622807',
                    postgraduate_name:'研究生2',
                    postgraduate_gender:'2',
                    postgraduate_email:'123456@23.com',
                    postgraduate_phone_num:123456789,
                    postgraduate_self_intro:'这家伙啥也没留下'
                },
                {
                    postgraduate_identity_num:'Xb152782207',
                    postgraduate_name:'研究生3',
                    postgraduate_gender:'1',
                    postgraduate_email:'123456@23.com',
                    postgraduate_phone_num:123456789,
                    postgraduate_self_intro:'这家伙啥也没留下'
                },
                {
                    postgraduate_identity_num:'Xc152782207',
                    postgraduate_name:'研究生4',
                    postgraduate_gender:'2',
                    postgraduate_email:'123456@23.com',
                    postgraduate_phone_num:123456789,
                    postgraduate_self_intro:'这家伙啥也没留下'
                },
                {
                    postgraduate_identity_num:'Xc1527823407',
                    postgraduate_name:'研究生5',
                    postgraduate_gender:'1',
                    postgraduate_email:'123456@23.com',
                    postgraduate_phone_num:123456789,
                    postgraduate_self_intro:'这家伙啥也没留下'
                },
                {
                    postgraduate_identity_num:'Xa152782207',
                    postgraduate_name:'研究生6',
                    postgraduate_gender:'2',
                    postgraduate_email:'123456@23.com',
                    postgraduate_phone_num:123456789,
                    postgraduate_self_intro:'这家伙啥也没留下'
                },
                {
                    postgraduate_identity_num:'Xf152782207',
                    postgraduate_name:'研究生7',
                    postgraduate_gender:'1',
                    postgraduate_email:'123456@23.com',
                    postgraduate_phone_num:123456789,
                    postgraduate_self_intro:'这家伙啥也没留下'
                },
            ],
            multipleSelection: [],
            search:'',
            tableHeight: 340,
            percent:0,
            customColors: [
                {color: '#909399', percentage: 20},
                {color: '#e6a23c', percentage: 40},
                {color: '#6f7ad3', percentage: 60},
                {color: '#1989fa', percentage: 80},
                {color: '#EE2C2C', percentage: 100}
            ],
            maxStudent: 4,
            // 当前页数
            currentPage:1,
            // 一页显示几条
            pageSize:5
        };
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
    watch:{
        multipleSelection(newVal){
            if(newVal.length == this.maxStudent) this.percent = 100
            else this.percent = newVal.length / this.maxStudent * 100
        }
    },
    methods: {
        //每页条数改变时触发 选择一页显示多少行
        handleSizeChange(val) {
            //console.log(`每页 ${val} 条`);
            this.currentPage = 1;
            this.pageSize = val;
        },
        //当前页改变时触发 跳转其他页
        handleCurrentChange(val) {
            console.log(`当前页: ${val}`);
            this.currentPage = val;
        },
        // 选择哪几个学生
        handleSelectionChange(val) {
            if(this.maxStudent < val.length) {
                this.$message.warning('注意：已超出名额范围！')
                return 
            }
            this.multipleSelection = val;
        },
        // 查看某个学生
        handleClick(row) {
            console.log(row);
        },
        // 判断可否选中
        selectable(row){
            let index = -1
            this.multipleSelection.forEach((item)=>{
                if(item.postgraduate_identity_num == row.postgraduate_identity_num) index = 1
            })
            if (this.multipleSelection.length >= this.maxStudent) {
                if (index !== -1) {
                    return true
                } else {
                    return false
                }
            } else {
                return true
            }
        },
        // 进度条的满员替换
        format(percentage) {
            return percentage === 100 ? '已满员' : `${percentage}%`;
        },
        // 研究生已选择完毕
        commitChoose(){
            if(this.multipleSelection.length <= this.maxStudent){
                let arr = ["111","222","333"]
                let res = arr.join(",")
                console.log(res)
            }
        }
    }
};
</script>

<style scoped lang="scss">
    @import '../assets/scss/color.scss';
    .el-card{
        .card_title {
            display: flex;
            justify-content:space-between;
            letter-spacing: 0.3em;
            margin-top: 1em;
            margin-bottom: .2em;
            font-size: 20px;
            font-weight: bold;
            color: $color_dark;
            .title_content{
                margin-left: -5.5em;
            }
        }
        .el-tag{
            letter-spacing: 0;
        }
        .card_progress{
            width: 20%;
            margin: 0 auto;
            margin-bottom: .5em;
            font-size: 15px;
            .percentNum{
                float: left;
                margin-left: -3em;
                margin-top: -0.2em;
                color:#606266;
            }
        }
        .commitBtn{
            float: right;
            margin: 1em 0 ;
        }
        .el-pagination{
            height:30px;
            margin-top:1em;
        }
    }
</style>