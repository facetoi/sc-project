<template>
 <div>
  <Header></Header>
  <router-view></router-view>
  <Footer v-show="$route.meta.show"></Footer>
 </div>
</template>

<script>
import Header from './components/Header/Header.vue'
import Footer from "./components/Footer/Footer"
export default {
  name: 'App',
  components: {
   Header,
   Footer
  },
  mounted() {
    //组件挂载完毕：可以向服务器发送请求
    //通知vuex发送请求，获取数据，存储于仓库当中
    this.$store.dispatch("categoryList");
  },
}
</script>

<style>
</style>
