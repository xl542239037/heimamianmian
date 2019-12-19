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
import { getToken,remove } from '../utils/toke'
import { Message } from 'element-ui';
import { userInfo } from '../api/user'
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
      children: [
        {
          path: 'subject',
          component: subject
        },
        {
          path: 'user',
          component: user
        },
        {
          path: 'question',
          component: question
        },
        {
          path: 'enterprise',
          component: enterprise
        },
        {
          path: 'chart',
          component: chart
        }
      ]
    }
  ]
})

//注册白名单
const whilepaths = ['/login'];
//注册导航守卫
router.beforeEach((to, from, next) => {
  if (whilepaths.includes(to.path) == false) {
    if (!getToken()) {
      Message.error('请先登录才能访问');
      next('/login');
    }else {
      userInfo().then(res=>{
        if (res.data.code==200) {
          window.console.log(res);
          
          next();
        }else if(res.data.code==206){
          Message.warning('小样想伪造token，滚回去');
          remove();
          next('/login');
        }
      })
    }
  }else {
    next();
  }
})

export default router
