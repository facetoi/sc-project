import {reqUserAddressInfo,reqOrderInfo} from "@/api";
const state = {
    userAddressInfo:[],
    orderInfo:{}
};
const actions={
    //获取用户地址信息
   async getUserAddressInfo(context){
        let result =await reqUserAddressInfo()
        if(result.code==200){
            context.commit("GETUSERADDRESSINFO",result.data)
        }
    },
    //获取商品清单数据
   async getOrderInfo(context){
        let result =await reqOrderInfo()
        if(result.code==200){
            context.commit("GETORDERINFO",result.data)
        }
    }
};
const mutations = {
    GETUSERADDRESSINFO(state,value){
        state.userAddressInfo=value
    },
    GETORDERINFO(state,value){
         state.orderInfo=value
    }
};
const getters = {}
export default{
    state,
    actions,
    mutations,
    getters
}