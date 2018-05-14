const express = require('express')
const app = express()
const routers = require('./router/index')
app.all('*', function (req, res, next) {
  res.header('Access-Control-Allow-Credentials', true)
  res.header('Access-Control-Allow-Origin', 'http://localhost:2233')
  res.header('Access-Control-Allow-Headers', 'userToken')
  res.header('Access-Control-Allow-Methods', 'PUT,POST,GET,DELETE,OPTIONS')
  res.header('X-Powered-By', ' 3.2.1')
  res.header('Content-Type', 'application/json;charset=utf-8')
  // 让options请求快速返回
  if (req.method === 'OPTIONS') {
    res.sendStatus(200)
  } else {
    next()
  }
})
app.use('/api/login', routers.user.login)
app.use('/api/checkUser', routers.user.checkUser)
app.use('/api/getUserList', routers.user.getUserList)
app.listen(4000)




// app.use(express.static('../dist'))
// app.use('/', (req, res) => {
//   res.send('../dist/index.html')
// })
