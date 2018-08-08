const userMode = require('../model/user')
const jwt = require('jsonwebtoken')
const querystring = require('querystring')
const config = require('../utils/config') // 全局配置
exports.login = (req, res) => {
  const userName = req.body.user
  const password = req.body.password
  if (userName === '') {
    res.send({
      'code': 1,
      'msg': '用户名不能为空',
      'token': ''
    })
    return false
  }
  if (password === '') {
    res.send({
      'code': 1,
      'msg': '密码不能为空',
      'token': ''
    })
    return false
  }
  userMode.findOne({'name': userName, 'password': password}, function (error, adventure) {
    if (error) {
      console.error(error)
    } else {
      if (!adventure) {
        const token = jwt.sign({user: userName}, config.secret, {
          expiresIn: 10080
        })
        let permission = ''
        if (userName === 'admin') {
          permission = '超级管理员'
        } else {
          permission = '普通管理员'
        }
        userMode.create({'name': userName, 'password': password, 'token': token, 'permission': permission}, function (error, jellybean) {
          if (error) {
            console.error(error)
          } else {
            res.send({
              'code': 0,
              'msg': '登录成功',
              'token': jellybean.token
            })
          }
        })
      } else {
        if (userName !== adventure.name || password !== adventure.password) {
          res.send({
            'code': 1,
            'msg': '用户名或者密码错误',
            'token': ''
          })
        } else {
          res.send({
            'code': 0,
            'msg': '登录成功',
            'token': adventure.token
          })
        }
      }
    }
  })
}
exports.checkUser = (req, res) => {
  const parmas = req.url.split('?')[1]
  const getData = querystring.parse(parmas)
  console.log(getData)
  if (getData.permion === '') {
    res.send({
      code: 1,
      msg: '校验参数不能为空',
      name: '',
      pass: ''
    })
  } else if (getData.permion !== '') {
    const token = getData.permion
    userMode.findOne({'token': token}, function (error, adventure) {
      if (error) {
        console.error(error)
      } else {
        if (!adventure) {
          res.send({
            code: 1,
            msg: '用户不存在',
            name: '',
            pass: ''
          })
        } else {
          res.send({
            code: 0,
            msg: '校验成功',
            name: adventure.name,
            pass: adventure.password,
            permion: adventure.permission
          })
        }
      }
    })
  }
}
exports.getUserList = (req, res) => {
  const parmas = req.url.split('?')[1]
  const getData = querystring.parse(parmas)
  userMode.count({}, function (error, count) {
    if (count === 0) {
      res.send({
        code: 1,
        msg: '暂无数据'
      })
    } else {
      userMode.find({}, {'name': 1, 'permission': 1, 'createTime': 1, '_id': 0}).limit(Number(getData.size)).skip(Number(getData.size * (getData.page - 1))).exec((error, adventure) => {
        if (error) {
          console.error(error)
        } else {
          if (!adventure) {
            res.send({
              code: 1,
              msg: '暂无数据'
            })
          } else {
            console.log(adventure)
            res.send({
              code: 0,
              msg: '查询成功',
              list: adventure,
              page: {
                currentPage: getData.page,
                pageSize: getData.size,
                totalPage: (Math.ceil(count / getData.size)).toFixed(0)
              }
            })
          }
        }
      })
    }
  })
}
