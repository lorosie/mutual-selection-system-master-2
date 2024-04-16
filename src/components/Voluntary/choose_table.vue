<template>
  <div class="choose_table_content" v-show="showTable">
    <div class="table_title">
      <div>
        <el-button type="success" @click="clearEmpty">筛选非满员导师</el-button>
      </div>
      <div class="title_content">导师选择列表</div>
      <div>
        <el-tag
          >目前支持通过导师编号、导师姓名、学历、职称、硕博导进行搜索</el-tag
        >
      </div>
    </div>
    <el-table
      v-loading="loading"
      element-loading-text="拼命加载中"
      :data="
        tableData.filter(
          (data) =>
            !search ||
            data.tutor_work_id.toLowerCase().includes(search.toLowerCase()) ||
            data.tutor_name.toLowerCase().includes(search.toLowerCase()) ||
            data.tutor_edu_background
              .toLowerCase()
              .includes(search.toLowerCase()) ||
            data.tutor_title.toLowerCase().includes(search.toLowerCase()) ||
            data.tutor_status.toLowerCase().includes(search.toLowerCase())
        ).slice((currentPage-1)*pageSize,currentPage*pageSize)
      "
      :height="tableHeight"
      border
      style="width: 100%"
      ref="multipleTable"
      @selection-change="handleSelectionChange"
      row-key="tutor_work_id"
    >
      <el-table-column
                :reserve-selection="true"
                align="center"
                type="selection"
                width="30"
                :selectable="selectable">
      </el-table-column>
      <el-table-column prop="tutor_work_id" label="导师编号"  align="center"> </el-table-column>
      <el-table-column prop="tutor_name" label="导师姓名"  align="center"> </el-table-column>
      <el-table-column prop="tutor_edu_background" label="学历"  align="center">
      </el-table-column>
      <el-table-column prop="tutor_title" label="职称" width="80" sortable  align="center">
      </el-table-column>
      <el-table-column prop="tutor_status" label="硕博导" width="100" sortable  align="center">
        <template slot-scope="scope">
          <el-tag v-if="scope.row.tutor_status == '硕士'">{{
            scope.row.tutor_status
          }}</el-tag>
          <el-tag type="success" v-else-if="scope.row.tutor_status == '博士'">{{
            scope.row.tutor_status
          }}</el-tag>
          <el-tag v-else type="warning">{{ scope.row.tutor_status }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column prop="tutor_email" label="邮箱"  align="center"> </el-table-column>
      <el-table-column prop="tutor_phone_num" label="电话号码"  align="center">
      </el-table-column>
      <el-table-column
        class="chooseStudent"
        label="已选学生/最大指导学生"
        width="200"
        align="center"
      >
        <template slot-scope="scope">
          <el-tag
            type="danger"
            v-if="scope.row.postgraduate_list.length >= scope.row.tutor_max_num"
          >
            {{ scope.row.postgraduate_list.length }} /
            {{ scope.row.tutor_max_num }}
          </el-tag>
          <el-tag v-else effect="plain">
            {{ scope.row.postgraduate_list.length }} /
            {{ scope.row.tutor_max_num }}
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column align="right" width="200">
        <template slot="header">
          <el-input v-model="search" size="mini" placeholder="输入关键字搜索" />
        </template>
        <template slot-scope="scope">
            <el-switch
            v-model="scope.row.status"
            :active-value="2"
            @change="switchChange(scope.row)"
            :inactive-value="1"
            v-if="scope.row.status !== false"
            active-text="第二志愿"
            inactive-text="第一志愿">
          </el-switch>
        </template>
      </el-table-column>
    </el-table>
    <div class="btn_group">
      <el-button style="margin-top: 12px;" @click="before">上一步</el-button>
      <el-button type="primary" style="margin-top: 12px;" @click="next">下一步</el-button>
    </div>
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
  </div>
</template>

<script>
export default {
  props: {
    showTable: {
      type: Boolean,
      default: false,
      require: true,
    },
  },
  data() {
    return {
      tableData: [
        {
          tutor_work_id: "A20180620",
          tutor_name: "测试教师",
          tutor_edu_background: "重庆大学",
          tutor_title: "高级",
          tutor_status: "硕士",
          tutor_email: "123456@123.com",
          tutor_phone_num: "12345678910",
          tutor_max_num: "50",
          postgraduate_list: ["Xb18620207", "Xb18620222", "Xb18110223"],
        },
        {
          tutor_work_id: "A20510620",
          tutor_name: "测试教师2",
          tutor_edu_background: "重庆工商大学",
          tutor_title: "中级",
          tutor_status: "博士",
          tutor_email: "123456@123.com",
          tutor_phone_num: "12345678910",
          tutor_max_num: "20",
          postgraduate_list: ["Xb18612023", "Xb18617852", "Xb15230223"],
        },
        {
          tutor_work_id: "A20122620",
          tutor_name: "教师无学生",
          tutor_edu_background: "重庆邮电大学",
          tutor_title: "初级",
          tutor_status: "硕士",
          tutor_email: "123456@123.com",
          tutor_phone_num: "12345678910",
          tutor_max_num: "10",
          postgraduate_list: [],
        },
        {
          tutor_work_id: "A10152020",
          tutor_name: "教师已满员",
          tutor_edu_background: "重庆大学",
          tutor_title: "高级",
          tutor_status: "博士",
          tutor_email: "123456@123.com",
          tutor_phone_num: "12345678910",
          tutor_max_num: "2",
          postgraduate_list: ["Xb18620207", "Xb18620222"],
        },
        {
          tutor_work_id: "A20123120",
          tutor_name: "测试教师",
          tutor_edu_background: "重庆交通大学",
          tutor_title: "高级",
          tutor_status: "硕士",
          tutor_email: "123456@123.com",
          tutor_phone_num: "12345678910",
          tutor_max_num: "50",
          postgraduate_list: ["Xb18620207", "Xb18620222", "Xb18110223"],
        },
        {
          tutor_work_id: "B20510620",
          tutor_name: "测试教师2",
          tutor_edu_background: "重庆大学",
          tutor_title: "中级",
          tutor_status: "博士",
          tutor_email: "123456@123.com",
          tutor_phone_num: "12345678910",
          tutor_max_num: "20",
          postgraduate_list: ["Xb18612023", "Xb18617852", "Xb15230223"],
        },
        {
          tutor_work_id: "B20122620",
          tutor_name: "教师无学生",
          tutor_edu_background: "重庆工商大学",
          tutor_title: "初级",
          tutor_status: "随便取名",
          tutor_email: "123456@123.com",
          tutor_phone_num: "12345678910",
          tutor_max_num: "10",
          postgraduate_list: [],
        },
        {
          tutor_work_id: "B10152020",
          tutor_name: "教师已满员",
          tutor_edu_background: "重庆工商大学",
          tutor_title: "高级",
          tutor_status: "博士",
          tutor_email: "123456@123.com",
          tutor_phone_num: "12345678910",
          tutor_max_num: "2",
          postgraduate_list: ["Xb18620207", "Xb18620222"],
        },
      ],
      checkList: [],
      search: "",
      loading: true,
      tableHeight: 340,
      switch:'',
      // 当前页数
      currentPage:1,
      // 一页显示几条
      pageSize:5
    };
  },
  created() {
    this.tableData.forEach((item)=>{
      this.$set(item,"status",false)
    })
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
    setTimeout(() => {
      this.loading = false;
    }, 500);
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
    selectable(row) {
      if (row.postgraduate_list.length >= tutor_max_num) {
        row.status = 3
        return false;
      }
      return true;
    },
    before() {
      this.$emit("step", "-2");
    },
    next() {
      // 当用户切换到下一页的时候，讲信息存储到Vuex中
      if (this.checkList.length < 2) {
        this.$message.warning("请先选择两位导师!");
        return;
      } else {
        this.$emit("step", "2");
      }
    },
    // 筛选非满员导师
    clearEmpty() {
      this.loading = true;
      this.tableData.forEach((item, index) => {
        if (item.tutor_max_num <= item.postgraduate_list.length)
          this.tableData.splice(index, 1);
      });
      this.loading = false;
    },
    // 判断可否选中
    selectable(row){
      let index = -1
      if(row.tutor_max_num == row.postgraduate_list.length){
        return false
      }
      this.checkList.forEach((item)=>{
        if(item.tutor_work_id == row.tutor_work_id) index = 1
      })
      if (this.checkList.length >= 2) {
        if (index !== -1) {
            return true
        } else {
             return false
        }
      } else {
        return true
      }
    },
      // 选择哪几个学生
      handleSelectionChange(val) {
        if(2 < val.length) {
          this.$message.warning('注意：已超出名额范围！')
          return 
        }
        this.tableData.forEach((item)=>{
          item.status = false
        })
        let a = 1;
        val.forEach((item)=>{
          item.status = a++
        })
        this.checkList = val;
      },
      switchChange(callback){
        this.tableData.forEach((item)=>{
          if(item.status == callback.status && item.tutor_work_id !== callback.tutor_work_id){
            callback.status == 1 ? item.status = 2 : item.status = 1
          }
        })
      }
  },
};
</script>

<style scoped lang="scss">
@import "../../assets/scss/color.scss";
.choose_table_content {
  .el-table {
    margin: 0 auto;
    margin-top: 1em;
    .el-tag--plain,
    .el-tag.el-tag--danger {
      font-size: 15px;
    }
  }
  .table_title {
    display: flex;
    justify-content: space-between;
    letter-spacing: 0.3em;
    margin-top: 1em;
    font-size: 20px;
    font-weight: bold;
    color: $color_dark;
    .el-tag {
      float: right;
      position: relative;
      letter-spacing: 0;
    }
    .title_content {
      padding-left: 5em;
    }
  }
  .btn_group {
    float: right;
    overflow: hidden;
    margin-bottom: 1em;
  }
  .el-pagination{
    height:30px;
    margin-top:1em;
  }
}
</style>
<style lang="scss">
    .el-switch{
      .is-active{
        color:red;
      }
    }
</style>
