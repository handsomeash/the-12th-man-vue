<template>
  <!--整个背景是白色的-->
  <div style="background-color: #FFFFFF; ">
    <!--回到顶部组件-->
    <el-backtop :bottom="70" style="background-color: #2B2D33;color: #FFFFFF;"></el-backtop>
    <div class="float">
      <p>
        <el-button type="primary" icon="el-icon-star-on" @click="collect" circle ></el-button>
      </p>
      <p>
        <el-button type="primary" icon="el-icon-chat-dot-round"  circle></el-button>
      </p>
      <p>
        <el-button type="primary" icon="el-icon-share"  circle></el-button>
      </p>

    </div>

    <el-row>
      <el-col :span="19" :offset="4">
        <!--文章主体-->
          <!--文章标题和封面-->
          <el-row>
            <el-col :span="10">
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
                      <div class="author" v-if="article.author">
                        <div class="font_left">
                          <el-avatar :size="60" :src="article.author.portraitUrl" ></el-avatar>
                        </div>
                        <div style="padding-left: 80px; ">
                          <p>{{article.author.nickname}}</p>
                          <p>{{article.createDate}}</p>
                        </div>
                      </div>
                    </el-col>
                  </el-row>

                </div>
              </div>
            </el-col>

            <el-col :span="14"><div ><img :src="article.imgUrl"  class="cover grid-content"></div></el-col>
          </el-row>

      </el-col>
    </el-row>

    <el-row>
      <el-col :span="15" :offset="5">
        <div v-html="article.content" class="article">
        </div>
      </el-col>
    </el-row>

    <!--评论区组件-->
    <el-row>
      <el-col :span="13" :offset="6">

        <div>
          <el-row>
            <el-col :span="24"><div class="topx font_left"><p>评论区</p></div></el-col>
          </el-row>

          <el-row>
            <el-col :span="21"><div><el-input v-model="input"  placeholder="请输入内容" class="comment"></el-input></div></el-col>
            <el-col :span="2" :offset="1"><div><el-button :disabled="!input" round type="primary" @click="write">发表</el-button></div></el-col>
          </el-row>

          <el-row class="totalComment">
            <el-col :span="24"><div class="topx font_left "><p>共xx条评论</p></div></el-col>
          </el-row>

          <el-row>
            <!--for循环评论内容-->
            <el-col :span="24" style="text-align: left;">
              <div v-for="(item,i) in commentResp">

                <el-row class="comment_top" v-if="item.user">
                  <el-col :span="2"><div><el-avatar :size="45" :src="item.user.portraitUrl" ></el-avatar></div></el-col>
                  <el-col :span="22">
                    <div class="user">
                      {{item.user.nickname}}
                    </div>
                    <div class="time">{{item.createDate}}</div>
                  </el-col>
                </el-row>

                <el-row class="">
                  <el-col :span="24">
                    <div class="comment_text">
                      {{item.content}}
                    </div>
                  </el-col>

                </el-row>


              </div>
            </el-col>
          </el-row>
        </div>

      </el-col>
    </el-row>
  </div>
</template>

<script>
  export default {
    inject:["reload"],
    name: 'ArticleDetail',
    data () {
      return {
        article: [],
        commentResp: [],
        input: '',
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
          this.article = resp.data

          //将获取到的文章id传给评论组件
          this.getComment(resp.data.id)

        }).catch(failResponse => {})

      },
      //收藏文章
      collect(){
        var user = JSON.parse(window.sessionStorage.getItem('user'))
        if(user == null){
          this.$alert("请先登录", '提示', {
            confirmButtonText: '确定'
          })
        }else{
          var userId = JSON.parse(window.sessionStorage.getItem('user')).id
           this.$axios.put('/article/collect',{
            userId: userId,
            articleId : this.article.id,
          }).then(resp =>{
            if (resp.data.code === 200){
               this.$message({
                message: resp.data.message,
                type: 'success'
              })
            }else{
              this.$message({
                message: resp.data.message,
                type: 'warning'
              })
            }
          }).catch(failResponse => {})
        }
      },
      //用户发表评论
      write(){
        if(window.sessionStorage.getItem('user') == null){
          this.$alert("请先登录", '提示', {
            confirmButtonText: '确定'
          })
        }else{
          var date = new Date()
          this.$axios.post('/comment', {
            //获取父组件的data中的值
            articleId: this.article.id,
            content: this.input,
            createDate: date,
            userId: JSON.parse(window.sessionStorage.getItem('user')).id

          }).then(resp =>{
            if (resp.data.code === 200){
              this.$alert(resp.data.message, '提示', {
                confirmButtonText: '确定',
                //回调函数
                callback: action => {
                   onclick:{
                     //刷新，让头像及时显示
                     this.reload()
                   }
                }
              })
            }

          }).catch(failResponse => {})
        }

      },
      //获取所有该文章下的评论
      getComment(articleId){
        this.$axios.get('/comment/'+articleId).then(resp => {
          //赋值
          this.commentResp = resp.data

        }).catch(failResponse => {})
      }
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
  .float{
    position:fixed;
    left: 60px;
    top: 550px;
    z-index: 1;

  }
  .topx{
    font-size: 16px;
    font-weight: 900;
  }
  .totalComment{
    border-bottom: 1px solid #DCDFE6;
    margin-top: 5px;
  }
  .comment_top{
    margin-top: 25px;
  }
  .comment_text{
    margin-left: 70px;
  }
  .user{
    font-size: 16px;
    font-weight: 900;
  }
  .time{
    font-size: 13px;
    /* font-weight: 900; */
  }
</style>
