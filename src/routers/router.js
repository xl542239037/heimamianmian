// 导入 vue-router
import Vue from 'vue'
import VueRouter from 'vue-router'
import login from '../views/login/login.vue'
//注册 vue-router
Vue.use(VueRouter)
// 实例化
const router = new VueRouter({
  //这里就是路由的配制项
  routes: [
    {
      path: '/login',
      component: login
    }
  ]
})
export default router
