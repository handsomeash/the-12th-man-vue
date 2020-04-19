<template>
  <div>
    <div style="height: 600px;">
      <el-table
          :data="comments"
          style="width: 100%">
          <el-table-column
            prop="articleName"
            label="文章标题"
            width="300">
          </el-table-column>
          <el-table-column
            prop="content"
            label="评论内容"
            width="400">
          </el-table-column>
          <el-table-column
            prop="user.nickname"
            label="用户名称"
            width="180">
          </el-table-column>
          <el-table-column
            prop="createDate"
            label="评论时间"
            width="180">
          </el-table-column>
          <el-table-column
            label="操作">
            <template slot-scope="scope">
              <el-button type="text" size="small" @click="deleteComment(scope.row)">删除</el-button>
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
        :total="total">
      </el-pagination>
    </el-row>
  </div>

</template>

<script>
  export default{
    inject:["reload"],
    name: 'CommentAdmin',
    data(){
      return{
        comments: [],
        total:0,
        currentPage: 1,
        pagesize: 9
      }
    },
    mounted() {
      this.getComments()
    },
    methods:{
      getComments(){
        this.$axios.post('/commentadmin',{
            current: this.currentPage,
            pagesize: this.pagesize,
        }).then(resp =>{
          this.comments = resp.data.comments
          this.total = resp.data.total
        }).catch(failResponse => {})
      },
      handleCurrentChange(val) {
        this.currentPage = val
        this.getComments()
      },
      deleteComment(comment){
        this.$axios.get('/deleteComment/'+comment.id).then(resp => {
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
