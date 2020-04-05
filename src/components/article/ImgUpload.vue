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
    <!--第一个判断是否是编辑，编辑的话父组件会传过来-->
    <img v-if="imgurl" :src="imgurl" class="avatar">
    <img v-else-if="url" :src="url" class="avatar">
    <i v-else class="el-icon-plus avatar-uploader-icon"></i>
  </el-upload>
</template>

<script>
  export default {
    name: 'ImgUpload',

    props: ['imgurl'],
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
    width: 500px;
    /* height: 100%; */
    line-height: 160px;
    text-align: center;
  }
  .avatar {
    width: auto;
    height:160px;
    display: block;
  }
</style>
