const express = require('express')
const app = express()
const userMode = require('./model/user')
const jwt = require('jsonwebtoken')
const querystring = require('querystring')
const config = require('./config') // 全局配置
app.all('*', function (req, res, next) {
  res.header('Access-Control-Allow-Credentials', true)
  res.header('Access-Control-Allow-Origin', 'http://localhost:2233')
  res.header('Access-Control-Allow-Headers', 'userToken')
  res.header('Access-Control-Allow-Methods', 'PUT,POST,GET,DELETE,OPTIONS')
  res.header('X-Powered-By', ' 3.2.1')
  res.header('Content-Type', 'application/json;charset=utf-8')
  // 让options请求快速返回
  if (req.method === 'OPTIONS') {
    res.send(200)
  } else {
    next()
  }
})

app.use('/api/login', (req, res) => {
  const parmas = req.url.split('?')[1]
  const getData = querystring.parse(parmas)
  const userName = getData.user
  const password = getData.password
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
        userMode.create({'name': userName, 'password': password, 'token': token}, function (error, jellybean) {
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
})
// app.use(express.static('../dist'))
// app.use('/', (req, res) => {
//   res.send('../dist/index.html')
// })
app.listen(4000)
