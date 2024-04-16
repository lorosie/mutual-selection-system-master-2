<template>
  <div>
    <!--面包屑-->
    <el-breadcrumb separator-class="el-icon-arrow-right" class="bread">
      <el-breadcrumb-item :to="{ path: '/welcome' }">首页</el-breadcrumb-item>
    </el-breadcrumb>
    <!--卡片区-->
    <el-card>
      <!--通告-->
      <div class="notice">
        <el-table
          class="noticeTable"
          :data="tableData1"
          stripe
          style="width: 100%"
        >
          <el-table-column prop="noticeName" label="通知公告">
            <template slot-scope="scope">
              <a href="/welcome" target="_self" class="buttonText">{{
                scope.row.noticeName
              }}</a>
            </template>
          </el-table-column>
          <el-table-column prop="" width="100"> </el-table-column>
          <el-table-column prop="noticeTime" width="100">
            <template slot="header" class="moreClick">
              <div @click="moreClick" style="cursor:pointer">More>></div>
            </template>
          </el-table-column>
          <template slot="empty">
            <el-empty description="暂无公告"></el-empty>
          </template>
        </el-table>
      </div>
      <!--日历-->
      <el-calendar>
        <template slot="dateCell" slot-scope="{ data }">
          <p :class="data.isSelected ? 'is-selected' : ''">
            {{ data.day.split("-").slice(1)[1] }}
            {{ data.isSelected ? "✔️" : "" }}
          </p>
        </template>
      </el-calendar>
    </el-card>
  </div>
</template>

<script>
export default {
  components: {},
  data() {
    return {
      tableData1: [
        {
          noticeName:
            "通知1",
          noticeTime: "2024-1-10",
        },
        {
          noticeName: "通知2",
          noticeTime: "2024-1-15",
        },
        {
          noticeName: "通知3",
          noticeTime: "2024-1-25",
        },
        {
          noticeName: "通知4",
          noticeTime: "2024-1-26",
        },
        {
          noticeName: "通知5",
          noticeTime: "2024-1-27",
        },
        {
          noticeName: "通知6",
          noticeTime: "2024-1-28",
        },
        {
          noticeName: "通知7",
          noticeTime: "2024-1-29",
        },
        {
          noticeName: "通知8",
          noticeTime: "2024-1-30",
        },
        {
          noticeName: "通知9",
          noticeTime: "2024-2-01",
        },
      ],
    };
  },
  created() {},
  mounted() {},
  methods: {
    moreClick() {},
  },
};
</script>

<style scoped lang="scss">
.notice {
  float: left;
  width: 45%;
  height: 330px;
  overflow: hidden;
}
a {
  display: inline-block;
  width: 100%;
  color: #4b6584;
  text-decoration: none;
  font-weight: bold;
}
.is-selected {
  color: #1989fa;
}
</style>
<style>
.el-calendar {
  float: right;
  font-weight: bold;
}
.el-calendar /deep/ .el-calendar-table thead th {
  font-weight: bold;
}
.el-calendar__body {
  width: 600px;
  height: 20%;
}
.el-calendar-table .el-calendar-day {
  height: 60px;
}
</style>
<style lang="scss">
@import "../assets/scss/mixin.scss";
.noticeTable tr td .cell a {
  @include clamp(1);
}
</style>
