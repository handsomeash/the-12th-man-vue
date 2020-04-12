<template>
  <div>
    <div style="height: 600px;">
      <el-table
          :data="articles"
          style="width: 100%">
          <el-table-column
            prop="title"
            label="标题"
            width="300">
          </el-table-column>
          <el-table-column
            prop="articleType"
            label="分类"
            width="180">
          </el-table-column>
          <el-table-column
            prop="username"
            label="作者名称"
            width="180">
          </el-table-column>
          <el-table-column
            prop="createDate"
            label="发表时间">
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
    name: 'ArticleAdmin',
    data(){
      return{
        articles: [],
        total:0,
        currentPage: 1,
        pagesize: 10
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
    }
  }
</script>

<style scoped>
</style>
