<template>
  <div>
    <div style="height: 600px;">
      <el-table
          :data="users"
          style="width: 100%">
          <el-table-column
            prop="username"
            label="账号"
            width="180">
          </el-table-column>
          <el-table-column
            prop="nickname"
            label="昵称"
            width="180">
          </el-table-column>
          <el-table-column
            prop="password"
            label="密码">
          </el-table-column>
          <el-table-column
            prop="email"
            label="邮箱"
            width="180">
          </el-table-column>
          <el-table-column
            prop="phone"
            label="电话"
            width="180">
          </el-table-column>
          <el-table-column
            prop="registerDate"
            label="注册日期"
            width="180">
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
  export default {
    name: 'UserAdmin',
    data(){
      return{
        users: [],
        total:0,
        currentPage: 1,
        pagesize: 10
      }
    },
    mounted() {
      this.getUsers()
    },
    methods:{
      getUsers(){
        this.$axios.post('/useradmin',{
            current: this.currentPage,
            pagesize: this.pagesize,
        }).then(resp =>{
          this.users = resp.data.users
          this.total = resp.data.total
        }).catch(failResponse => {})
      },
      handleCurrentChange(val) {
        this.currentPage = val
        this.getUsers()
      },
    }
  }
</script>

<style scoped>
</style>
