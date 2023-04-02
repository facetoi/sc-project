import {reqBannerList, reqCategoryList, reqFloorList} from "@/api"

const state ={
    //home中三级菜单的数据
    categoryList:[],
    //轮播图的数据
    bannerList:[],
    //floor数据
    floorList:[]
};
const mutations={
    CATEGORYLIST(state,value){
        state.categoryList=value
    },
    GETBANNERLIST(state,value){
        state.bannerList=value
    },
    GETFLOORLIST(state,value){
        state.floorList=value
    }
};
const actions={
    // 通过api里面的接口函数调用，向服务器发请求，获取数据
   async categoryList(context){
        let result =await reqCategoryList()
        if(result.code==200){
            context.commit("CATEGORYLIST",result.data)
        }
    },
    //获取首页轮播图数据
   async getBannerList(context){
        let result=await reqBannerList()
    //    console.log(result);
        if(result.code==200){
            context.commit("GETBANNERLIST",result.data)
        }
    },
    //获取floor数据
   async getFloorList(context){
        let result =await reqFloorList()
        
        if(result.code==200){
            context.commit("GETFLOORLIST",result.data)
        }
    }
};
const getters={};
export default {
    state,
    mutations,
    actions,
    getters
}