import Vue from 'vue'
import App from './App.vue'
//导入路由
import router from './routers/router'
//导入vuex仓库
import store from './store/store'
Vue.config.productionTip = false
//element ui插件导入
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
//导入全局样式
import './style/base.css'
//运行moment 和全局过滤器
import '../src/filters/filters'
//注册到vue
Vue.use(ElementUI);

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
