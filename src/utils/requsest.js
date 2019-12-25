import axios from 'axios';
import { getToken } from './toke'

const instance = axios.create({
    baseURL:process.env.VUE_APP_BASEURL,
    withCredentials:true
})
instance.interceptors.request.use(
    function(config){
        //发送请求之前 添加请求头
        config.headers.token = getToken();
        return config
    },
    function(error){
        //请求错误做一下事情
        return Promise.reject(error);
    }
);
instance.interceptors.response.use(
    function(response){
        //请求之后 可以把data直接获取 后面就不用加data
        return response.data;
    },
    function(error){
        //请求错误做一下事情
        return Promise.reject(error);
    }
);
export default instance