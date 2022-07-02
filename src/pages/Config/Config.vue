<template>
  <div class="wrap">
    <el-button type="primary" class="el-icon-plus" @click="addMap">添加集群</el-button>
    <el-button type="primary" class @click="submitTable">提交</el-button>
    <el-table :data="tableData" border style="width: 100%">
      <el-table-column prop="name" label="名称"></el-table-column>
      <el-table-column prop="ip" label="ip"></el-table-column>
      <el-table-column prop="port" label="port"></el-table-column>
      <el-table-column prop="date" label="last modified"></el-table-column>
      <el-table-column fixed="right" label="操作">
        <template slot-scope="scope">
          <el-button type="danger" @click="handleClick(scope.row)" icon="el-icon-edit">修改</el-button>
          <el-button type="primary" icon="el-icon-delete" @click="deleteClick(scope)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- <van-pagination
      v-model="currentPage"
      :total-items="50"
      :show-page-size="5"
      :page-count="pageCount"
      @change="pageChange"
    >
      <template #prev-text>
        <van-icon name="arrow-left" />
      </template>
      <template #next-text>
        <van-icon name="arrow" />
      </template>
      <template #page="{ text: boolean }">{{boolean}}</template>
    </van-pagination>-->
    <config-pop-up :isShow="pop" @update:visible="closePop" @updateTable="updateTableData"></config-pop-up>
  </div>
</template>

<script>
import { reqSubmitTable, reqPullData } from '@/api/index.js';
import ConfigPopUp from './ConfigPopUp.vue';
export default {
  name: "config",
  components: { ConfigPopUp },
  data() {
    return {
      pop: false,
      tableData: [],
      // currentPage: 1,
      // pageSize: 10,
      // pageCount: '',
      // totalItem: '',
      // rememberScroll: 0
    }
  },
  async created() {
    let res = await reqPullData()
    this.tableData.push(res.date)
  },
  methods: {
    // 添加集群
    addMap() {
      this.pop = true
    },
    async submitTable() {
      try {
        await reqSubmitTable(this.tableData)
      } catch (error) {
        alert(error.message)
      }

    },
    closePop(e) {
      this.pop = e
    },
    async updateTableData() {
      let res = await reqPullData()
      if (res.status == 200) {
        this.tableData = res.date
        this.pop = false
      }
    },
    //分页
    // pageChange(page) {
    //   document.documentElement.scrollTop = 0
    //   this.currentPage = page
    //   const params = "?pagenum=" + this.currentPage + "&pagesize=" + this.pageSize
    //   const requestUrl = "/api/get/blogs" + params
    //   service.get(requestUrl)
    //     .then((res) => {
    //       //console.log(res)
    //       this.blogs = res.data.blogs
    //     })
    // },
    // 修改集群名称
    handleClick(scoped) {
      this.$prompt('是否要修改 ' + scoped.name + ' 分类名称', '修改分类名称', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        inputValue: scoped.name
      }).then(({ value }) => {
        // console.log(scoped);
        let d = new Date();
        scoped.name = value;
        scoped.date = `${d.getFullYear()}-${d.getMonth() + 1}-${d.getDate()} ${d.getHours()}:${d.getMinutes()}:${d.getSeconds()}`;
        this.$message({
          type: 'success',
          message: '分类名称 ' + value + ' 修改成功！'
        });
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '取消修改'
        });
      });
    },

    // 删除
    deleteClick(scoped) {
      //console.log(scoped)
      // console.log(scoped);
      this.$confirm('删除该条数据，是否继续?', '删除分类', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(({ value }) => {
        this.tableData.splice(scoped.$index, 1);
        this.$message({
          type: 'success',
          message: scoped.row.name + ' 删除成功！'
        });
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '取消删除'
        });
      });
    }
  }
}
</script>

<style lang="less" scoped>
.wrap {
  height: 600px;
  padding: 100px;
  padding-top: 30px;
}
</style>

  