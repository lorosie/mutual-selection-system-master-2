<template>
    <div>
      <div class="toggle_button" @click="toggleCollapse">
        |||
      </div>
      <el-menu
      default-active="1"
      class="el-menu-vertical-demo"
      @open="handleOpen"
      @close="handleClose"
      background-color="#32475C"
      text-color="#fff"
      active-text-color="white"
      :unique-opened="true"
      :collapse="isCollapse"
      :collapse-transition="false">
      <el-submenu index="1">
        <template slot="title">
          <i class="el-icon-s-claim"></i>
          <span>志愿填报</span>
        </template>
          <el-menu-item index="1-1" @click="asideRouter('volluntaryFill')">填报入口</el-menu-item>
          <el-menu-item index="1-2" @click="asideRouter('chosenResult')">双选结果</el-menu-item>
      </el-submenu>
      <el-submenu  index="2" v-if="role !== 2">
        <template slot="title">
          <i class="el-icon-connection"></i>
          <span>导师入口</span>
        </template>
          <el-menu-item index="2-1" @click="asideRouter('choosePostgraduate')">选择研究生</el-menu-item>
          <el-menu-item index="2-2" @click="asideRouter('checkResult')">查看结果</el-menu-item>
      </el-submenu>
      <el-submenu  index="3" v-if="role == 3">
        <template slot="title">
          <i class="el-icon-menu"></i>
          <span>管理员入口</span>
        </template>
          <el-menu-item index="3-1"  @click="asideRouter('importInformation')">信息导入</el-menu-item>
          <el-menu-item index="3-2" @click="asideRouter('activity')">活动入口</el-menu-item>
      </el-submenu>
      <el-menu-item index="4">
        <i class="el-icon-setting"></i>
        <span slot="title" @click="asideRouter('mySpace')">个人空间</span>
      </el-menu-item>
    </el-menu>
    </div>
</template>

<script>
export default {
    components:{
       
    },
    data() {
        return {
           // 身份 1：导师 2：研究生 3：管理员
          role:3,
          isCollapse:false
        };
    },
    created() {

    },
    mounted() {

    },
    methods: {
      // 某一级打开后
      handleOpen(key, keyPath) {
        console.log(key, keyPath);
      },
      // 某一级合上后
      handleClose(key, keyPath) {
        console.log(key, keyPath);
      },
      // 点击按钮切换菜单折叠事件
      toggleCollapse(){
        this.isCollapse = ! this.isCollapse
        this.$emit("isCollapse",this.isCollapse)
      },
      asideRouter(ways){
        this.$router.push(`./${ways}`);
      }
    }
};
</script>

<style scoped lang="scss">
  @import '../../assets/scss/color.scss';
    .toggle_button{
      background-color: $color_middle_grey;
      color:white;
      font-size: 10px;
      line-height: 30px;
      height:30px;
      text-align: center;
      font-weight: bold;
      letter-spacing: 0.2em;
      cursor: pointer;
      &:hover{
        background-color: rgb(102,118,135);
      }
    }
    .el-menu{
      width: 100% !important;
      border-right:none;
      i{
        color:white;
      }
      .is-active{
          color:#fff;
          box-shadow: 0 1px 1px #374452;
          border-top: 1px solid #6f8397;
          background: #4c6075!important;
          position: relative;
          transition: none;
          &:after{
            content: "";
            position: absolute;
            right: 0;
            top: -1px;
            height: 56px;
            width: 5px;
            background: #66B1FF;
          }
      }
      
    }
    
</style>
<style lang="scss">
  .el-menu {
     .el-menu-item{
      transition: all 1s !important;
    }
    .is-active{
      transition: all 1s !important;
    }
    .el-tooltip{
      transition: all 1s !important;
    }
  }

</style>