<template>
  <div>
    <el-dialog
      v-bind="$attrs"
      v-on="$listeners"
      @open="onOpen"
      @close="onClose"
      title="修改密码"
      :visible="isShowModify"
    >
      <el-form ref="elForm" :model="formData" :rules="rules" size="medium" label-width="120px">
        <el-row type="flex" justify="start" align="top">
          <el-col :span="15">
            <el-form-item label="请输入原密码" prop="originPass">
              <el-input
                v-model="formData.originPass"
                placeholder="请输入原密码"
                clearable
                :style="{width: '100%'}"
              ></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row type="flex" justify="start" align="top">
          <el-col :span="15">
            <el-form-item label="请输入新密码" prop="nowPass">
              <el-input
                v-model="formData.nowPass"
                placeholder="请输入新密码"
                clearable
                :style="{width: '100%'}"
              ></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row type="flex" justify="start" align="top">
          <el-col :span="15">
            <el-form-item label="确认新密码" prop="confirmNew">
              <el-input
                v-model="formData.confirmNew"
                placeholder="请再次输入新密码"
                clearable
                :style="{width: '100%'}"
                @keyup="confirm"
              ></el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <div slot="footer">
        <el-button @click="close">取消</el-button>
        <el-button type="primary" @click="handelConfirm">确定</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import { reqModifyPassword } from '@/api/index.js';
export default {
  inheritAttrs: false,
  components: {},
  props: ['isShowModify'],
  data() {
    return {
      formData: {
        originPass: undefined,
        nowPass: undefined,
        confirmNew: undefined,
      },
      rules: {
        originPass: [{
          required: true,
          message: '请输入原密码',
          trigger: 'blur'
        }],
        nowPass: [{
          required: true,
          message: '请输入新密码',
          trigger: 'blur'
        }],
        confirmNew: [{
          required: true,
          message: '请再次输入新密码',
          trigger: 'blur'
        }],
      },
    }
  },
  props: {
    isShowModify: {
      type: Boolean, //类型
      required: true, //必要性
      default: false //默认值
    }
  },
  computed: {},
  watch: {},
  created() { },
  mounted() { },
  methods: {
    onOpen() { },
    onClose() {
      this.$refs['elForm'].resetFields()
    },
    close() {
      this.$emit('update:visible', false)
    },
    confirm() {
      console.log("confirm")
      if (this.formData.nowPass !== this.formData.confirmNew) {
        this.rules.confirmNew.message = "与上一行输入的不同"
        this.$refs['elForm'].validate((valid) => {
          if (!valid) return
        })
      }
    },
    handelConfirm() {
      let data = {
        originPass: this.formData.originPass,
        nowPass: this.formData.nowPass
      }
      // console.log(data)
      //如果提交成功，触发config更新数据
      this.$refs['elForm'].validate(async (valid) => {
        if (!valid) return
        //这里应为post
        let res = await reqModifyPassword(data)
        if (res.status == 200) {
          this.$emit('updatePass', data)
          this.$message({
            type: 'success',
            message: '修改成功'
          })
          this.close()
          this.$store.dispatch('userLogout')
        }
        else {
          this.$message({
            type: 'info',
            message: '添加失败'
          });
          this.close()
        }

      })

    },
  }
}

</script>
<style>
</style>
