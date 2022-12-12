<template>
  <div>
    <!-- 三级联动组件 已经注册为全局组件 所以不需要引入 -->
    <TypeNav></TypeNav>
    <ListContainer></ListContainer>
    <TodayRecommend></TodayRecommend>
    <Rank></Rank>
    <Like></Like>
    <Floor v-for="(floor, index) in floorList" :key="floor.id" :floorData="floor"></Floor>
    <Brand></Brand>
  </div>
</template>
<script>
//引入其余组件
import ListContainer from '@/pages/Home/ListContainer'
import TodayRecommend from '@/pages/Home/TodayRecommend'
import Rank from '@/pages/Home/Rank'
import Like from '@/pages/Home/Like'
import Floor from '@/pages/Home/Floor'
import Brand from '@/pages/Home/Brand'
import { mapState } from 'vuex'
export default {
  name: 'Home',
  components: {
    ListContainer,
    TodayRecommend,
    Rank,
    Like,
    Floor,
    Brand
  },
  methods: {

  },
  mounted() {
    //通知Vuex把获取的floor数据存放到仓库当中
    this.$store.dispatch('getFloorList')
  },

  computed: {
    ...mapState({
      //右侧需要的是一个函数，当使用这个计算属性的时候右侧函数会立即执行一次
      // 注入一个参数state(大仓库中的数据) 
      floorList: (state) => {
        return state.home.floorList
      }
    })
  },
}
</script>
<style scoped>
h1 {
  font-size: 30px;
}

button {
  font-size: 20px;
  margin-left: 10px;
}
</style>
