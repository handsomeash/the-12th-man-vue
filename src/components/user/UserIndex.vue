<template>
  <div class="main">
    <el-row :gutter="25">
    <el-col :span="14" :offset="3"><div class="grid-content bg-purple">xx</div></el-col>
    <!--个人信息-->
    <el-col :span="5">
      <div class="grid-content bg-purple ">

        <div class="padding-right">
           <el-avatar :size="70" :src="user.portraitUrl" ></el-avatar><br />
          <div class="name">{{user.nickname}}</div>
          <small>{{user.registerDate}}</small>
        </div>

        <div class="mid padding-right">
          <el-row>
            <el-col :span="12" class="num_title"><div>发表文章数</div></el-col>
            <el-col :span="12" class="num_title"><div>收藏文章数</div></el-col>
          </el-row>
          <el-row>
            <el-col :span="12" class="num">1</el-col>
            <el-col :span="12" class="num">34</el-col>
          </el-row>
        </div>

        <div class="padding-right">
          <el-button type="info" round  size="medium"> 编辑个人信息 </el-button>
        </div>
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
        user: []
        // user:{
        //   nickname:'xxxx',
        //   registerDate:'',
        //   //头像url
        //   portraitUrl: require('../../assets/img/touxiang.png'),
        // }
      }
    },
    //钩子函数
    mounted() {
      this.getUserInfo()
    },
    methods:{
      //获取个人信息
      getUserInfo(){
        //获取router传递过来的参数
        var id = this.$route.params.id
        this.$axios.get('/user/'+id).then(resp => {
            console.log(resp.data)
            //赋值
            this.user = resp.data.user
          }).catch(failResponse => {
             })
      },
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
  .mid{
    border-top:1px solid #F2F4F7;
    border-bottom:1px solid #F2F4F7
  }
  /*边框圆角*/
  .grid-content {
    border-radius: 8px;
  }
  .padding-right{
    padding-top: 20px;
    padding-bottom: 20px;
  }
  .name{
    font-family: "microsoft yahei";
    font-size: 20px;
    font-weight: 600;
    padding-top: 6px;
    padding-bottom: 6px;
  }
  .num{
    font-size: 20px;
    font-weight: 600;
  }
  .num_title{
    font-family: "microsoft yahei";
    font-size: 13px;
    padding-bottom: 6px;
  }
</style>
