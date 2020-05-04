<template>
  <div class="password_form">
    <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="100px">
      <el-form-item label="旧密码" prop="oldPassword">
        <el-input type="password" v-model="ruleForm.oldPassword" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="新密码" prop="newPassword">
        <el-input type="password" v-model="ruleForm.newPassword" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="editPassword('ruleForm')">提交</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
  export default {
    inject:["reload"],
    name: 'PasswordAdmin',
    data(){
      var validatePass = (rule, value, callback) => {
        if (value == this.ruleForm.oldPassword) {
          callback(new Error('两次输入密码一致!'));
        } else {
          callback();
        }
      };
      return{
        ruleForm: {
          oldPassword: '',
          newPassword: '',
        },
        rules:{
          oldPassword:[
            { required: true, message: '密码不能为空', trigger: 'blur' },
            { min: 3, max: 30, message: '密码长度在 3~30 个字符之间', trigger: 'blur' }
          ],
          newPassword:[
            { required: true, message: '密码不能为空', trigger: 'blur' },
            { min: 3, max: 30, message: '密码长度在 3~30 个字符之间', trigger: 'blur' },
            { validator: validatePass, trigger: 'blur' },
          ],
        },
      }
    },
    methods:{
      //修改密码
      editPassword(formName){
        //校验判断，如果校验失败，则不会执行提交逻辑
        this.$refs[formName].validate((valid) =>{
          if (valid) {
            var adminId = JSON.parse(window.sessionStorage.getItem('admin')).id
            console.log("管理员"+adminId)
            this.$axios.put('/passwordAdmin',{
              id: adminId,
              oldPassword: this.ruleForm.oldPassword,
              newPassword: this.ruleForm.newPassword,
            }).then(resp =>{
              if (resp.data.code === 200) {
                //将数据置空，否则之前数据会显示
                this.ruleForm.oldPassword = ''
                this.ruleForm.newPassword = ''
                //修改成功
                console.log('修改成功!!');
                this.$alert(resp.data.message, '提示', {
                  confirmButtonText: '确定',
                })
              }else {
                //修改失败
                console.log('修改失败!!');
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
  .password_form{
    padding-top: 100px;
    margin: 0 auto;
    width: 500px;
  }
</style>
