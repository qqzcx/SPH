import { reqDetailData} from '@/api';

// detail模块的小仓库
const state = {
  detailData: {}
};
const mutations = {
  GETDETAILDATA(state, detailData) {
    //将服务器的detailData数组存储到仓库中
    state.detailData = detailData
  }
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
};
//计算属性 一般用于简化数据 可以把我们将来在组件当中要用的数据简化一下 方便获取数据
const getters = {
  //当前形参state是当前小仓库中的state 并非大仓库中的state
  // categoryView(state) {
  //   // || [] 假如后台没有数据 短路运算设置一个空数组
  //   return state.detailData.categoryView 
  // },
};
export default {
  state,
  mutations,
  actions,
  getters
}