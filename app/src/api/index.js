//当前模块：api进行统一管理
import instance from "./ajax";
import mockRequest from "./mockAjax"
//三级联动接口
// /api/product/getBaseCategoryList get 无参数
export const reqCategoryList = ()=>{
    return instance({url:"/product/getBaseCategoryList",method:"get"})

}
//轮播图接口
export const  reqBannerList = ()=>{
    return mockRequest({url:"/banner",method:"get"})

}
//floor接口
export const reqFloorList = ()=>{
    return mockRequest({url:"/floor",method:"get"})

}
//search接口
// /api/list 带参数 post
//当前这个接口，给服务器传递一个默认参数至少是一个空对象
export const reqSearchInfo = (params)=>{
    return instance({url:"/list",method:"post",data:params})
}
//详情页接口 /api/item/{ skuId }  get

export const reqDetailInfo =(skuId)=>{
    return instance({url:`/item/${ skuId }`,method:"get"})
}
//将产品添加到购物车中（获取更新某一个产品的个数）
///api/cart/addToCart/{ skuId }/{ skuNum }  post
export const reqAddOrUpdataShopCart = (skuId,skuNum)=>{
    return instance({url:`/cart/addToCart/${skuId}/${skuNum}`,method:"post"})
}
//获取购物车数据接口 /api/cart/cartList
export const reqCartList = ()=>{
    return instance({url:"/cart/cartList",method:"get"})
}
//删除购物车数据接口 /api/cart/deleteCart/{skuId} delete
export const reqDeleteCartById = (skuId)=>{
    return instance({url:`/cart/deleteCart/${skuId}`,method:"delete"})
}
//修改商品的选中状态 /api/cart/checkCart/{skuId}/{isChecked} method:get /api/cart/checkCart/{skuID}/{isChecked}
export const  reqUpdateCheckedById = (skuId,isChecked)=>{
    return instance({url:`/cart/checkCart/${skuId}/${isChecked}`,method:"get"})
}
//获取验证码 /api/user/passport/sendCode/{phone}  get
export const reqGetCode = (phone)=>{
    return instance({url:`/user/passport/sendCode/${phone}`,method:"get"})
}
//注册 /api/user/passport/register post {phone,code,password}
export const reqUserRegister= (data)=>{
    return instance({url:"/user/passport/register",data,method:"post"})

}
//登录 /api/user/passport/login post  {phone,password}
export const reqUserLogin = (data)=>{
    return instance({url:"/user/passport/login",data,method:"post"})
}
//获取用户数据 /api/user/passport/auth/getUserInfo  get
export const reqUserInfo = ()=>{
    return instance({url:"/user/passport/auth/getUserInfo",method:"get"})
}
//退出登录  /api/user/passport/logout get
export const reqUserLogout = ()=>{
    return instance({url:"/user/passport/logout",method:"get"})
}
//获取用户地址信息 /api/user/userAddress/auth/findUserAddressList  get
export const reqUserAddressInfo = ()=>{
    return instance({url:"/user/userAddress/auth/findUserAddressList",method:"get"})
}
//获取商品清单 /api/order/auth/trade  get
export const reqOrderInfo = ()=>{
    return instance({url:"/order/auth/trade",method:"get"})
}
//提交订单 /api/order/auth/submitOrder?tradeNo={tradeNo}  post
export const reqSubmitOrder = (tradeNo,data)=>{
    return instance({url:`/order/auth/submitOrder?tradeNo=${tradeNo}`,data,method:"post"})
}
//获取支付信息 /api/payment/weixin/createNative/{orderId}  get
export const reqPayInfo=(orderId)=>{
    return instance({url:`/payment/weixin/createNative/${orderId}`,method:'get'})
}
//查询支付订单状态  /api/payment/weixin/queryPayStatus/{orderId}  get
export const reqPayStatus=(orderId)=>{
    return instance({url:`/payment/weixin/queryPayStatus/${orderId}`,method:"get"})
}
//我的订单  /api/order/auth/{page}/{limit}  get
export const reqMyOrderInfo=((page,limit)=>{
    return instance({url:`/order/auth/${page}/${limit}`,method:"get"})
})
