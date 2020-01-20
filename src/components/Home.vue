<template>
  <!--子页面（组件）显示的地方-->
  <div>
    <nav-menu></nav-menu>
    <!--页面中部主体-->
    <div class="home_main">
      <router-view/>
    </div>
    <!--页面尾部-->
    <div>
      <foot></foot>
    </div>
  </div>
</template>

<script>
   import NavMenu from './common/NavMenu'
   import Foot from './common/Foot'
  export default {
    name: 'Home',
    components: {NavMenu,Foot},
    }
</script>

<style scoped>
  .home_main{
    background-color: #F7F7F8;
  }
</style>
