import {reqGetCode,reqUserRegister,reqUserLogin,reqUserInfo,reqUserLogout} from "@/api"
import {setToken,getToken,clearToken} from "../../utils/token"
const state={
    code:"",
    token:getToken(),
    userInfo:{}
};
const actions={
    //获取验证码
   async getCode({commit},phone){
      let result= await reqGetCode(phone);
      if(result.code==200){
        commit("GETCODE",result.data)
        return "ok"
      }else{
        return Promise.reject(new Error("faile"))
      }
    },
    //用户注册
   async userRegister(context,data){
        let result = await reqUserRegister(data);
        if(result.code==200){
            return "ok"
        }else{
            return Promise.reject(new Error("faile"))
        }
    },
    //用户登录
   async userLogin(context,data){
        let result = await reqUserLogin(data);
        if(result.code==200){
            context.commit("USERLOGIN",result.data.token)
            setToken(result.data.token)

        }else{
            return Promise.reject(new Error("faile"))
        }  
    },
    //获取用户数据
   async userInfo(context){
        let result = await reqUserInfo()
       context.commit("USERINFO",result.data)
       if(result.code==200){
        return "ok"
       }else{
        return Promise.reject(new Error("faile"))
       }
    },
    //退出登录清除数据
   async userLogout(context){
        let result = await reqUserLogout()
        if(result.code==200){
            context.commit("USERLOGOUT")
            return "ok"
        }else{
            return Promise.rejecta(new Error("faile"))
        }
        
    }


};
const mutations={
    GETCODE(state,value){
        state.code=value
    },
    USERLOGIN(state,value){
        state.token=value
    },
    USERINFO(state,value){
        state.userInfo=value||{}
    },
    USERLOGOUT(state){
        state.token="";
        state.userInfo="";
        clearToken()
        
    }
};
const getters={};
export default {
    state,
    actions,
    mutations,
    getters
}