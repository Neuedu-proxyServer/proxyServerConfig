<template>
  <div>
    <el-dialog
      v-bind="$attrs"
      v-on="$listeners"
      @open="onOpen"
      @close="onClose"
      title="添加集群"
      :visible="isShow"
    >
      <el-form ref="elForm" :model="formData" :rules="rules" size="medium" label-width="100px">
        <el-row type="flex" justify="start" align="top">
          <el-col :span="16">
            <el-form-item label="名称" prop="field101">
              <el-input
                v-model="formData.field101"
                placeholder="请输入名称"
                clearable
                :style="{width: '100%'}"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="3">
            <el-form-item label prop="field114">
              <el-button type="primary" size="medium" @click="clearText('field101')">清空</el-button>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row type="flex" justify="start" align="top">
          <el-col :span="16">
            <el-form-item label="port" prop="field109">
              <el-input
                v-model="formData.field109"
                placeholder="请输入port"
                clearable
                :style="{width: '100%'}"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="5">
            <el-form-item label prop="field124">
              <el-button type="primary" size="medium" @click="clearText('field109')">清空</el-button>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row type="flex" justify="start" align="top">
          <el-col :span="16">
            <el-form-item label="ip" prop="field117">
              <el-input
                v-model="formData.field117"
                placeholder="请输入ip"
                clearable
                :style="{width: '100%'}"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="3">
            <el-form-item label prop="field118">
              <el-button type="primary" size="medium" @click="clearText('field117')">清空</el-button>
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
import { reqAddRow } from '@/api/index.js';
export default {
  name: "ConfigPopUp",
  inheritAttrs: false,
  components: {},
  props: {
    isShow: {
      type: Boolean, //类型
      required: true, //必要性
      default: false //默认值
    }
  },
  data() {
    return {
      visible: false,
      formData: {
        field101: undefined,
        field114: undefined,
        field109: undefined,
        field124: undefined,
        field117: undefined,
        field118: undefined,
      },
      rules: {
        field101: [{
          required: true,
          message: '请输入名称',
          trigger: 'blur'
        }],
        field109: [{
          required: true,
          message: '请输入port',
          trigger: 'blur'
        }],
        field117: [{
          required: true,
          message: '请输入ip',
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
    clearText(feild) {
      this.$set(this.formData, feild, undefined)
    },
    onOpen() { },
    onClose() {
      this.$refs['elForm'].resetFields()
    },
    close() {
      this.$emit('update:visible', false)
    },
    handelConfirm() {
      let data = {
        //name: this.formData.field101,
        port: this.formData.field109,
        ip: this.formData.field117,
      }
      // console.log(data)
      //如果提交成功，触发config更新数据
      this.$refs['elForm'].validate(async (valid) => {
        if (!valid) return
        //这里应为post
        let res = await reqAddRow(data)
        // console.log(res)
        if (res.status == 200) {
          this.$emit('updateTable')
          this.$message({
            type: 'success',
            message: '名称' + data.name + '添加成功！'
          })
          // this.close()
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
