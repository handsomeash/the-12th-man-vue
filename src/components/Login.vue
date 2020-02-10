<template>
  <div>
    <el-menu>
      <router-link to="/index">
        <el-button type="primary" round class="indexBut" size="mini"> 回到主页 </el-button>
      </router-link>
    </el-menu>

    <el-form :model="loginForm" class="login-container" :rules="rules" label-position="left" label-width="0px" ref="loginForm" >
      <h3 class="login_title">登 录</h3>
      <el-form-item prop="username">
        <el-input type="text" v-model="loginForm.username" auto-complete="off" placeholder="账号" ></el-input>
      </el-form-item>

      <el-form-item prop="password">
        <el-input type="password" v-model="loginForm.password" auto-complete="off" placeholder="密码" ></el-input>
      </el-form-item>
      <div>
        <el-checkbox v-model="checked" class="font_left"><small>记住我</small></el-checkbox>
        <router-link to="/" class="font_right" ><small >找回密码</small></router-link>
      </div>
      <el-form-item style="padding-top: 37px;">
          <el-button type="danger" class="login_button" v-on:click="login('loginForm')">登 录</el-button>
          <router-link to="/Register"><small>注册账号</small></router-link>
          <div class="message" v-if="show">
            <small v-text="message"></small>
          </div>
      </el-form-item>

    </el-form>

  </div>

</template>

<script>
    export default {
        name: "Login",
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
              var _this = this
              //校验判断，如果校验失败，则不会执行提交逻辑
               this.$refs[formName].validate((valid) =>{
                 if (valid) {
                   //这里是axios和后端交互
                   this.$axios.post('/login', {
                       username: this.loginForm.username,
                       password: this.loginForm.password
                   }).then(resp => {
                         console.log(resp.data.message);
                           if (resp.data.code === 200) {
                             //获取到后端传过来的user对象
                             var data = resp.data.data
                             console.log(data.id)
                             //存储到sessionstorage
                             _this.$store.commit('login', data)
                             console.log(window.sessionStorage.getItem('user').toString())
                             var path = _this.$route.query.redirect
                             _this.$router.replace({path: path === '/' || path === undefined ? '/index' : path})
                             // this.$router.replace({path: '/index'})
                           }else{
                               this.message = resp.data.message,
                               this.show = true
                               // this.$alert(successResponse.data.message, '提示', {
                               //   confirmButtonText: '确定'
                               // })
                           }
                       }).catch(failResponse => {
                   })
                 }else {
                  console.log('error submit!!');
                  return false;
               }
              });
            }
        },

    }
</script>

<style scoped>
  .message{
    color: #F56C6C;
  }
  small{
    font-size:13px
  }
</style>
