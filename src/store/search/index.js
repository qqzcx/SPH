import { reqGetSearchData } from '@/api';

// search模块的小仓库
const state = {
  searchList:{}
};
const mutations = {
  GETSEARCHLIST(state, searchList) {
    //将服务器的searchList数组存储到仓库中
    state.searchList = searchList
  }
};
const actions = {
  //通过API里面的接口函数调用 向服务器发送请求获取数据
  // 获取search数据
  async getSearchList(context, params) {
    //params 用户dispatch派发action时传入的第二个参数 至少是一个空对象
    let result = await reqGetSearchData(params)
    if (result.code === 200) {
      context.commit('GETSEARCHLIST', result.data)
    }
  },
};
//计算属性 一般用于简化数据 可以把我们将来在组件当中要用的数据简化一下 方便获取数据
const getters = {
  //当前形参state是当前小仓库中的state 并非大仓库中的state
  goodsList(state) {
    // || [] 假如后台没有数据 短路运算设置一个空数组
    return state.searchList.goodsList || []
  },
  attrsList() {
    return state.searchList.attrsList || []
  },
  trademarkList() {
    return state.searchList.trademarkList || []
  },
  pageNo() {
    return state.searchList.pageNo
  },
  pageSize() {
    return state.searchList.pageSize
  },
  total() {
    return state.searchList.total
  },
  totalPages() {
    return state.searchList.totalPages
  }
};
export default {
  state,
  mutations,
  actions,
  getters
}