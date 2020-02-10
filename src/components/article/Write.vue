<template>
  <div>
    <el-row>
      <el-col :span="19" :offset="3">
        <div class="mid_title ">
          文章标题
        </div>
      </el-col>
      <el-col :span="19" :offset="3">
        <div >
          <el-input  v-model="title" size="medium"></el-input>
        </div>
      </el-col>
      <el-col :span="19" :offset="3">
        <div class="mid_title ">
          文章封面
        </div>
      </el-col>
      <el-col :span="19" :offset="3">
        <div style="background-color: #FFFFFF;">
          <!-- <el-image :src="imgurl"></el-image> -->
          <img-upload @onUpload="uploadImg" ref="imgUpload"></img-upload>
        </div>
      </el-col>

      <el-col :span="19" :offset="3">
        <div class="mid_title ">
          文章内容
        </div>
      </el-col>
      <el-col :span="19" :offset="3">
        <div class="mid">
            <quill-editor
                v-model="content"
                ref="myQuillEditor"
                :options="editorOption"
                @blur="onEditorBlur($event)" @focus="onEditorFocus($event)"
                @change="onEditorChange($event)">
            </quill-editor>

        </div>
      </el-col>
      <el-col :span="19" :offset="3">
        <div class="foot">
          <router-link to="/article">
          <el-button   class="loginBut" > 取 消 </el-button>
          </router-link>
          <el-button type="primary"  class="loginBut"  v-on:click="write"> 发 表 </el-button>
        </div>
      </el-col>
    </el-row>



  </div>
</template>

<script>
  import ImgUpload from './ImgUpload'
  import { quillEditor } from 'vue-quill-editor'
  import * as Quill from 'quill'  //引入编辑器
  //quill图片可拖拽改变大小
  import ImageResize from 'quill-image-resize-module'
  Quill.register('modules/imageResize', ImageResize)
  //quill编辑器的字体
    var fonts = ['Microsoft-YaHei','SimSun', 'SimHei','KaiTi','FangSong','Arial','sans-serif','Times-New-Roman'];
    var Font = Quill.import('formats/font');
    Font.whitelist = fonts; //将字体加入到白名单
    Quill.register(Font, true);


  export default {
    name: "Write",
    components: {ImgUpload},
    data(){
      return {
        content: '',
        title: '',
        imgurl: '',
        userid: JSON.parse(window.sessionStorage.getItem('user')).id,
        editorOption: {
          modules: {
            imageResize: {} ,
            toolbar: [
              ['bold', 'italic', 'underline', 'strike'], //加粗，斜体，下划线，删除线
              ['blockquote', 'code-block'],  //引用，代码块


              [{ 'header': 1 }, { 'header': 2 }],  // 标题，键值对的形式；1、2表示字体大小
              [{ 'list': 'ordered'}, { 'list': 'bullet' }],  //列表
              [{ 'script': 'sub'}, { 'script': 'super' }], // 上下标
              [{ 'indent': '-1'}, { 'indent': '+1' }],  // 缩进
              // [{ 'direction': 'rtl' }],    // 文本方向

              [{ 'size': ['small', false, 'large', 'huge'] }], // 字体大小
              [{ 'header': [1, 2, 3, 4, 5, 6, false] }],     //几级标题


              [{ 'color': [] }, { 'background': [] }],     // 字体颜色，字体背景颜色
              [{ 'font': fonts }],     //字体
              [{ 'align': [] }],    //对齐方式

              ['clean'],    //清除字体样式
              ['image']    //上传图片
            ]
          }
        },
      }
    },
    computed: {
      editor() {
        return this.$refs.myQuillEditor.quill;
      },
    },
    methods: {
        //上传图片
        uploadImg () {
          this.imgurl = this.$refs.imgUpload.url
        },
        onEditorReady(editor) { // 准备编辑器
        },
        onEditorBlur(){}, // 失去焦点事件
        onEditorFocus(){}, // 获得焦点事件
        onEditorChange(){}, // 内容改变事件
        //发表文章
        write(){
          this.$axios.post('/article/write',{
            title: this.title,
            content: this.content,
            userid: this.userid,
            imgurl: this.imgurl
          }).then(resp =>{
             if (resp.data.code === 200) {
               //发表成功
               this.$alert(resp.data.message, '提示', {
                 confirmButtonText: '确定',
                 //回调函数
                 callback: action => {
                    onclick:{
                      this.$router.replace({path: '/article'})
                    }
                 }
               })
             }else {
                this.$alert(resp.data.message, '提示', {
                confirmButtonText: '确定'
                 })
             }
          }).catch(failResponse => {})
        },

    },
  }
</script>

<style scoped>
  .mid{
    background-color: #FFFFFF;
    height: 750px;
  }

  .ql-container {
    font-size:16px;
  }
  .mid_title{
    margin-top: 40px;
    background-color: #EEEEF2;
    padding-top: 12px;
    padding-bottom: 12px;
    padding-left: 30px;
    font-weight: 900;
    color: #323232;
    text-align: left;
  }
  .quill-editor {
        height: 94.5%;
  }
  .foot{
    padding-top: 12px;
    padding-bottom: 12px;
  }
</style>
