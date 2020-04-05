<template>
  <div class="main">
    <el-row >
    <el-col :span="13" :offset="3">
      <div class="grid-content bg-purple">
        <div class="left_title">
          投稿的文章
        </div>
        <div class="left_article">
          <WriteArticle></WriteArticle>
        </div>
        <div class="left_title">
          收藏的文章
        </div>
        <div class="left_article">
          <collectArticle ref="CollectArticle"></collectArticle>
        </div>


      </div>
    </el-col>
    <!--个人信息-->
    <el-col :span="5" :offset="1">
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
            <el-col :span="12" class="num">{{user.articleNum}}</el-col>
            <el-col :span="12" class="num">{{user.collectionNum}}</el-col>
          </el-row>
        </div>

        <div class="padding-right">
          <el-button type="primary" round  size="medium" @click="getEdit"> 编辑个人信息 </el-button>
        </div>
      </div>

    </el-col>
</el-row>
   </div>
</template>

<script>
  import CollectArticle from './CollectArticle'
  import WriteArticle from './WriteArticle'
  export default {
    name: 'UserIndex',
    components: {CollectArticle,WriteArticle},
    data(){
      return{
        user: [],
        // userDetail: [],
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
            this.user = resp.data
            // this.userDetail = resp.data.userDetail
          }).catch(failResponse => {})
      },
      //前往编辑页面
      getEdit(){
        //获取router传递过来的参数
        var id = this.$route.params.id
        //跳转到编辑页面，传id作为参数
        this.$router.push({ name: 'edit', params: {id: id}})
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
  .mid{
    border-top:1.5px solid #F2F4F7;
    border-bottom:1.5px solid #F2F4F7
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
  .left_title{
    text-align: left;
    color: #222;
    font-weight: 700;
    padding: 30px;
    padding-left: 60px;
  }
  .left_article{
    padding-left: 40px;
    padding-bottom: 20px;
  }
</style>
