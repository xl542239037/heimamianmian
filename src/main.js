import Vue from 'vue'
import App from './App.vue'
import router from './routers/router'
Vue.config.productionTip = false
//element ui插件导入
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
//导入全局样式
import './style/base.css'
//注册到vue
Vue.use(ElementUI);

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
