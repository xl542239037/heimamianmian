//导入Vue
import Vue from 'vue'
//导入moment日期插件
import moment from 'moment'
//全局过滤器 把这个数据formtim 传递给moment 就可以转化为这个格式
Vue.filter('formtime',function(time){
    return moment(time).format('YYYY-MM-DD');
})