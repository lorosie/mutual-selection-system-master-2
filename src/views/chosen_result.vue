<template>
    <div>
        <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/welcome' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>志愿填报</el-breadcrumb-item>
            <el-breadcrumb-item>双选结果</el-breadcrumb-item>
        </el-breadcrumb>
        <el-card v-if="resultList.length > 0" class="res_content">
            <div class="block">
                <el-timeline>
                    <el-timeline-item 
                    :timestamp="value.time" 
                    placement="top"  
                    v-for="(value,index) in resultList" 
                    :key="index"
                    :color="value.color"
                    >
                    <el-card class="res_content">
                        <h4 v-if="value.type == 1">活动开启</h4>
                        <h4 v-else-if="value.type == 2">研究生已选择完毕</h4>
                        <h4 v-else-if="value.type == 3">导师已双选研究生</h4>
                        <h4 v-else-if="value.type == 4">导师未选择研究生</h4>
                        <h4 v-else-if="value.type == 0">活动结束</h4>
                        <p>{{value.content}}</p>
                    </el-card>
                    </el-timeline-item>
                </el-timeline>
            </div>
        </el-card>

        <el-empty v-show="resultList.length <=0" description="暂无活动"></el-empty>

    </div>
</template>

<script>
export default {
    data() {
        return {
            // 1 表示活动开启 0 表示活动结束
            // 2 表示研究生已选择成功等待导师 3 表示导师已选择该研究生 4 表示导师未选择该研究生
            resultList:[
                {
                    time:'2024/4/01',
                    content:'第一轮志愿双选活动开始',
                    type:'1'
                },
                {
                    time:'2024/4/02',
                    content:'测试员 已选择导师 导师1号',
                    type:'2'
                },
                {
                    time:'2024/4/03',
                    content:'导师1号 已选择研究生 测试员',
                    type:'3'
                },
                {
                    time:'2024/4/03',
                    content:'导师1号 未选择 测试员',
                    type:'4'
                },
                {
                    time:'2024/4/15',
                    content:'第一轮志愿双选结束',
                    type:'0'
                }
            ]
        };
    },
    created() {
        this.setColor()
    },
    mounted() {
        
    },
    methods: {
        setColor(){
            this.resultList.forEach((item)=>{
                if(item.type == 1 || item.type == 0) item.color = '#4876FF'
                else if(item.type == 2) item.color = '#EEAD0E'
                else if (item.type == 3) item.color = '#0bbd87'
                else if (item.type == 4) item.color = '#EE2C2C'
            })
        }
    }
};
</script>

<style scoped lang="scss">
    .res_content{
        max-height:calc(80vh);
        overflow:auto;
    }
    .block{
        .el-card__body{
            h4{
                font-size: 16px;
            }
            p{
                padding-top: 8px;
                font-size: 15px;
            }
        }
    }
</style>
