import axios from 'axios';
const instance = axios.create({
    //基地址
    baseURL: process.env.VUE_APP_BASEURL,
    // 跨域携带cookie
    withCredentials: true
  });

//暴露登录接口
  export function login(data){
    return instance({
        url:'/login',
        method:'post',
        data
    })
  }
  //暴露短信验证接口
  export function sendsms(data){
    return instance ({
      url: "/sendsms",
      method:'post',
      data
    })
  }
//暴露 注册验证接口
  export function register(data){
    return instance({
      url:"/register",
      method:'post',
      data
    })
  }
  