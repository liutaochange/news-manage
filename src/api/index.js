import axios from 'axios'
const request = axios.create({
  withCredentials: true
})
// 登录
export const login = (user, pass) => {
  const url = '/api/login'
  const data = Object.assign({}, {
    user: user,
    password: pass
  })
  return request.get(url, {
    params: data
  })
}
