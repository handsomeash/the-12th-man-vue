<template>
  <div>
    <div style="height: 600px;">
      <el-table
          :data="articles"
          style="width: 100%">
          <el-table-column
            prop="title"
            label="标题"
            width="400">
          </el-table-column>
          <el-table-column
            prop="articleType"
            label="分类"
            width="180">
          </el-table-column>
          <el-table-column
            prop="author.nickname"
            label="作者名称"
            width="180">
          </el-table-column>
          <el-table-column
            prop="createDate"
            label="发表时间"
            width="180">
          </el-table-column>
          <el-table-column
            label="操作">
            <!-- <template slot-scope="scope">
              <el-button type="text" size="small" @click="deleteArticle(scope.row)">删除</el-button>
            </template> -->
            <template slot-scope="scope">
              <el-button type="text" size="small" @click="toArticle(scope.row)">查看</el-button>
            </template>
          </el-table-column>

      </el-table>
    </div>


    <el-row>
        <el-pagination
          background
          layout="prev, pager, next"
          @current-change="handleCurrentChange"
          :current-page="currentPage"
          :page-size="pagesize"
          :total="total"
          >
        </el-pagination>

    </el-row>
  </div>

</template>

<script>
  export default {
    inject:["reload"],
    name: 'ArticleAdmin',
    data(){
      return{
        articles: [],
        total:0,
        currentPage: 1,
        pagesize: 9
      }
    },
    mounted() {
      this.getArticles()
    },
    methods:{
      getArticles(){
        this.$axios.post('/articleadmin',{
            current: this.currentPage,
            pagesize: this.pagesize,
        }).then(resp =>{
          this.articles = resp.data.articles
          this.total = resp.data.total
        }).catch(failResponse => {})
      },
      handleCurrentChange(val) {
        this.currentPage = val
        this.getArticles()
      },
      toArticle(article){
        var id = article.id
        this.$router.push({ name: 'ArticleDetail', params: {id: id}})
      },
      deleteArticle(article){
        console.log("xxx")
        this.$axios.get('/deleteArticle/'+article.id).then(resp => {
          this.$alert(resp.data.message, '提示', {
            confirmButtonText: '确定',
            //回调函数
            callback: action => {
               onclick:{
                 this.reload()
               }
            }
          })

        }).catch(failResponse => {})
      }
    }
  }
</script>

<style scoped>
</style>
