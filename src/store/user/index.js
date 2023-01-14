//登录与注册小仓库

import { reqGetCode ,reqRegister } from '@/api';

// detail模块的小仓库
const state = {

};
const mutations = {
  // GETCARTLIST(state, cartInfoList) {
  //   console.log('mutations', cartInfoList);
  //   state.cartInfoList = cartInfoList
    // console.log(state.cartInfoList);
  // }
};
const actions = {
  //获取验证码
  async getCode(context,phone) {
    let result = await reqGetCode(phone)
    return result
  },
  //完成注册
  async register(context,data) {
    let result = await reqRegister(data)
    // console.log(result);
    return result
  }
};
//计算属性 一般用于简化数据 可以把我们将来在组件当中要用的数据简化一下 方便获取数据
const getters = {

};
export default {
  state,
  mutations,
  actions,
  getters
}