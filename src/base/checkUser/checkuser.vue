<template>
  <div class="check-wamp">
    <el-form ref="form" :model="form" label-width="80px">
      <el-form-item label="用户名">
        <el-input v-model="form.name" readonly="true"></el-input>
      </el-form-item>
      <el-form-item label="用户密码">
        <el-input v-model="form.pass" readonly="true"></el-input>
      </el-form-item>
      <el-form-item label="用户权限">
        <el-input v-model="form.permion" readonly="true"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">确定</el-button>
        <el-button>取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import {checkUser} from 'api/index'
import {getItem} from 'assets/js/store'
import {config} from 'api/config'
export default {
  name: 'checkuser',
  data () {
    return {
      form: {
        name: '',
        pass: '',
        permion: ''
      }
    }
  },
  created () {
    this._getUserInfo()
  },
  methods: {
    onSubmit () {
      console.log('submit!')
    },
    _getUserInfo () {
      const token = getItem(config.userToken)
      checkUser(token).then((res) => {
        if (res.data.code === 1) {
          this.$router.push({ name: 'login' })
        } else if (res.data.code === 0) {
          this.form.name = res.data.name
          this.form.pass = res.data.pass
          this.form.permion = res.data.permion
        }
      })
    }
  }
}
</script>

<style scoped lang="less">
  .check-wamp{

  }
</style>
