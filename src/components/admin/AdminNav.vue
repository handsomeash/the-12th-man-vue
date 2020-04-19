<template>

    <el-menu
      default-active="1"
      class="menu"
      @select="handleSelect"
      background-color="#545c64"
      text-color="#fff"
      active-text-color="#F44336">
      <h3 style="color: #F44336;"> - The 12th Man - </h3>
      <el-menu-item index="1">
        <i class="el-icon-menu"></i>
        <span slot="title">用户管理</span>
      </el-menu-item>
      <el-menu-item index="2">
        <i class="el-icon-document"></i>
        <span slot="title">文章管理</span>
      </el-menu-item>
      <el-menu-item index="3">
        <i class="el-icon-chat-line-round"></i>
        <span slot="title">评论管理</span>
      </el-menu-item>
     <el-menu-item index="4">
        <i class="el-icon-setting"></i>
        <span slot="title">密码修改</span>
      </el-menu-item>
    </el-menu>
</template>

<script>
  export default {
    name: 'AdminNav',
    methods:{
      handleSelect (key, keyPath) {
        switch(key){
          case '1':
              this.$router.push('/useradmin');
              break;
          case '2':
              this.$router.push('/articleadmin');
              break;
          case '3':
              this.$router.push('/commentadmin');
              break;
          case '4':
              this.$router.push('/passwordadmin');
              break;

        }
      },
    }
  }
</script>

<style scoped>
  .menu{
    height: 100%;
  }
</style>
