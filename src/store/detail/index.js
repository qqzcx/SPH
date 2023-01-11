import { reqDetailData, reqAddOrUpdateShopCart } from '@/api';

// detail模块的小仓库
const state = {
  detailData: {}
};
const mutations = {
  GETDETAILDATA(state, detailData) {
    //将服务器的detailData数组存储到仓库中
    state.detailData = detailData
  },
};
const actions = {
  //通过API里面的接口函数调用 向服务器发送请求获取数据
  // 获取detail数据
  async getDetailData(context, query) {
    //query 用户dispatch派发action时传入的第二个String类型参数 skuid
    // console.log('dispatch');
    let result = await reqDetailData(query)
    if (result.code === 200) {
      context.commit('GETDETAILDATA', result.data)
    }
  },
  // 添加或者更新购物车
  async addOrUpdateShopCart(context, query) {
    //query {skuId:xxxx,skuNum:xxxx}
    // 加入购物车后发送请求 成功后服务器并没有返回其他数据 只是返回code = 200 表示成功
    // 因此不需要三连环存储数据
    // console.log(query);
    let result = await reqAddOrUpdateShopCart(query.skuId,query.skuNum)
    query.code(result.code)//回调函数code 将仓库中code结果传给detail组件
  
  },
};
//计算属性 一般用于简化数据 可以把我们将来在组件当中要用的数据简化一下 方便获取数据
const getters = {};
export default {
  state,
  mutations,
  actions,
  getters
}