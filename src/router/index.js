import Vue from 'vue'
import Router from 'vue-router'
import index from '@/views/index'
import login from '@/components/login'
import {config} from 'api/config'
import {getItem} from 'assets/js/store'
Vue.use(Router)

const router = new Router({
  routes: [
    {
      path: '/',
      redirect: '/index'
    },
    {
      path: '/index',
      name: 'index',
      component: index
    },
    {
      path: '/login',
      name: 'login',
      component: login
    }
  ]
})
router.beforeEach((to, from, next) => {
  // to: Route: 即将要进入的目标 路由对象
  // from: Route: 当前导航正要离开的路由
  // next: Function: 一定要调用该方法来 resolve 这个钩子。执行效果依赖 next 方法的调用参数。
  let nextRoute = ['index']
  const userToken = getItem(config.userToken)
  // 未登录状态；当路由到nextRoute指定页时，跳转至login
  if (nextRoute.indexOf(to.name) >= 0) {
    if (!userToken) {
      console.log('未登录')
      router.push({ name: 'login' })
    }
  }
  // 已登录状态；当路由到login时，跳转至home
  if (to.name === 'login') {
    if (userToken) {
      router.push({ name: 'index' })
    }
  }
  next()
})
export default router
