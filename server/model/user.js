const mongoose = require('../utils/mongodb')
const Schema = mongoose.Schema
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
  }
})
const userModel = mongoose.model('users', UserSchema)
// // 增加一条数据
// userMode.create(query, function (error, jellybean, snickers) {
//   if (error) {
//     console.error(error)
//   } else {
//     return true
//   }
// })
// // 单条数据查询
// userMode.findOne(query, function (error, adventure) {
//   if (error) {
//     console.error(error)
//   } else {
//     console.log(adventure)
//   }
// })
// // 删除一条数据
// userMode.deleteOne(query, function (error) {
//   if (error) {
//     console.error(error)
//   } else {
//     return true
//   }
// })
// // 修改一条数据
// Model.update(query, newItem, function (error) {
//   if (error) {
//     console.error(error)
//   } else {
//     return true
//   }
// })
module.exports = userModel
