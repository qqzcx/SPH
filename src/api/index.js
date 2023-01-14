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
  return requests({ url: `/item/${skuId}`, method: 'get' })
}

//将产品添加到购物车和更新购物车数量 /api/cart/addToCart/{ skuId }/{ skuNum }
export const reqAddOrUpdateShopCart = (skuId, skuNum) => {
  return requests({ url: `/cart/addToCart/${skuId}/${skuNum}`, method: 'post' })
}

//获取购物车数据   /api/cart/cartList
export const reqGetShopCart = () => {
  return requests({ url: '/cart/cartList', method: 'get' })
}

//删除购物车商品 /api/cart/deleteCart/{skuId}  请求方式 DELETE
export const reqDeleteCartById = (skuId) => {
  return requests({ url: `/cart/deleteCart/${skuId}`, method: 'delete' })
}

//修改商品的选中状态 /api/cart/checkCart/{skuId}/{isChecked} GET
export const reqUpdateCheckedById = (skuId, isChecked) => {
  return requests({ url: `/cart/checkCart/${skuId}/${isChecked}`, method: 'get' })
}

//获取验证码接口 /api/user/passport/sendCode/{phone}  GET
export const reqGetCode = (phone) => {
  return requests({ url: `/user/passport/sendCode/${phone}`, method: 'get' })
}

//完成注册接口 /api/user/passport/register  phone password code  参数类型String   POST 
export const reqRegister = (data) => {
  return requests({ url: `/user/passport/register`, data,method: 'post' })
}