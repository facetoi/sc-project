import Vue from "vue";
import Vuex from "vuex"
Vue.use(Vuex)
import home from "./home/index"
import search from "./search";
import detail from "./detail";
import shopcart from "./shopcart";
import users from "./users/user"
import trade from "@/store/trade/index"
export default new Vuex.Store({
    modules:{
        home,
        search,
        detail,
        shopcart,
        users,
        trade
    }
})
