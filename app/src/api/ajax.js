//对axios进行二次封装
import axios from "axios"
//引入进度条
import nProgress from "nprogress";
//引入进度条
import "nprogress/nprogress.css"
import store from "../store"
//给自定义的axios实例添加拦截器
const instance = axios.create({
    //基础路径，发送请求的时候，路径中会出现api
    baseURL:"/api",
    //请求超时的时间5s
    timeout:5000
});

//请求拦截器：在发送请求前，请求拦截器可以检测到，可以在请求发出之前做一些事情
instance.interceptors.request.use((config)=>{
    if(store.state.detail.uuid_token){
        //请求头添加一个字段，和后台商量
        config.headers.userTempId=store.state.detail.uuid_token
    }
    //token
    if(store.state.users.token){
        config.headers.token = store.state.users.token
    }

    nProgress.start();
    return config;
})
//响应拦截器
instance.interceptors.response.use((res)=>{
    nProgress.done()
    return res.data
},(error)=>{
    console.log(error.message);
})

export default instance