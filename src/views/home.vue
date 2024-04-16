<template>
    <el-container class="home-container" >
        <el-header>
            <HeaderContent></HeaderContent>
        </el-header>
        <el-container>
            <el-aside :width="isColl? '64px' : '200px'">
                <AsideContent @isCollapse="isCollapse"></AsideContent>
            </el-aside>
            <el-main>
                <MainContent></MainContent>
            </el-main>
        </el-container>
    </el-container>
</template>

<script>
    import HeaderContent from '../components/Home/header_content.vue'
    import AsideContent from '../components/Home/aside_content.vue'
    import MainContent from '../components/Home/main_content.vue'
    export default {
        components: {
            HeaderContent,
            AsideContent,
            MainContent
        },
        data() {
            return {
                isColl:false
            };
        },
        methods:{
            isCollapse(isCol){
                this.isColl = isCol
            }
        }
    };
</script>

<style scoped lang="scss">
@import '../assets/scss/color.scss';
.home-container{
    height: 100%;
    .el-header{
        background: $color_dark;
        padding:0;
    }
    .el-aside{
        background: $color_middle_dark;
        transition: all 0.7s;
    }
    .el-main{
        background: $color_grey;
    }
}
</style>
