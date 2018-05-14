import axios from 'axios'
import {config} from './config'
import {getItem} from 'assets/js/store'
const userToken = getItem(config.userToken)
const request = axios.create({
  withCredentials: true,
  baseURL: 'http://localhost:4000',
  headers: {'userToken': userToken}
})
// 登录
export const login = (user, pass) => {
  const url = `/api/login?user=${user}&password=${pass}`
  return request.post(url)
}
// 查看用户信息
export const checkUser = (token) => {
  const url = `/api/checkUser?permion=${token}`
  return request.get(url)
}
// 获取用户列表
export const getUserList = (page, size) => {
  const url = `/api/getUserList?page=${page}&size=${size}`
  return request.get(url)
}
