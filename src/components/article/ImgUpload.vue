<template>
  <el-upload
    ref="upload"
    action="http://localhost:8443/api/cover"
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
    <img v-if="url" :src="url" class="avatar">
    <i v-else class="el-icon-plus avatar-uploader-icon"></i>
    <!-- <el-button round  size="medium" class="head_btn ">上传封面</el-button> -->
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
  .avatar-uploader-icon {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    font-size: 35px;
    color: #8c939d;
    width: 1188px;
    height: 100%;
    line-height: 200px;
    text-align: center;
  }
  .avatar {
    width: auto;
    height:200px;
    display: block;
  }
</style>
