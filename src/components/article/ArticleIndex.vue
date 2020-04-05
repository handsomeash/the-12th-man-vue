<template>
  <!-- Element 提供的 Container 布局容器-->
  <el-container>
    <el-main >
      <el-row>

        <el-col :span="1" :offset="3"><h3 >文 章</h3></el-col>
        <el-col :span="20" :offset="3">
          <div>
            <el-row >
                <el-card :body-style="{ padding: '0px' }"
                  v-for="item in articles"
                  :key="item.id"
                  class="box-card">
                  <div >
                    <img :src="item.imgUrl" alt="封面" class="cover">
                  </div>

                  <div class="title" >
                    <!-- <a href="">{{item.title}}</a> -->
                    <a href="" @click="toArticle(item.articleDetailId)">{{item.title}}</a>
                    <!-- <a :href="toArticle(item.id)" >{{item.title}}</a> -->
                  </div>

                  <div style="padding-top: 20px;">
                    <el-row v-if="item.author">
                      <el-col :span="24"><div class="author">{{item.author.nickname}}</div></el-col>
                    </el-row>
                    <el-row>
                      <el-col :span="12"><div class="author">{{item.createDate}}</div></el-col>
                      <el-col :span="12">
                        <div class="icon">
                          <i class="el-icon-star-on">&#8194{{item.collectionNum}}</i>&#8195
                          <i class="el-icon-chat-line-round">&#8194{{item.commentNum}}</i>
                        </div>
                      </el-col>
                    </el-row>
                  </div>

                </el-card>
            </el-row>

            <!--分页-->
            <el-row>
              <el-pagination
                background
                layout="prev, pager, next"
                @current-change="handleCurrentChange"
                :current-page="currentPage"
                :page-size="pagesize"
                :total="total">
              </el-pagination>
            </el-row>
          </div>
        </el-col>
      </el-row>

    </el-main>
  </el-container>
</template>

<script>
  // import SingleArticle from './SingleArticle'
   export default {
    name: 'ArticleIndex',
    // components:{SingleArticle},
    data() {
      return {
       type: '',
       total:0,
       articles: [],
       currentPage: 1,
       pagesize: 12
      }
    },
    watch:{
      "$route": "getArticles"
    },
    //钩子函数
    mounted() {
      this.getArticles()
    },

    methods:{
      //获取文章信息
      getArticles(){
        this.type = this.$route.params.type
        this.$axios.post('/article',{
            current: this.currentPage,
            pagesize: this.pagesize,
            type: this.type
        }).then(resp =>{
          this.articles = resp.data.articles
          this.total = resp.data.total
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
      }
    }
  }
</script>

<style scoped>
  .box-card{
    width: 270px;
    /*下部距离*/
    margin-bottom: 30px;
    height: 310px;
    float: left;
    margin-right: 30px
  }

  .cover {
    /* width: 100%; */
    width: 270px;
    height: 165px;
    display: block;

  }

  .title {
    height: 35px;
    font-size: 16px;
    font-weight: 800;
    text-align: left;
    padding: 20px;
  }

  .card-foot{
    padding: 20px;
  }

  .author {
    color: #A3A3A5;
    font-family: "微软雅黑";
    font-size: 12px;
    text-align: left;
    padding-left: 20px;
  }
  .icon{
    font-size: 14px;
    color: #A3A3A5;
  }

  a {
    color: #303133;
    text-decoration: none;
  }



</style>
