import { reqCategoryList, reqBannerList } from '@/api'

// home模块的小仓库
const state = {
  categoryList: [],//三级菜单数据
  bannerList: [],//轮播图数据
};
const mutations = {
  GETCATEGORYLIST(state, categoryList) {
    //将服务器的三级菜单数组存储到仓库中
    state.categoryList = categoryList
  },
  GETBANNERLIST(state, bannerList) {
    //将模拟的轮播图数据存储到仓库中
    state.bannerList = bannerList
  }
};
const actions = {
  //通过API里面的接口函数调用 向服务器发送请求获取数据
  // 获取三级联动数据
  async getCategoryList(context) {
    let result = await reqCategoryList()
    if (result.code === 200) {
      context.commit('GETCATEGORYLIST', result.data)
    }
  },
  async getBannerList(context) {
    let result = await reqBannerList()
    if (result.code === 200) {
      context.commit('GETBANNERLIST', result.data)
    }
  }
};
const getters = {};
export default {

  state,
  mutations,
  actions,
  getters
}