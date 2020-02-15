<template>
  <el-row>
    <el-col :span="19" :offset="3">
      <el-container class="main">

        <el-aside width="250px">
         <div class="aside" >
            <el-menu
              :default-active="activeIndex"
              class="el-menu-vertical-demo"
              active-text-color="#F44336">
             <!-- @open="handleOpen"
              @close="handleClose" -->

              <el-menu-item index="1">
                <template slot="title">
                  <i class="el-icon-location"></i>
                  <span style="font-weight: 900;">修改头像&#8195</span>
                </template>
              </el-menu-item>
              <el-menu-item index="2">
                <i class="el-icon-menu"></i>
                <span slot="title" style="font-weight: 900;">个人资料&#8195</span>
              </el-menu-item>
              <el-menu-item index="4">
                <i class="el-icon-setting"></i>
                <span slot="title" style="font-weight: 900;">账号与安全</span>
              </el-menu-item>
            </el-menu>
         </div>
        </el-aside>

        <el-main>
          <div class="part">
            <el-row>
              <el-col :span="24" class="title_color"><div class="title font_left font_style">修改头像</div></el-col>
            </el-row>
            <el-row class="inside inside_color inside_end inside_top">
              <el-col :span="4" ><div class="font_left font_style head_text ">头像</div></el-col>
              <el-col :span="2" >
                  <el-avatar :size="100" :src="user.portraitUrl" style="float: left;" ></el-avatar>
              </el-col>
              <el-col :span="14" :offset="2">
                <el-row>
                  <el-col :span="24">
                    <!--上传头像图片组件-->
                    <div class="font_left">
                      <img-upload @onUpload="uploadImg" ref="imgUpload"></img-upload>
                    </div>

                    <!-- <el-button round  size="medium" class="head_btn font_left">修改头像</el-button> -->
                  </el-col>
                  <el-col :span="24">
                    <div class="head_introduce font_left">
                      <small >图片格式支持JPG、JPEG、PNG等</small>
                    </div></el-col>
                </el-row>
              </el-col>
            </el-row>
          </div>

          <el-form :model="user" :rules="editRules" ref="editForm">
            <div class="part">
              <el-row>
                <el-col :span="24" class="title_color"><div class="title font_left font_style">个人资料</div></el-col>
              </el-row>
              <el-row class="inside inside_color inside_top">
                <el-col :span="4" ><div class="font_left font_style left_text_style">昵称</div></el-col>
                <el-col :span="12" >
                  <el-form-item prop="nickname"><el-input v-model="user.nickname" size="medium"></el-input></el-form-item>
                </el-col>
              </el-row>
              <el-row class="inside inside_color">
                <el-col :span="4"><div class="font_left font_style">性别</div></el-col>
                <el-col :span="19" class="inside_color">
                  <div class="font_left">
                  <el-form-item prop="gender">
                    <el-radio v-model="user.gender" label="MALE" >男</el-radio>
                    <el-radio v-model="user.gender" label="FEMALE" >女</el-radio>
                  </el-form-item>
                  </div>
                </el-col>
              </el-row>
              <el-row class="inside inside_color" style="padding-bottom: 10px;">
                <el-col :span="4" ><div class="font_left font_style left_text_style">生日</div></el-col>
                <el-col :span="19" >
                  <div class="font_left">
                    <el-form-item prop="birthday">
                    <el-date-picker
                          v-model="user.birthday"
                          type="date"
                          placeholder="选择日期"
                          style="width: 420px;"
                          size="medium"
                          value-format="yyyy-MM-dd">
                    </el-date-picker>
                    </el-form-item>
                  </div>
                </el-col>
              </el-row>
            </div>

            <div class="part">
              <el-row>
                <el-col :span="24" class="title_color"><div class="title font_left font_style">账号与安全</div></el-col>
              </el-row>
              <el-row class="inside inside_color inside_top">
                <el-col :span="4" ><div class="font_left font_style left_text_style">手机</div></el-col>
                <el-col :span="12" >
                  <el-form-item prop="phone"><el-input v-model="user.phone" size="medium"></el-input></el-form-item>
                </el-col>
              </el-row>
              <el-row class="inside inside_color">
                <el-col :span="4" ><div class="font_left font_style left_text_style">邮箱</div></el-col>
                <el-col :span="12" >
                  <el-form-item prop="email"><el-input v-model="user.email" size="medium"></el-input></el-form-item>
                </el-col>
              </el-row>
              <el-row class="inside inside_end inside_color">
                <el-col :span="4" ><div class="font_left font_style left_text_style">密码</div></el-col>
                <el-col :span="12" >
                  <div >
                    <!-- <el-button  round  size="medium" class="head_btn font_left" @click="dialogFormVisible = true">修改密码</el-button> -->
                    <el-button  round  size="medium" class="head_btn font_left" @click="editpasswordform">修改密码</el-button>
                  </div>
                </el-col>
              </el-row>
            </div>
            <div class="part font_right">
              <el-button round size="medium" >取 消</el-button>
              <el-button type="primary" round size="medium" @click="edit('editForm')">修 改</el-button>
            </div>
          </el-form>

        </el-main>
      </el-container>
      <!--注册修改密码的组件-->
      <edit-password ref="editpassword"></edit-password>

    </el-col>
  </el-row>
