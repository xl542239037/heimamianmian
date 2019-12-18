// 导入 vue-router
import Vue from 'vue'
import VueRouter from 'vue-router'
import login from '../views/login/login.vue'
import index from '../views/index/index.vue'
import subject from '../views/index/subject/subject.vue'
import user from '../views/index/user/user.vue'
import question from '../views/index/question/question.vue'
import enterprise from '../views/index/enterprise/enterprise.vue'
import chart from '../views/index/chart/chart.vue'
//注册 vue-router
Vue.use(VueRouter)
// 实例化
const router = new VueRouter({
  //这里就是路由的配制项
  routes: [
    {
      path: '/login',
      component: login
    },
    {
      path: '/index',
      component: index,
      children:[
        {
          path:'subject',
          component:subject
        },
        {
          path:'user',
          component:user
        },
        {
          path:'question',
          component:question
        },
        {
          path:'enterprise',
          component:enterprise
        },
        {
          path:'chart',
          component:chart
        }
      ]
    }
  ]
})
export default router
