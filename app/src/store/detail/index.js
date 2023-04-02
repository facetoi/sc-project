import { reqDetailInfo,reqAddOrUpdataShopCart } from "@/api";
//封装游客身份模块（uuid）-->生成一个随机字符串
import {getUUID} from "@/utils/uuid_token"
const state={
    goodInfo:{},
    //游客的临时身份
    uuid_token:getUUID()
};
const actions={
    //获取信息
   async getGoodInfo(context,id){
        let result=await reqDetailInfo(id)
        if(result.code==200){
            context.commit("GETGOODINFO",result.data)
        }
    },
   async addAddOrUpdataShopCart(context,{skuId,skuNum}){
    let result = await reqAddOrUpdataShopCart(skuId,skuNum)
    if(result.code==200){
        return "ok"
    }else{
        return Promise.reject(new Error("faile"))
    }
   }
};
const mutations={
    GETGOODINFO(state,value){
        state.goodInfo=value
    }
};
const getters={
    categoryView(state){
        //state.goodInfo初始值为空 ，空对象的categoryView为undefined
        return state.goodInfo.categoryView||{}
    },
    skuInfo(state){
        return state.goodInfo.skuInfo||{}
    },
    spuSaleAttrList(state){
        return state.goodInfo.spuSaleAttrList||[]
    }
   
}
export default {
    state,
    mutations,
    actions,
    getters
}