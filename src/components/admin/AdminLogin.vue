<template>
    <div>
    <el-menu>
      <router-link to="/index">
        <el-button type="primary" round class="indexBut" size="mini"> 回到主页 </el-button>
      </router-link>
    </el-menu>

    <el-form :model="loginForm" class="login-container" :rules="rules" label-position="left" label-width="0px" ref="loginForm" >
      <h3 class="login_title">管理员登陆</h3>
      <el-form-item prop="username">
        <el-input type="text" v-model="loginForm.username" auto-complete="off" placeholder="账号" ></el-input>
      </el-form-item>

      <el-form-item prop="password">
        <el-input type="password" v-model="loginForm.password" auto-complete="off" placeholder="密码" ></el-input>
      </el-form-item>

      <el-form-item >
          <el-button type="danger" class="login_button" v-on:click="login('loginForm')">登 录</el-button>
          <div class="message" v-if="show">
            <small v-text="message" style="color: #F56C6C;"></small>
          </div>
      </el-form-item>

    </el-form>

  </div>
</template>

<script>
  export default {
    name: 'AdminLogin',
    data() {
        return {
            checked: false,
            message: '',
            show: false,
            loginForm: {
                username: '',
                password: ''
            },
            rules:{
              username:[
                { required: true, message: '账号不能为空', trigger: 'blur' },
              ],
              password:[
                { required: true, message: '密码不能为空', trigger: 'blur' },
              ],
            }
        }
    },
    //钩子函数，定义点击事件 -- 直接在生命周期钩子函数mounted(dom挂载完成之后)中添加点击事件，通过判断目标元素的class名称可实现对应的效果
    mounted(){
        document.addEventListener('click', (e)=> {
            if (e.target.className != 'message') {
                this.show= false;
            }
        })
    },
    methods: {
      login(formName) {
        //校验判断，如果校验失败，则不会执行提交逻辑
         this.$refs[formName].validate((valid) =>{
           if (valid) {
             this.$axios.post('/adminLogin', {
                 username: this.loginForm.username,
                 password: this.loginForm.password,
             }).then(resp => {
               if (resp.data.code === 200) {
                 //存储到sessionstorage
                 var data = resp.data.data
                 this.$store.commit('adminLogin', data)
                 this.$router.replace({path: '/adminhome'})
               }else{
                 this.message = resp.data.message,
                 this.show = true
               }
             }).catch(failResponse => {})
           }
         });
      },
    },
  }
</script>

<style scoped>
</style>
