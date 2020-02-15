<template>
   <el-upload
    ref="upload"
    action="http://localhost:8443/api/user/editPortrait"
    :show-file-list="false"
    :on-preview="handlePreview"
    :on-remove="handleRemove"
    :before-remove="beforeRemove"
    :on-success="handleSuccess"
    multiple
    :limit="1"
    :on-exceed="handleExceed"
    :file-list="fileList"
    >
    <el-button round  size="medium" class="head_btn ">修改头像</el-button>
  </el-upload>
</template>

<script>
  export default {
    name: 'ImgUpload',
    data () {
      return {
        fileList: [],
        url: ''
      }
    },
    methods: {
      handleRemove (file, fileList) {
      },
      handlePreview (file) {
      },
      handleExceed (files, fileList) {
        this.$message.warning(`当前限制选择 1 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`)
      },
      beforeRemove (file, fileList) {
        return this.$confirm(`确定移除 ${file.name}？`)
      },
      handleSuccess (response) {
        this.url = response
        this.$emit('onUpload')
        // this.$message.success('上传成功')
      },
      clear () {
        this.$refs.upload.clearFiles()
      }
    }
  }
</script>

<style scoped>
  .head_btn{
    color: #8C939D ;
    border: 2.5px solid #E6E6E6 ;
  }

</style>
