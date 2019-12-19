import axios from 'axios';
import {getToken} from '../utils/toke';
const instance = axios.create({
    //基地址
    baseURL: process.env.VUE_APP_BASEURL,
    // 跨域携带cookie
    withCredentials: true
  });
//暴露获取用户信息接口
  export function userInfo(){
    return instance({
      url:'/info',
      method:'get',
      headers:{
        token:getToken()
      }
    })
  }
  export function logout(){
      return instance({
          url:'/logout',
          method:'get',
          headers:{
              token:getToken()
          }
      })
  }