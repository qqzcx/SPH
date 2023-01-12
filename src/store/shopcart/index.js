import { reqGetShopCart, reqDeleteCartById } from '@/api';

// detail模块的小仓库
const state = {
  cartInfoList: [],
};
const mutations = {
  GETCARTLIST(state, cartInfoList) {
    state.cartInfoList = cartInfoList
    // console.log(state.cartInfoList);
  }
};
const actions = {
  //获取购物车列表数据
  async getCartList(context) {
    let result = await reqGetShopCart()
    if (result.code === 200) {
      context.commit('GETCARTLIST', result.data[0].cartInfoList)
    }
  },
  //删除购物车数据
  async deleteCartById(context, query) {
    let result = await reqDeleteCartById(query.skuId)
    //把code结果传回shopcart组件进行判断
    query.code(result.code)
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