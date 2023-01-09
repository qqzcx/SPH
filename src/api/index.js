//当前这个模块 API进行统一管理
import requests from './request';
import mockRequsets from './mockRequest';

//三级联动接口
// /api/product/getBaseCategoryList  get  无参数
export const reqCategoryList = () => {
  // 发请求 axios发请求返回结果Promise对象
  return requests({ url: '/product/getBaseCategoryList', method: 'get' })
}

//主页轮播图接口 mock
export const reqBannerList = () => {
  return mockRequsets({ url: '/banner', method: 'get' })
}

//floor数据接口
export const reqFloorList = () => {
  return mockRequsets({ url: '/floor', method: 'get' })
}

//search数据接口 给服务器传递一个默认参数（至少是一个空对象）
export const reqGetSearchData = (params) => {
  return requests({ url: '/list', method: 'post', data: params })
}

//detail数据接口 给服务器传递一个skuid String类型 /api/item/{ skuId }
export const reqDetailData = (skuId) => {
  return requests({ url: `/item/${skuId}`,method:'get' })
}