const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const userMode = require('./model/user')
const jwt = require('jsonwebtoken')
const config = require('./config') //全局配置
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.all('/api', function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*")
  res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS')
  res.header("Access-Control-Allow-Headers", "X-Requested-With")
  res.header('Access-Control-Allow-Headers', 'Content-Type')
  if (req.method=="OPTIONS") {  /*让options请求快速返回*/
    res.send(200)
  } else {
    next()
  }
})

app.use('/api/login', (req, res) => {
  console.log(req)
  const userName = req.body.user
  const password = req.body.password
  if (userName == '') {
    res.send({
      'code': 1,
      'msg': '用户名不能为空',
      'token': ''
    })
    return false
  }
  if (password == '') {
    res.send({
      'code': 1,
      'msg': '密码不能为空',
      'token': ''
    })
    return false
  }
  console.log(userName)
  console.log(password)
  userMode.findOne({'name': userName, 'password': password}, function (error, adventure) {
    if (error) {
      console.error(error)
    } else {
      console.log('adventure:'+adventure)
      if (!adventure) {
        const token = jwt.sign({user: userName}, config.secret,{
          expiresIn: 10080  // token到期时间设置
        })
        userMode.create({'name': userName, 'password': password, 'token': token}, function (error, jellybean, snickers) {
          if (error) {
            console.error(error)
          } else {
            console.log('jellybean:'+jellybean)
            console.log('snickers:'+snickers)
          }
        })
      }
      // res.send({
      //   'code': 0,
      //   'msg': '登录成功',
      //   'token': ''
      // })
    }
  })
})
app.use(express.static('../dist'))
app.use('/', (req, res) => {
  res.send('../dist/index.html')
})
app.listen(4000)

