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
