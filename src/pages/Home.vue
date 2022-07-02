<template>
  <el-container>
    <el-header>
      <home-header></home-header>
    </el-header>
    <el-main>
      <el-row>
        <el-col :span="24">
          <div class="grid-content bg-purple-dark">
            <h3>网关服务</h3>
          </div>
        </el-col>
      </el-row>
      <Config></Config>
    </el-main>
  </el-container>
</template>

<script>
import HomeHeader from '@/components/HomeHeader.vue';
import Config from '@/pages/Config/Config.vue';
export default {
  name: "home",
  components: { HomeHeader, Config },
  data() {
    return {

    }
  },
  beforeDestroy() {
    this.$store.dispatch('userLogin')
  }
}
</script>

<style lang="less" scoped>
.el-container {
  width: 100%;
  height: 100%;
}
.el-header {
  background-color: #052b5e;
  color: #fff;
  text-align: center;
  line-height: 60px;
  padding: 0px;
}
.el-row {
  margin-bottom: 20px;
  font-size: 18px;
  line-height: 36px;
}
.bg-purple-dark {
  background: #99a9bf;
}
.grid-content {
  min-height: 36px;
  padding-left: 10px;
}
.el-main {
  padding: 0;
}
/* .el-main {
  background-color: #e9eef3;
  color: #333;
  text-align: center;
  line-height: 160px;
} */
</style>