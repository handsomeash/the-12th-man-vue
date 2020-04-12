<template>
    <!--子页面（组件）显示的地方-->
  <el-container>
    <el-aside class="aside"><admin-nav></admin-nav></el-aside>
    <el-main class="main">
      <!--页面中部主体-->
      <div >
        <router-view/>
      </div>
    </el-main>
  </el-container>




</template>

<script>
  import AdminNav from './AdminNav'
  export default {
    name: 'AdminHome',
    components: {AdminNav},
  }
</script>

<style scoped>
  .aside{

  }
  .main{
    margin-top: 50px;
    height: 720px;
  }
</style>
