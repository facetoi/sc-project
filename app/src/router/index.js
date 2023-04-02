import Vue from "vue";
import VueRouter from "vue-router";
Vue.use(VueRouter);
// import Home from "../pages/home/Home"
// import Login from "../pages/Login/index"
import Register from "../pages/Register/index"
import Search from "../pages/search/Search"
import Detail from "../pages/detail/index"
import AddCartSuccess from "../pages/AddCartSuccess"
import ShopCart from "../pages/ShopCart/index"
import Trade from "../pages/Trade/index"
import Pay from "../pages/Pay/index "
import PaySuccess from "@/pages/PaySuccess"
import Center from "@/pages/Center"
import MyOrder from "../pages/Center/MyOrder/MyOrder"
import GroupOrder from "../pages/Center/GroupOrder/GroupOrder"
import store from "@/store";
//需要重写VueRouter.prototype原型对象身上的push|replace方法
//先把VueRouter.prototype身上的push|replace方法进行保存一份
let originPush = VueRouter.prototype.push;
let originReplace = VueRouter.prototype.replace;
//重写VueRouter.prototype身上的push方法了
VueRouter.prototype.push = function (location, resolve, reject) {
  //第一个形参：路由跳转的配置对象（query|params）
  //第二个参数：undefined|箭头函数（成功的回调）
  //第三个参数:undefined|箭头函数（失败的回调）
  if (resolve && reject) {
    //push方法传递第二个参数|第三个参数（箭头函数）
    //originPush：利用call修改上下文，变为(路由组件.$router)这个对象，第二参数：配置对象、第三、第四个参数：成功和失败回调函数
    originPush.call(this, location, resolve, reject);
  } else {
    //push方法没有产地第二个参数|第三个参数
    originPush.call(
      this,
      location,
      () => { },
      () => { }
    );
  }
};
//重写VueRouter.prototype身上的replace方法了
VueRouter.prototype.replace = function (location, resolve, reject) {
  if (resolve && reject) {
    originReplace.call(this, location, resolve, reject);
  } else {
    originReplace.call(
      this,
      location,
      () => { },
      () => { }
    );
  }
};

let router= new VueRouter({
  routes: [
    {
      path: "/home",
      component: ()=>import("@/pages/home"),
      meta: { show: true }
    },
    {
      path: "/login",
      component: ()=>import("@/pages/Login"),
      meta: { show: false }
    },
    {
      path: "/register",
      component: Register,
      meta: { show: false }
    },
    {
      name: "search",
      path: "/search/:keyword?",
      component: Search,
      meta: { show: true }
    },
    {
      path: '*',
      redirect: "/home",
      meta: { show: true }
    },
    {
      path: "/detail/:id",
      component: Detail,
      meta: { show: true }
    },
    {
      name:"addcartsuccess",
      path: "/addcartsuccess",
      component: AddCartSuccess,
      meta: { show: true }
    },
    {
      path: "/shopcart",
      component: ShopCart,
      meta: { show: true }
    },
    {
      path: "/trade",
      component: Trade,
      meta: { show: true },
      beforeEnter:(to,from,next)=>{
        if(from.path=="/shopcart"){
          next()
        }else{
          next(false)
        }
        
      }
      
    },
    {
      path: "/pay",
      component: Pay,
      meta: { show: true },
      beforeEnter:(to,from,next)=>{
        if(from.path=="/trade"){
          next()
        }else{
          next(false)
        }
      }
    },
    {
      path: "/paysuccess",
      component: PaySuccess,
      meta: { show: true },
      beforeEnter:(to,from,next)=>{
        if(from.path=="/pay"){
          next()
        }else{
          next(false)
        }
      }
    },
    {
      path: "/center",
      component: Center,
      meta: { show: true },
      children:[
        {
          path:"myorder",
          component: MyOrder,
        },
        {
          path:"grouporder",
          component: GroupOrder

        },
        {
          path:"/center",
          redirect:"/center/myorder"
        }
      ]
    },

  ],
  scrollBehavior(to, from, savedPosition) {
    // 始终滚动到顶部
    return { y: 0 }
  },
});

//全局守卫
router.beforeEach(async(to,from,next)=>{
//  next()
 let token = store.state.users.token
 let name = store.state.users.userInfo.name
 if(token){
  //用户已经登录了不能去login，还想去，停留在首页
  if(to.path=="/login"){
    next("/")
  }else{
    //登录了不是去login
    if(name){
      next();
    }else{
     try {
      await store.dispatch("userInfo");
       next()
     } catch (error) {
      //token过期了
      //清除token
      await store.dispatch("userLogout")
      next("/login")
     }
    }
  }
 }else{
  //未登录：不能去交易相关、不能去支付相关【pay|paysuccess】、不能去个人中心
  //未登录去上面这些路由-----登录
  let toPath = to.path;
  if(toPath.indexOf('/trade')!=-1 || toPath.indexOf('/pay')!=-1||toPath.indexOf('/center')!=-1){
    //把未登录的时候向去而没有去成的信息，存储于地址栏中【路由】
    next('/login?redirect='+toPath);
  }else{
     //去的不是上面这些路由（home|search|shopCart）---放行
     next();
  }

}
})
export default router