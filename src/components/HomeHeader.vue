<template>
  <header>
    <el-row type="flex" class="row-bg">
      <el-col :span="15" class="fl">
        <!-- <div class="grid-content bg-purple"></div> -->
        <ul>
          <li>
            <a class="yun">华科云</a>
          </li>
        </ul>
      </el-col>
      <el-col :span="5" class="fr">
        <!-- <div class="grid-content bg-purple"></div> -->
        <ul>
          <li>
            <!-- 换成图标 -->
            <a href>站内信</a>
          </li>
          <li>
            <a href class="arrow-icon">工具</a>
          </li>
          <li>
            <a href>费用</a>
          </li>
        </ul>
      </el-col>

      <el-col :span="3" class="right" :offset="1">
        <button class="logout" @click="logout">退出</button>
        <button class="modify" @click="changePassword">修改密码</button>
      </el-col>
    </el-row>
    <modify-password :isShowModify="popModify" @update:visible="closePop"></modify-password>
  </header>
</template>

<script>
import ModifyPassword from '@/pages/modifyPassword/ModifyPassword.vue';
export default {
  name: "HomeHeader",
  components: { ModifyPassword },
  data() {
    return {
      popModify: false,
    }
  },
  methods: {
    async logout() {
      try {
        await this.$store.dispatch('userLogout')
        this.$router.push({ name: "login" })
      } catch (error) {
        alert(error)
      }
    },
    changePassword() {
      this.popModify = true
    },
    closePop(e) {
      this.popModify = e

    },
  }
}
</script>

<style lang="less" scoped>
.row-bg {
  height: 60px;
  background-color: #052b5e;
  color: #fff;
}
header {
  height: 100%;
  background-color: #f1f1f1;
  font-size: 18px;
  text-align: left;
  ul {
    height: 60px;
    overflow: hidden;
  }
  ul li {
    float: left;
    height: 60px;
    margin: 0;
    padding: 0 14px;
    line-height: 56px;
    border-right: 1.5px solid #666666;
    a {
      color: #f1f1f1;
    }
    .yun {
      font-size: 30px;
    }
  }
  .fl {
    ul li {
      border: none;
    }
  }
  .fm {
    text-align: right;
  }
  .fr {
    ul {
      margin-left: 120px;
      width: 250px;
    }
    ul li:nth-child(3) {
      border: none;
    }
  }
  .photo {
    padding-right: 8px;
    text-align: right;
    background-color: #052b5e;
    line-height: 60px;
    span {
      display: block;
      height: 60px;
    }
    .el-dropdown {
      vertical-align: middle;
    }
    .el-dropdown-link {
      img {
        vertical-align: middle;
        border-radius: 50%;
      }
    }
  }
  .right {
    padding-left: 20px;
  }
  .logout {
    background-color: #052b5e;
    margin-right: 20px;
  }
  .modify {
    background-color: #052b5e;
  }
}
</style>