<template>
  <div>
    <el-dialog title="修改密码" :visible.sync="dialogFormVisible" width="35%" ref="editpassword">
      <el-form :model="editPasswordForm" :rules="rules" ref="editPasswordForm">
        <el-form-item label="旧密码" prop="oldPassword" :label-width="formLabelWidth">
          <el-input type="password" v-model="editPasswordForm.oldPassword" auto-complete="off"></el-input>
        </el-form-item>

        <el-form-item label="新密码" prop="newPassword" :label-width="formLabelWidth">
          <el-input type="password" v-model="editPasswordForm.newPassword" auto-complete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button
        type="primary"
        @click="editPassword('editPasswordForm')"
        >确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  export default{
    name: 'EditPassword',
    data(){
      return{
        dialogFormVisible: false,
        //修改密码的表单
        editPasswordForm: {
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
            { min: 3, max: 30, message: '密码长度在 3~30 个字符之间', trigger: 'blur' }
          ],
        },
        formLabelWidth: '80px'
      }
    },
    methods:{
      //修改密码
      editPassword(formName){
        //校验判断，如果校验失败，则不会执行提交逻辑
        this.$refs[formName].validate((valid) =>{
          if (valid) {
            //获取router传递过来的参数
            var id = this.$route.params.id
            this.$axios.put('/edit/password',{
              userId: id,
              oldPassword: this.editPasswordForm.oldPassword,
              newPassword: this.editPasswordForm.newPassword,
            }).then(resp =>{
              if (resp.data.code === 200) {

                //将数据置空，否则之前数据会显示
                this.editPasswordForm.oldPassword = ''
                this.editPasswordForm.newPassword = ''
                //修改成功
                console.log('修改成功!!');
                this.$alert(resp.data.message, '提示', {
                  confirmButtonText: '确定',
                  //回调函数
                  callback: action => {
                     onclick:{
                       //关闭弹出框
                       this.dialogFormVisible = false
                     }
                  }
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
</style>
