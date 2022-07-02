<template>
  <div class="wrap">
    <div class="login">
      <el-form ref="Login" :model="formData" :rules="rules" size="medium" label-width="100px">
        <h2>登录</h2>
        <hr />
        <el-row type="flex" justify="start" align="top">
          <el-col :span="22" class="passCol">
            <el-form-item label="密码" prop="password" class="passItem">
              <el-input
                v-model="formData.password"
                placeholder="请输入密码"
                clearable
                show-password
                :style="{width: '100%'}"
              ></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-form-item size="large" class="subBtn">
          <el-button type="primary" @click="submitForm">登入</el-button>
          <el-button @click="resetForm">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>
<script>
export default {
  components: {},
  props: [],
  data() {
    return {
      formData: {
        password: undefined,
      },
      rules: {
        field104: [{
          required: true,
          message: '请输入密码',
          trigger: 'blur'
        }],
      },
    }
  },
  computed: {},
  watch: {},
  created() { },
  mounted() { },
  methods: {
    submitForm() {
      this.$refs['Login'].validate(async (valid) => {
        if (!valid) return
        // TODO 提交表单
        const password = this.formData.password
        try {
          await this.$store.dispatch('userLogin', password)
          this.$router.push({ name: 'home' })
        } catch (error) {
          alert(error)
        }
      })
    },
    resetForm() {
      this.$refs['Login'].resetFields()
    },
  }
}

</script>
<style lang="less" scoped>
.wrap {
  position: relative;
  width: 100%;
  height: 100%;
  background-image: url("../assets/summer.jpg");
  background-size: inherit;
  background-repeat: no-repeat;
}
.login {
  position: absolute;
  width: 400px;
  top: 5%;
  left: 50%;
  margin-left: -200px;
}
.el-form {
  background-color: rgba(240, 255, 255, 0.5);
  border: 2px solid black;
  border-radius: 10px;
  width: 400px;
  h2 {
    height: 45px;
    text-align: center;
    font-size: 20px;
    line-height: 45px;
  }
  .passCol {
    line-height: 58px;
    margin-top: 20px;
    margin-bottom: 20px;
    .passItem {
      margin: 0;
    }
  }
  .subBtn {
    text-align: right;
    padding-right: 10px;
    .el-button {
      background-color: rgb(174, 216, 127);
      color: black;
    }
  }
}
</style>
