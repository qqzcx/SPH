import { reqGetShopCart, reqDeleteCartById, reqUpdateCheckedById } from '@/api';

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
    if (result.code === 200 ) {
      context.commit('GETCARTLIST', result.data[0].cartInfoList)
    }
  },
  //删除购物车数据
  async deleteCartById(context, query) {
    let result = await reqDeleteCartById(query.skuId)
    //把code结果传回shopcart组件进行判断
    query.code(result.code)
  },
  //修改商品的选中状态
  async updateCheckedById(context,query) {
    let result = await reqUpdateCheckedById(query.skuId, query.isChecked)
    //把code结果传回shopcart组件进行判断
    if (query.code) { //如果给了回调函数再调用
      query.code(result)
    }
  },
  //修改全部商品状态
  updateAllChecked(context, isAllChecked) { //isAllChecked shopcart传来的参数 是否已经全选
    //购物车商品数据  context.state.cartInfoList
    let promiseArr = []; //保存循环调用接口后返回的primose对象为一个数组 再使用Promise.All()方法
    for (let i = 0; i < context.state.cartInfoList.length; i++) {
      //先判断是否已经全选 
      if (isAllChecked) {  //如果已经全选 则改为未全选
        let result = context.dispatch('updateCheckedById', { skuId: context.state.cartInfoList[i].skuId, isChecked: '0' })
        promiseArr.push(result)
      } else { //如果未全选 则改为全选
        let result = context.dispatch('updateCheckedById', { skuId: context.state.cartInfoList[i].skuId, isChecked: '1' })
        promiseArr.push(result)
      }
    }
    console.log(Promise.all(promiseArr));
    return Promise.all(promiseArr)  //Promise.All()方法  判断一堆promise结果是否成功 
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