const express = require('express')
const app = express()
app.use(express.static('../dist'))
app.use('/', (req, res) => {
  res.send('../dist/index.html')
})
app.listen(4000)
