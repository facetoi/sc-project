<template>
  <div>
    <!--三级联动（注册的是全局组件不用引入） -->
    <typeNav></typeNav>
    <!--列表-->
    <listContainer></listContainer>
     <!--今日推荐-->
    <todayRecommend></todayRecommend>
    <Rank></Rank>
    <!-- 猜你喜欢 -->
    <Like></Like>
    <!-- 电器（floor）-->
    <Floor v-for="floor in floorList" :key="floor.id" :list="floor"></Floor>
    <!--商标-->
    <Brand></Brand>

  </div>
</template>

<script>
import listContainer from './listContainer/listContainer.vue'
import todayRecommend from './todayRecommend/todayRecommend.vue'
import Rank from "./rank/Rank.vue"
import Like from "./Like/Like.vue"
import Floor from "../home/floor/Floor"
import Brand from "./brand/Brand"
import {mapState} from "vuex"
export default {
  name:"Home",
  components: { 
    listContainer,
    todayRecommend,
    Rank,
    Like,
    Floor,
    Brand
    },
    mounted() {
      //派发actions，获取floor数据
      this.$store.dispatch('getFloorList');
      //获取用户数据
      this.$store.dispatch("userInfo")
    },
    computed:{
      ...mapState({
        floorList:state=>state.home.floorList
        
      })
    }

}
</script>

<style>

</style>