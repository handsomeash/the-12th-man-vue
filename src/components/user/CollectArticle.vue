<template>
  <div style="height: 300px;">
    <div v-if="show">
      <el-row >
          <el-card :body-style="{ padding: '0px' }"
            v-for="item in articles"
            :key="item.id"
            class="box-card">
            <div >
              <img :src="item.imgUrl" alt="封面" class="cover">
            </div>

            <div class="title" >
              <a href="" @click="toArticle(item.articleDetailId)">{{item.title}}</a>
            </div>

            <div>
              <el-row>
                <el-col :span="12"><div class="author">查看文章</div></el-col>
                <el-col :span="12"><div class="author" style="text-align: right; cursor:pointer" @click="cancelCollect(item.id)">取消收藏</div></el-col>
              </el-row>
            </div>

          </el-card>
      </el-row>

      <!--分页-->
      <el-row>
        <el-pagination
          layout="prev, pager, next"
          @current-change="handleCurrentChange"
          :current-page="currentPage"
          :page-size="pagesize"
          :total="total">
        </el-pagination>
      </el-row>
    </div>

    <!--如果没有收藏的文章-->
    <div v-else style="font-size: 14px; ">
      还没有内容
    </div>
  </div>
</template>

<script>
  export default{
    inject:["reload"],
    name: 'CollectArticle',
     data(){
        return{
          total:0,
          articles: [],
          currentPage: 1,
          pagesize: 3,
          show: false
        }
     },
     //钩子函数
     mounted() {
       this.getArticles()
     },
     methods:{
       //获取文章信息
       getArticles(){
         var userId = JSON.parse(window.sessionStorage.getItem('user')).id
         this.$axios.post('/article/collection',{
             current: this.currentPage,
             pagesize: this.pagesize,
             userId: userId
         }).then(resp =>{
           if(resp.data != ''){
             this.articles = resp.data.records
             this.total = resp.data.total
             this.show = true
           }

         }).catch(failResponse => {})
       },
       handleCurrentChange(val) {
         this.currentPage = val
         this.getArticles()
       },
       //前往文章页面
       toArticle(id){
         console.log('前往文章页面')
         this.$router.push({ name: 'ArticleDetail', params: {id: id}})
       },
       //取消收藏
       cancelCollect(id){
         var userId = JSON.parse(window.sessionStorage.getItem('user')).id
          this.$axios.post('/article/cancelCollect',{
           userId: userId,
           articleId : id,
         }).then(resp =>{
           if (resp.data.code === 200){
              this.$message({
               message: resp.data.message,
               type: 'success'
             })
             //刷新
             this.reload()
           }else{
             this.$message({
               message: resp.data.message,
               type: 'warning'
             })
           }
         }).catch(failResponse => {})
       }
     }
  }
</script>

<style scoped>
  .box-card{
    width: 200px;
    /*下部距离*/
    margin-bottom: 30px;
    height: 220px;
    float: left;
    margin-right: 30px;
    margin-left: 15px;
  }

  .cover {
    width: 200px;
    height: 113px;
    display: block;

  }

  .title {
    height: 35px;
    font-size: 14px;
    font-weight: 800;
    text-align: left;
    padding: 20px;
  }


  .author {
    color: #A3A3A5;
    font-family: "微软雅黑";
    font-size: 12px;
    text-align: left;
    padding-left: 20px;
    padding-right: 20px;
  }

  a {
    color: #303133;
    text-decoration: none;
  }
</style>
