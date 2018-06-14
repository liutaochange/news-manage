<template>
  <div class="main-wamp">
    <el-form ref="Form" :model="form" :rules="formRule">
      <el-form-item prop="registration.integral">
        <div class="item-node">
          <el-checkbox v-model="form.registration.isSelected">注册礼，注册赠
            <el-input v-model="form.registration.integral" placeholder="请输入积分"></el-input>
            <div class="text">积分</div>
          </el-checkbox>
        </div>
      </el-form-item>
      <el-form-item prop="birthdayGift.count">
        <div class="item-node">
          <el-checkbox v-model="form.birthdayGift.isSelected">生日礼券</el-checkbox>
          <div class="text-indent">
            <el-checkbox v-model="form.birthdayGift.isSelected">10元无门槛券
              <el-input v-model="form.birthdayGift.count" placeholder="请输入张数"></el-input>
              <div class="text">张</div>
            </el-checkbox>
          </div>
        </div>
      </el-form-item>
      <el-form-item prop="discounts.isSelected">
        <div class="item-node">
          <el-checkbox v-model="form.discounts.isSelected" @change="handleAllChange">每月优惠券</el-checkbox>
          <el-checkbox-group v-model="form.discounts.selectItem" @change="handleCheckedChange">
              <div class="text-indent" v-for="(item, index) in form.discounts.select" :key="item.alias">
                <el-form-item :prop="getProps(index)" :rules="{required: getRules(index), message: '不能为空', trigger: 'blur'}">
                  <el-checkbox :label="item.alias">{{item.name}}
                    <el-input v-model="item.count" placeholder="请输入张数"></el-input>
                    <div class="text">张</div>
                  </el-checkbox>
                </el-form-item>
              </div>
          </el-checkbox-group>
        </div>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm">提交</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
export default {
  data () {
    var validateIntegral = (rule, value, callback) => {
      if (this.form.registration.isSelected) {
        if (value === '') {
          callback(new Error('请输入积分'))
        } else {
          callback()
        }
      } else {
        callback()
      }
    }
    var validateCount = (rule, value, callback) => {
      if (this.form.birthdayGift.isSelected) {
        if (value === '') {
          callback(new Error('请输入生日礼券张数'))
        } else {
          callback()
        }
      } else {
        callback()
      }
    }
    var validateDisSelect = (rule, value, callback) => {
      let selectItem = this.form.discounts.selectItem
      if (value) {
        if (selectItem.length === 0) {
          callback(new Error('请选择优惠券类型'))
        } else {
          callback()
        }
      } else {
        callback()
      }
    }
    return {
      form: {
        registration: {
          isSelected: false,
          integral: ''
        },
        birthdayGift: {
          isSelected: false,
          count: ''
        },
        discounts: {
          isSelected: false,
          select: [
            {
              count: '',
              name: '10元无门槛券',
              alias: 'one'
            },
            {
              count: '',
              name: '20元无门槛券',
              alias: 'two'
            },
            {
              count: '',
              name: '50元无门槛券',
              alias: 'three'
            },
            {
              count: '',
              name: '100元无门槛券',
              alias: 'four'
            }
          ],
          selectItem: []
        }
      },
      formRule: {
        'registration.integral': [{ validator: validateIntegral, trigger: 'blur' }],
        'birthdayGift.count': [{ validator: validateCount, trigger: 'blur' }],
        'discounts.isSelected': [{ validator: validateDisSelect, trigger: 'blur' }]
      }
    }
  },
  methods: {
    getProps (index) {
      return `discounts.select.${index}.count`
    },
    getRules (index) {
      const self = this
      if (self.form.discounts.isSelected) {
        let getAlias = self.form.discounts.select[index].alias
        if (self.form.discounts.selectItem.includes(getAlias)) {
          return true
        } else {
          return false
        }
      } else {
        return false
      }
    },
    handleAllChange (value) {
      if (!value) {
        this.form.discounts.selectItem = []
        this.form.discounts.isSelected = false
      }
    },
    handleCheckedChange (value) {
      let checkedCount = value.length
      if (checkedCount > 0) {
        this.$set(this.form.discounts, 'isSelected', true)
      } else {
        this.$set(this.form.discounts, 'isSelected', false)
      }
    },
    submitForm () {
      this.$refs.Form.validate((valid) => {
        if (valid) {
          alert('submit!')
        } else {
          console.log('error submit!!')
          return false
        }
      })
    }
  }
}
</script>
<style lang="less" scoped>
  .main-wamp{
    width: 100%;
    height: 100%;
    background: #fff;
    padding: 20px;
    .item-node{
      .el-input{
        width: 120px;
        margin-left: 5px;
      }
      .text{
        display: inline-block;
        margin-left: 5px;
        height: 40px;
        line-height: 40px;
        font-size: 14px;
      }
      .text-indent{
        display: block;
        margin-left: 20px;
        margin-bottom: 10px;
      }
    }
  }
</style>
