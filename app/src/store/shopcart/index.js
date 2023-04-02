import { reqCartList,reqDeleteCartById,reqUpdateCheckedById } from "@/api";
const state = {
    cartList:[]
};
const actions = {
    //获取购物车列表数据
    async getCartList(context){
        let result = await reqCartList();
        if(result.code==200){
        context.commit("GETCARTLIST",result.data)
        }
        
    },
    //删除购物车某一个产品
   async deleteCartListBySkuId(context,skuId){
        let result = await reqDeleteCartById(skuId)
        if(result.code==200){
            return "ok"
        }else{
            return Promise.reject(new Error('faile'))
        }
    },
    //修改购物车某一个产品的选中状态
    async updataCheckedById(context,{skuId,isChecked}){
        let result = await reqUpdateCheckedById(skuId,isChecked);
        if(result.code==200){
            return "ok"
        }else{
           return Promise.reject(new Error("faile"))
        }

    },
    //删除所有选中的产品
    deleteALLCheckedCart(context){
        let promiseAll=[]
        context.getters.cartList.cartInfoList.forEach(element => {
       let promise= element.isChecked==1?context.dispatch("deleteCartListBySkuId",element.skuId):""
       promiseAll.push(promise)
        });
        return Promise.all(promiseAll)
    },
    //修改全部产品的选中状态
    updataAllCartIsChecked({dispatch,state},isChecked){
        let promiseAll=[]
        state.cartList[0].cartInfoList.forEach(item=>{
            let promise = dispatch("updataCheckedById",{skuId:item.skuId,isChecked})
            promiseAll.push(promise)
        });
        return Promise.all(promiseAll)

    }
};
const mutations = {
    GETCARTLIST(state,value){
        state.cartList=value
    }
};
const getters = {
    cartList(){
        return state.cartList[0]||[]
    }
};
export default{
    state,
    actions,
    mutations,
    getters
} 