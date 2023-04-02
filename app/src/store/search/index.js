import { reqSearchInfo } from "@/api";
const state ={
    searchList:{}
};
const mutations={
    GETSEARCHLIST(state,value){
       state.searchList= value
    }
};
const actions={
    //
    async getSearchList(context,params={}){
       let result = await reqSearchInfo(params)
       if(result.code==200){
        context.commit("GETSEARCHLIST",result.data)
       }

    }
};
const getters={
    goodsList(state){
        return state.searchList.goodsList || []
    },
    trademarkList(state){
        return state.searchList.trademarkList
    },
    attrsList(state){
        return state.searchList.attrsList
    }
};
export default {
    state,
    mutations,
    actions,
    getters
}