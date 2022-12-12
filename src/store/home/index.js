import {reqCategoryList} from '@/api'

// home模块的小仓库
const state = {
  categoryList:[],//三级菜单数据
};
const mutations = {
  GETCATEGORYLIST(state,categoryList){
    //将服务器的三级菜单数组存储到仓库中
    state.categoryList = categoryList
  }
};
const actions = {
  //通过API里面的接口函数调用 向服务器发送请求获取数据
  async getCategoryList(context){
  let result = await reqCategoryList()
  if(result.code === 200){
    context.commit('GETCATEGORYLIST',result.data)
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