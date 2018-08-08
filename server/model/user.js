const mongoose = require('../utils/mongodb')
const Schema = mongoose.Schema
const moment = require('moment')
const UserSchema = new Schema({
  name: {
    type: String,
    unique: true, // 不可重复约束
    require: true // 不可为空约束
  },
  password: {
    type: String,
    require: true // 不可为空约束
  },
  token: {
    type: String
  },
  permission: {
    type: String
  },
  createTime: {
    type: Date,
    default: moment()
  },
  updateTime: {
    type: Date,
    default: moment()
  }
},{
  versionKey: false,
  timestamps: { createdAt: 'createTime', updatedAt: 'updateTime' }
})
const userModel = mongoose.model('users', UserSchema)
module.exports = userModel
