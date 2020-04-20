<template>
  <div>
      <el-menu
        mode="horizontal"
        @select="handleSelect"
        background-color="white"
        text-color="#222"
        style="min-width: 1300px"
        class="edit navFont"
        >
      <el-menu-item index="1">首页</el-menu-item>
      <el-menu-item index="2">篮球专题</el-menu-item>
      <el-menu-item index="3">足球专题</el-menu-item>
      <el-menu-item index="4">发表文章</el-menu-item>
      <el-menu-item index="5">个人空间</el-menu-item>

      <span style="position: absolute;padding-top: 11px;right: 44%;font-size: 20px;color: #F44336 ;font-weight: 900;"> - The 12th Man - </span>
      <el-input
        placeholder="搜索..."
        size="medium"
        style="width: 300px;position:absolute;margin-top: 9px;right: 10%"
        v-model="keywords">
        <el-button slot="append" icon="el-icon-search" @click="searchClick"></el-button>
      </el-input>
      <div v-if="user === null">
        <router-link to="/login">
          <el-button type="primary" round class="loginBut" size="mini"> 登 陆 </el-button>
        </router-link>
      </div>
      <div v-else class="avatar">
        <el-dropdown >
          <div><el-avatar :size="36" :src="portraitUrl" ></el-avatar></div>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item >
              <div @click="toUserInfo">个人空间</div>
            </el-dropdown-item>
            <el-dropdown-item >
              <div @click="getEdit">修改信息</div>
            </el-dropdown-item>
            <el-dropdown-item><div @click="logout">退出</div></el-dropdown-item>

          </el-dropdown-menu>
        </el-dropdown>
      </div>
    </el-menu>
  </div>
</template>

<script>
  export default {
    inject:["reload"],
    name: 'NavMenu',
    data () {
      return {
        keywords: '',
        isRouterAlive: true,
        user: window.sessionStorage.getItem('user'),
        //头像url
        portraitUrl: window.sessionStorage.getItem('user') == null ? '' : JSON.parse(window.sessionStorage.getItem('user')).portraitUrl,

      }
    },
    computed: {
      hoverBackground () {
        return '#ffd04b'
      }
    },
    methods: {
      //导航路由
      handleSelect (key, keyPath) {
         switch(key){
           case '1':
               this.$router.push('/index');
               break;
           case '2':
               this.$router.push({ name: 'articles', params: {type: "BASKETBALL"}})
               break;
           case '3':
               this.$router.push({ name: 'articles', params: {type: "FOOTBALL"}})
               break;
           case '4':
               if(this.user == null){
                 this.$alert("请先登录", '提示', {
                   confirmButtonText: '确定'
                 })
               }else{
                 this.$router.push('/write')
               }

               break;
           case '5':
              if(this.user == null){
                this.$alert("请先登录", '提示', {
                  confirmButtonText: '确定'
                })
              }else{
                //获取sessionStorage中的id值
                var id = JSON.parse(this.user).id
                //跳转到个人空间页，传id作为参数
                this.$router.push({ name: 'user', params: {id: id}})
              }
               break;
        }
      },
      //前往个人中心
      toUserInfo(){
        //获取sessionStorage中的id值
        var id = JSON.parse(this.user).id
        //跳转到个人空间页，传id作为参数
        this.$router.push({ name: 'user', params: {id: id}})
      },
      //前往编辑页面
      getEdit(){
        //获取sessionStorage中的id值
        var id = JSON.parse(this.user).id
        //跳转到编辑页面，传id作为参数
        this.$router.push({ name: 'edit', params: {id: id}})
      },
      //logout方法
      logout () {
        var _this = this
        this.$axios.get('/logout').then(resp => {
          console.log(resp.data.message);
          if (resp.data.code === 200) {
            // 前后端状态保持一致
            _this.$store.commit('logout')
            //刷新，否则头像等信息依旧会显示
            location.reload();
            // this.reload()
          }
        })
      },
      //搜索框
      searchClick(){
        var keywords = this.keywords
        this.$router.push({ name: 'articles', params: {type: keywords}})
      }
    }
  }
</script>

<style scoped>
  a{
    text-decoration: none;
  }

  span {
    pointer-events: none;
  }
  .navFont{
    font-family: "微软雅黑";
    font-weight: 900;
  }
  .loginBut{
    float: right;
    margin-right: 3%;
    margin-top: 15px;
  }
  .avatar{
    float: right;
    margin-right: 3%;
    margin-top: 9px;
  }
  .edit{
    border:none !important;
  }

</style>
