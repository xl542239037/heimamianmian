import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex);
//创建仓库
const store = new Vuex.Store({
    state:{
        //用户信息
        userInfo:{}
    },
    //修改数据的方法
   mutations:{
       changeUserInfo(sate,newUserInfo){
        sate.userInfo=newUserInfo;
       }
   }
})
//暴露出去
export default store