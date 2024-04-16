<template>
    <div>
        <div class="top_header">
            <div class="header_left" @click="backWelcome">
                <img src="../../assets/images/zjlg.png"  class="logo">
                <p>研究生导师双向选择系统</p>
            </div>
            <div class="header_right">
                <div class="header_msg">
                    <!-- 右上角通知功能 -->
                    <el-popover
                        :visible-arrow="true"
                        ref="popover"
                        placement="bottom"
                        width="270"
                        trigger="hover"
                        popper-class="popperHeader">
                            <el-table :data="notice" class="el-table-container">
                                <el-table-column width="80" property="type" label="类型">
                                    <template slot-scope="scope" >
                                        <el-tag size="medium" v-if="scope.row.type == 1">公告</el-tag>
                                        <el-tag size="medium" type="success" v-if="scope.row.type == 2">通知</el-tag>
                                        <el-tag size="medium" type="danger" v-if="scope.row.type == 3">通知</el-tag>
                                    </template>
                                </el-table-column>
                                <el-table-column  property="content" label="内容">
                                    <template slot-scope="scope">
                                        <el-tooltip :content="scope.row.content" placement="left-start" effect="light" popper-class="notice_tooltip">
                                            <div slot>{{scope.row.content}}</div>
                                        </el-tooltip>
                                    </template>
                                </el-table-column>
                                <template slot="empty">
                                    <img src="../../assets/images/tableEmpty.png"   alt="">
                                    <p>暂无通知</p>
                                    <!-- <el-empty description="暂无通知"></el-empty> -->
                                </template>
                            </el-table> 
                            
                    </el-popover>
                    <el-badge 
                        v-popover:popover
                        class="item" 
                        :is-dot="notice.length > 0 ? true: false"
                    >
                        <i class="el-icon-message-solid" @click="noticeAllDetail"></i>
                    </el-badge>
                    <!-- 聊天功能未开发 -->
                    <!-- <el-badge :value="news.num" :max="10" class="item"  :hidden= "news.num > 0 ? false : true">
                        <i class="el-icon-s-promotion"></i>
                    </el-badge> -->
                </div>
                <el-dropdown :hide-on-click="false">
                    <div class="el-dropdown-link userMsgBox">
                        <p>{{userName}}</p>
                        <!-- 头像 -->
                        <img v-if="role == 1" src="../../assets/images/teacher_head.png" class="head_pic">
                        <img v-else-if="role == 2" src="../../assets/images/doctor.png" class="head_pic">
                        <img v-else src="../../assets/images/admin.png" class="head_pic">
                        <i class="el-icon-arrow-down el-icon--right"></i>
                    </div>
                    <el-dropdown-menu slot="dropdown">
                        <el-dropdown-item>个人空间</el-dropdown-item>
                        <el-dropdown-item divided>退出登录</el-dropdown-item>
                    </el-dropdown-menu>
                </el-dropdown>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    components:{

    },
    data() {
        return {
            // 身份 1：导师 2：研究生 3：管理员
            role:1,
            // 通知  type  1:公告； 2：成功通知； 3.失败通知
            // 获取时，要截取只剩3个
            notice:[
                {
                    type:1,
                    content:'第一轮互选时间于2024/4/01开启',
                },
                {
                    type:2,
                    content:'恭喜您，第一志愿已互选成功',
                },
                {
                    type:3,
                    content:'很遗憾，您的第一志愿互选失败，请关注第二次的互选时间',
                },
                {
                    type:3,
                    content:'很遗憾，您的第一志愿互选失败，请关注第二次的互选时间',
                },
                {
                    type:3,
                    content:'很遗憾，您的第一志愿互选失败，请关注第二次的互选时间',
                }
            ],
            news:{
                name:"聊天",
                num:38
            },
            activeName: 'second',
            userName:'请登录'
        };
    },
    created() {
        this.userName = window.sessionStorage.getItem('userName')
    },
    mounted() {

    },
    methods: {
        backWelcome(){
            this.$router.push('/welcome')
        },
        // 点击切换通知内容触发方法
        handleClick(tab, event) {
            console.log(tab, event);
        },
        // 点击进入详细通知界面
        noticeAllDetail(){
            alert("点击进入详情通知界面")
        }
    }
};
</script>

<style scoped lang="scss">
    .top_header{
        height: 60px;
        display: flex;
        justify-content: space-between;
        .header_left{
          width: 320px;
          height: 100%;
          display: flex;
          align-items: center;
            .logo{
                width: 70px;
                height: 60px;
                transition: width 0.2s ease-in-out 0s;
                transform: scale(0.8);
                &:hover{
                    cursor: pointer;
                }
            }
            p{
                width: 300px;
                display: inline-block;
                padding-left: 10px;
                height: 60px;
                line-height: 60px;
                color: white;
                font-size: 20px;
                font-weight:bold;
                letter-spacing:1.5px;
            }
        }
        .header_right{
            display: flex;
            align-items: center;
            .head_pic{
                width: 70px;
                height: 60px;
                transition: width 0.2s ease-in-out 0s;
                transform: scale(0.8);
            }
            .el-dropdown-link{
                display: flex;
                align-items: center;
                img{
                    margin-right: -10px;
                    transform: scale(0.6);
                }
                i{
                    color:white;
                    display: inline-block;
                    font-size: 18px;
                    padding-right: 5px;
                    transform: rotate(180deg) translateX(15%);
                    transition: all 0.5s;
                }
                &:hover{
                    i{
                        transform: rotate(360deg) translateX(-5%);
                    }
                }
            }
            .header_msg{
                .item{
                    margin-right: 25px;
                    color:white;
                    font-size: 17px;
                    sup{
                        color:green;
                    }
                    &:hover{
                        cursor: pointer;
                    }
                }
                .item:first-child{
                    margin-right: 30px;
                }
            }
            .userMsgBox{
                    p{
                        display: inline-block;
                        margin-left: 10px;
                        color:white;
                        font-size: 16px
                    }
                }
        }
    }
</style>
<style lang="scss">
    @import '../../assets/scss/mixin.scss';
    @import '../../assets/scss/color.scss';
    .el-table-container tr td .cell{
        @include clamp(2);
    }

    .el-popover{
        max-height:275px;
        overflow: hidden;
    }
    .el-tooltip__popper.is-light{
        max-width: 200px;
        border:1px solid $color_middle_grey;
        color:#4b6584;
        font-size: 15px;
    }
    .el-table__empty-text{
        img{
            margin-top: 20px;
        }
        line-height: 40px;
    }
</style>
