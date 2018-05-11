const crypto = require('crypto')
const token = {
  // 创建token
  createToken: function (obj, timeout) {
    console.log(parseInt(timeout) || 0)
    let newObj = {
      data: obj, // payload
      created: parseInt(Date.now() / 1000),    // token生成的时间的，单位秒
      exp: parseInt(timeout) || 10  // token有效期
    }
    // payload信息
    let base64Str = Buffer.from(JSON.stringify(newObj), 'utf8').toString('base64')
    // 添加签名，防篡改
    let secret = 'news.news-m.com'
    let signature = crypto.createHmac('sha256', secret).update(base64Str).digest('base64')
    return base64Str + '.' + signature
  },
  decodeToken: function (token) {
    let decArr = token.split('.')
    if (decArr.length < 2) {
      // token不合法
      return false
    }
    let payload = {}
    // 将payload json字符串 解析为对象
    try {
      payload = JSON.parse(Buffer.from(decArr[0], 'base64').toString('utf8'))
    } catch (e) {
      return false
    }
    // 检验签名
    let secret = 'news.news-m.com'
    let checkSignature = crypto.createHmac('sha256', secret).update(decArr[0]).digest('base64')
    return {
      payload: payload,
      signature: decArr[1],
      checkSignature: checkSignature
    }
  },
  // token校验
  checkToken: function (token) {
    let resDecode = this.decodeToken(token)
    if (!resDecode) {
      return false
    }
    //是否过期
    var expState = (parseInt(Date.now() / 1000) - parseInt(resDecode.payload.created)) > parseInt(resDecode.payload.exp) ? false : true
    if (resDecode.signature === resDecode.checkSignature && expState) {
      return true
    }
    return false
  }
}
module.exports = exports = token