<template>
  <div>
    <el-menu>
      <router-link to="/index">
        <el-button type="primary" round class="indexBut" size="mini"> 回到主页 </el-button>
      </router-link>
    </el-menu>

    <el-form :model="registForm" :rules="rules" class="login-container" label-position="left" label-width="0px" ref="registForm">
      <h3 class="login_title">注 册</h3>
      <el-form-item prop="username">
        <el-input type="text" v-model="registForm.username" auto-complete="off" placeholder="账号"></el-input>
      </el-form-item>
      <el-form-item prop="nickname">
        <el-input type="text" v-model="registForm.nickname" auto-complete="off" placeholder="昵称"></el-input>
      </el-form-item>
      <el-form-item prop="email">
        <el-input type="email" v-model="registForm.email" auto-complete="off" placeholder="邮箱"></el-input>
      </el-form-item>
      <el-form-item prop="password">
        <el-input type="password" v-model="registForm.password" auto-complete="off" placeholder="密码"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="danger" class="login_button" v-on:click="register('registForm')">注 册</el-button>
      <router-link to="/login"><small>已有账号，登陆</small></router-link><br />
      </el-form-item>
    </el-form>
  </div>

</template>

<script>
    export default {
        name: "Register",
        data(){
          return{
            registForm:{
              username: '',
              password: '',
              nickname: '',
              email: '',
            },
            rules:{
              username:[
                { required: true, message: '账号不能为空', trigger: 'blur' },
                { min: 3, max: 20, message: '账号长度在 3~20 个字符之间', trigger: 'blur' }
              ],
              password:[
                { required: true, message: '密码不能为空', trigger: 'blur' },
                { min: 3, max: 30, message: '密码长度在 3~30 个字符之间', trigger: 'blur' }
              ],
              nickname:[
                { required: true, message: '昵称不能为空', trigger: 'blur' },
                { min: 2, max: 20, message: '账号长度在 2~20 个字符之间', trigger: 'blur' }
              ],
              email:[
                { required: true, message: '邮箱不能为空', trigger: 'blur' },
                { pattern:/^[A-Za-z0-9\u4e00-\u9fa5]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/, message: '邮箱格式不正确', trigger: 'blur'}
              ]
            }
          }
        },
        methods:{
          register(formName){
            //校验判断，如果校验失败，则不会执行提交逻辑
            this.$refs[formName].validate((valid) =>{
              if (valid) {
                this.$axios.post('/register',{
                  username: this.registForm.username,
                  password: this.registForm.password,
                  nickname: this.registForm.nickname,
                  email: this.registForm.email,
                }).then(resp =>{
                  if (resp.data.code === 200) {
                    //注册成功
                    this.$alert(resp.data.message, '提示', {
                      confirmButtonText: '确定，去登陆',
                      //回调函数
                      callback: action => {
                         onclick:{
                           this.$router.replace({path: '/login'})
                         }
                      }
                    })

                  } else {
                    //注册失败
                    this.$alert(resp.data.message, '提示', {
                      confirmButtonText: '确定'
                    })
                  }
                }).catch(failResponse => {})
              }else {
                  console.log('error submit!!');
                  return false;
               }
            });
          }

        }
    }
</script>

<style scoped>

</style>
