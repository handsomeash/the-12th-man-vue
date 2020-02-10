<template>
  <div>
    <el-menu
      :default-active="this.$route.path"
      router
      mode="horizontal"
      @select="handleSelect"
      background-color="white"
      text-color="#222"
      style="min-width: 1300px">
      <el-menu-item v-for="(item,i) in navList" :key="i" :index="item.name" class="navFont">
        {{ item.navItem }}
      </el-menu-item>
      <span style="position: absolute;padding-top: 11px;right: 44%;font-size: 20px;color: #F44336 ;font-weight: 900;"> - The 12th Man - </span>
      <el-input
        placeholder="搜索..."
        prefix-icon="el-icon-search"
        size="medium"
        style="width: 300px;position:absolute;margin-top: 9px;right: 10%"
        v-model="keywords">
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
    name: 'NavMenu',

    data () {
      return {
        navList: [
          {name: '/index', navItem: '首页'},
          {name: '/article', navItem: '文章'},
          {name: '/information', navItem: '资讯'},
          {name: '/write', navItem: '发表文章'},
          {name: '/messageBoard', navItem: '留言板'},
          {name: '/admin/dashboard', navItem: '管理中心'}
        ],
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
      handleSelect (key, keyPath) {
        console.log(key)
        console.log('...')
        console.log(keyPath)
      },
      //前往个人中心
      toUserInfo(){
        //获取sessionStorage中的id值
        var id = JSON.parse(window.sessionStorage.getItem('user')).id
        //跳转到个人空间页，传id作为参数
        this.$router.push({ name: 'user', params: {id: id}})
      },
      //前往编辑页面
      getEdit(){
        //获取sessionStorage中的id值
        var id = JSON.parse(window.sessionStorage.getItem('user')).id
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
            location.reload()
            // _this.$router.replace('/index')
          }
        })
      },
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

</style>
