import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router';
// 全局组件注册
// 三级联动组件
import TypeNav from '@/components/TypeNav'
//第一个参数 全局组件的名字  第二个参数 哪一个组件
Vue.component(TypeNav.name, TypeNav)

//引入MockServer.js  mock数据
import '@/mock/mockServe';

//引入swiper轮播图样式
import 'swiper/css/swiper.css';

//引入路由
import router from '@/router';

//引入ElementUI
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI, { size: 'small', zIndex: 3000 });

//使用路由
Vue.use(VueRouter);

//关闭Vue的生产提示
Vue.config.productionTip = false

//引入仓库
import store from '@/store';
//使用仓库 在store文件夹的index里使用  因为在引入store前需要先使用VueX

new Vue({
  render: h => h(App),
  //注册路由:组件实例身上会多一个$route,$router属性
  router: router,
  //注册仓库:组件实例的身上会多一个$store属性
  store: store,
  beforeCreate() {
    Vue.prototype.$bus = this	//安装全局事件总线
  }
}).$mount('#app')
