<template>
  <div class="login">
    <div class="login_center">
      <h1 class="title">{{title}}</h1>
      <el-form :model="ruleForm" status-icon :rules="rules" ref="Form" class="formStyle" label-position="top">
        <el-form-item label="用户名" prop="userName">
          <el-input type="text" v-model="ruleForm.userName" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="pass">
          <el-input type="password" v-model="ruleForm.pass" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item class="btn_wamp_submit">
          <el-button type="primary" round @click="submitForm()">提交</el-button>
          <el-button type="default" round @click="resetForm()">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>
<script>
import {trim} from 'assets/js/utils'
import {login} from 'api/index'
export default {
  data () {
    var validateUserName = (rule, value, callback) => {
      var getValue = trim(value)
      if (!getValue) {
        return callback(new Error('用户名不能为空'))
      }
      setTimeout(() => {
        if (getValue.length > 16) {
          callback(new Error('用户名不能超过16位'))
        } else {
          callback()
        }
      }, 1000)
    }
    var validatePass = (rule, value, callback) => {
      var getValue = trim(value)
      if (getValue === '') {
        return callback(new Error('请输入密码'))
      } else {
        callback()
      }
    }
    return {
      title: '登录',
      ruleForm: {
        userName: '',
        pass: ''
      },
      rules: {
        userName: [
          { validator: validateUserName, trigger: 'blur' }
        ],
        pass: [
          { validator: validatePass, trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    submitForm () {
      const _this = this
      _this.$refs.Form.validate((valid) => {
        console.log(valid)
        if (valid) {
          login(_this.ruleForm.userName, _this.ruleForm.pass).then((result) => {
            console.log(result)
            _this.$message({
              showClose: true,
              message: '登录成功',
              type: 'success'
            })
          }).catch((err) => {
            console.log(err)
          })
        } else {
          return false
        }
      })
    },
    resetForm () {
      this.$refs.Form.resetFields()
    }
  }
}
</script>
<style lang="less">
  .login{
    width: 100%;
    height: 100%;
    background: #3A8CB6;
    position: relative;
    .title{
      text-align: center;
      color: #fff;
    }
    .login_center{
      position: absolute;
      left: 50%;
      top: 50%;
      transform: translate(-50%, -70%);
    }
    .formStyle{
      width: 400px;
    }
    .el-form-item__label{
      color: #fff !important;
    }
    .btn_wamp_submit{
      padding-top: 15px;
    }
  }
</style>
