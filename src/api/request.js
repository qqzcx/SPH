//对于axios进行二次封装
import axios from 'axios';
//引入进度条 start 进度条开始 done 进度条结束
import nprogress from 'nprogress';
//引入进度条样式
import "nprogress/nprogress.css";  
//引入 getUUID()方法生成临时游客uuid_token 然后加入请求拦截器中的header请求头中
import { getUUID } from '@/utils/uuid_token'

//1.利用axios对象的方法create,创建一个axios实例
//2.request就是axios 只不过稍微配置一下
const requests = axios.create({
   //配置对象
   //基础路径 发请求的时候 路径当中会出现api
   baseURL:"/api",
   //代表请求超时的事件5s
   timeout:5000
});
//请求拦截器:在发请求之前，请求拦截器可以检测到,可以在请求发出去前做一些事

requests.interceptors.request.use((config)=>{
  //config 配置对象 里面有一个属性很重要 header请求头
  //请求头中增加一个字段userTempId 为 游客临时uuid_token
   const uuid_token = getUUID()
   config.headers.userTempId = uuid_token
  //进度条开始动
  nprogress.start();
  return config
})

//响应拦截器:
requests.interceptors.response.use((res)=>{
    //成功的回调函数 服务器响应数据回来以后 响应拦截器可以检测到 可以做一些事情
    //进度条结束
    nprogress.done();
    return res.data;
},(error)=>{
   //响应失败的回调函数
   return Promise.reject(new Error('错误'+error));
})



//对外暴露
export default requests;