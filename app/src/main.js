import Vue from 'vue'
import App from './App.vue'
import router from "./router/index"
import store  from './store'
import typeNav from "./components/typeNav/typeNav"
//第一个参数：全局组件的名字 第二个参数：哪一个组件
Vue.component(typeNav.name,typeNav)
Vue.config.productionTip = false
import "./mock/mockServer"
import "swiper/css/swiper.css"
//全局组件pagination
import Pagination from "./components/Pagination/Pagination"
Vue.component(Pagination.name,Pagination)
//统一接口api文件夹里全部请求函数
import * as API from "@/api"
//element-ui
import { Button,MessageBox,Form,FormItem ,Input} from 'element-ui';
// Vue.component(Button.name, Button);
Vue.use(Form);
Vue.use(FormItem);
Vue.use(Input);
Vue.prototype.$msgbox = MessageBox;
Vue.prototype.$alert = MessageBox.alert;

new Vue({
  render: h => h(App),
  router,
  store,
  beforeCreate(){
    Vue.prototype.$bus=this
    Vue.prototype.$API=API
  }
}).$mount('#app')
