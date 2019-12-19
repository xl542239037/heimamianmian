const KEY = 'mmtoken';
//保存token
export const setToken = (token)=>{
    localStorage.setItem(KEY,token)
}
//获取token
export const getToken = ()=>{
    return localStorage.getItem(KEY);
}
//删除token
export const remove =()=>{
    localStorage.removeItem(KEY);
}

