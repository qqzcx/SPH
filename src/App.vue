<template>
  <div>
    <Header></Header>
    <!-- 路由组件出口的地方 -->
    <router-view></router-view>
    <Footer v-show="$route.meta.show"></Footer>
  </div>


</template>

<script>
import Header from '@/components/Header'
import Footer from '@/components/Footer'


export default {
  name: 'App',
  components: {
    Header,
    Footer
  },
  mounted(){
    //通知Vuex把获取的三级列表数据存放到仓库当中
    this.$store.dispatch('getCategoryList')
  }
}
</script>

<style>

</style>