</template>

<script>
  import ImgUpload from './ImgUpload'
  import EditPassword from './EditPassword'
  export default {
    name: 'UserEdit',
    components: {EditPassword,ImgUpload},
    data(){
      return{
        user: {
          id: '',
          username: '',
          password: '',
          nickname: '',
          portraitUrl: '',
          registerDate: '',
          gender: '',
          birthday: '',
          phone: '',
          email: '',
        },
        activeIndex: '1',

        editRules: {
          nickname:[
            { required: true, message: '昵称不能为空', trigger: 'blur' },
            { min: 2, max: 20, message: '账号长度在 2~20 个字符之间', trigger: 'blur' }
          ],
          email:[
            { required: true, message: '邮箱不能为空', trigger: 'blur' },
            { pattern:/^[A-Za-z0-9\u4e00-\u9fa5]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/, message: '邮箱格式不正确', trigger: 'blur'}
          ]
        },
      }
    },
    //钩子函数
    mounted() {
      this.getUserInfo()
    },
    methods:{
      //上传图片
      uploadImg () {
        this.user.portraitUrl = this.$refs.imgUpload.url
      },
      //使修改密码组件显示
      editpasswordform(){
        this.$refs.editpassword.dialogFormVisible = true
      },
      //获取个人信息
      getUserInfo(){
        //获取router传递过来的参数
        var id = this.$route.params.id
        this.$axios.get('/user/edit/'+id).then(resp => {
          console.log(resp.data)
          //赋值
          this.user = resp.data
        }).catch(failResponse => {})
      },

      edit(formName){
        this.$refs[formName].validate((valid) =>{
          if (valid) {
            this.$axios.put('/user/edit',{
              id: this.user.id,
              nickname: this.user.nickname,
              gender: this.user.gender,
              birthday: this.user.birthday,
              phone: this.user.phone,
              email: this.user.email,
              portraitUrl: this.user.portraitUrl,
            }).then(resp =>{
              if (resp.data.code === 200) {
                console.log('修改成功');

                var data = resp.data.data
                //如果获取到头像url，更新sessionStorage中的值
                if(data !== null){
                  console.log('获取到头像url');
                  this.$store.commit('login', data)
                  //修改成功，刷新页面，头像改变了
                    this.$alert(resp.data.message, '提示', {
                      confirmButtonText: '确定',
                      //回调函数
                      callback: action => {
                         onclick:{
                           //刷新，让头像及时显示
                           location.reload()
                         }
                      }
                    })
                }else{
                  //修改成功，不必刷新页面，因为头像没有变
                    this.$alert(resp.data.message, '提示', {
                      confirmButtonText: '确定'
                    })
                }

              }else {
                console.log('修改失败');
                //修改失败
                this.$alert(resp.data.message, '提示', {
                  confirmButtonText: '确定'
                })
                  }
            }).catch(failResponse => {})
          }else {
                  console.log('error submit!!');
                  return false;
               }
        })
      },
    }
  }
</script>

<style scoped>
  .main{
    margin-top: 20px;
    margin-bottom: 70px;
  }
  .title_color{
    background-color: #EEEEF2;
  }
  .inside_color{
    background: #FFFFFF;
  }
 .inside{
    padding-left: 30px;
    padding-right: 30px;
   /* padding-top: 30px; */
  }
  .inside_end{
    padding-bottom: 30px;
  }
  .inside_top{
    padding-top: 30px;
  }
  .title{
    padding-top: 14px;
    padding-bottom: 14px;
    padding-left: 30px;
  }
  .font_style{
    font-weight: 900;
    color: #323232;
  }
  .left_text_style{
    padding-top: 6px;
  }
  .head_text{
    margin-top: 35px;
  }
 .head_introduce{
    padding-top: 10px;
    color: #8C939D;
  }
  .head_btn{
    /* background-color: #FFFFFF; */
    color: #8C939D ;
    border: 2.5px solid #E6E6E6 ;
  }
  /*中间部分的每一块离上一块的距离*/
  .part{
    margin-top: 30px;
  }
  .aside{
    margin-top: 50px;
    background-color: #FFFFFF;
    height: 825px;
  }
</style>
