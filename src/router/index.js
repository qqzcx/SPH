//配置路由的地方
import VueRouter from 'vue-router';

//引入路由组件
import Home from '@/pages/Home'
import Search from '@/pages/Search'
import Login from '@/pages/Login'
import Register from '@/pages/Register'

//备份push replace 方法
let oldPush = VueRouter.prototype.push;
let oldReplace = VueRouter.prototype.replace;

// call和apply方法
//相同 都可以指定this去调用函数一次
//不同 call传递参数用逗号 apply传递参数用数组

// 重写push replace方法  location 跳转参数  resolve 成功回调 reject 失败回调
VueRouter.prototype.push = function(location,resolve,reject){
 
    if (resolve && reject) {  //如果传了promise成功和失败的回调
      oldPush.call(this,location,resolve,reject)
    } else { //如果没传就给两个空回调防止报错
      oldPush.call(this,location,()=>{},()=>{})
    }
}

VueRouter.prototype.replace = function(location,resolve,reject){
 
  if (resolve && reject) {  //如果传了promise成功和失败的回调
    oldReplace.call(this,location,resolve,reject)
  } else { //如果没传就给两个空回调防止报错
    oldReplace.call(this,location,()=>{},()=>{console.log();})
  }
}

//配置路由

export default new VueRouter({
  routes: [
    {
      path: "/home",
      component: Home,
      meta:{showFooter:true,show:true}
    },
    {
      //  /:keyword 为params参数 需要占位 若要指定params可传可不传 在后面加一个？
      path: "/search/:keyword?",
      component: Search,
      meta:{showFooter:true,show:true},
      name:'search'
    },
    {
      path: "/login",
      component: Login,
    }, 
    {
      path: "/register",
      component: Register,
    },
    //路由重定向 在项目运行时 访问/立马跳转到首页home
    {
      path:"*",
      redirect:"/home"
    }
  ]
})