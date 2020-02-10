<template>
  <!--整个背景是白色的-->
  <div style="background-color: #FFFFFF; padding-top: 50px;">
    <el-row>
      <el-col :span="17" :offset="4">
        <!--文章主体-->
          <!--文章标题和封面-->
          <el-row>
            <el-col :span="12">
              <div class="top_left_father">
                <div class="top_left_son">

                  <el-row>
                    <el-col :span="24">
                      <div class="title">
                        {{article.title}}
                      </div>
                    </el-col>
                  </el-row>

                  <el-row>
                    <el-col :span="24">
                      <div class="author">
                        <div class="font_left">
                          <el-avatar :size="60" :src="author.portraitUrl" ></el-avatar>
                        </div>
                        <div style="padding-left: 80px; ">
                          <p>{{author.nickname}}</p>
                          <p>{{article.createDate}}</p>
                        </div>
                      </div>
                    </el-col>
                  </el-row>



                </div>
              </div>
            </el-col>

            <el-col :span="12"><div ><img :src="article.imgUrl"  class="cover grid-content"></div></el-col>
          </el-row>

        <!-- <div v-html="article.content" class="article">
        </div> -->

      </el-col>
    </el-row>

    <el-row>
      <el-col :span="15" :offset="5">
        <div v-html="article.content" class="article">
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
  export default {
    name: 'ArticleDetail',
    data () {
      return {
        article: [],
        author: [],
        imgUrl: '../../../static/img/UK.jpg'
      }
    },
    //钩子函数
    mounted() {
      this.getArticle()
    },
    methods:{
      getArticle(){
        //获取router传递过来的参数
        var id = this.$route.params.id
        this.$axios.get('/article/'+id).then(resp => {
          console.log(resp.data)
          //赋值
          this.article = resp.data.article
          this.author = resp.data.author
        }).catch(failResponse => {})
      },
    }
  }
</script>

<style scoped>
  .cover{
    width: 100%;
  }
  .grid-content {
    border-radius: 5px;
  }
  .top_left_father{
    /* background-color: #006600; */
    /* width: 100%; */
    height: 340px;
    display: table-cell;
    /* text-align: center; */
    vertical-align: bottom;
  }
  .top_left_son{

    text-align: left;
    color: #333333;
    padding-right: 100px;
  }
  .title{
    font-size: 30px;
    font-weight: 900;
  }
  .author{
    /* background-color: #006666; */
    width: 500px;
    padding-top: 20px;
    font-size: 15px;
    font-weight: 400;
    line-height:6px;
  }
  .article{
    text-align: left;
    margin-top: 80px;
  }
</style>
