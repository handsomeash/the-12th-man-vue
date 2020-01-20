<template>
  <div class="main">
    <el-row :gutter="25">
    <el-col :span="14" :offset="3"><div class="grid-content bg-purple">xx</div></el-col>
    <!--个人信息-->
    <el-col :span="5">
      <div class="grid-content bg-purple right">
        <el-container>
          <el-header><el-avatar :size="70" :src="user.circleUrl" ></el-avatar></el-header>
          <el-main><h3>{{user.nickname}}</h3></el-main>
          <el-footer>Footer</el-footer>
        </el-container>
      </div>
    </el-col>
</el-row>
   </div>
</template>

<script>
  export default {
    name: 'UserIndex',
    data(){
      return{
        user:{
          nickname:'xxxx',
          registerDate:'',
          //头像url
          circleUrl: require('../../assets/img/touxiang.png'),
        }
      }
    }
  }
</script>

<style scoped>
  .bg-purple {
    background: #FFFFFF;
  }
  .main{
    padding-top: 30px;
    padding-bottom: 30px;
  }
  /*边框圆角*/
  .grid-content {
    border-radius: 8px;
  }
  .right{
    padding-top: 30px;
  }
</style>
