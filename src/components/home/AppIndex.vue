<template>
  <div class="img">
      <el-carousel :interval="3000" type="card" height="500px">
        <el-carousel-item v-for="item in imgList" :key="item">
          <img :src="item"  ref='img_ref' style="width: 900px; height: 500px"/>
        </el-carousel-item>
      </el-carousel>
   </div>
</template>

<script>
  export default {
    name: 'AppIndex',
    data(){
      return{
        //引入图片
        imgList:[
          "http://localhost:8443/api/file/fm1.jpg",
          "http://localhost:8443/api/file/fm2.jpg",
          "http://localhost:8443/api/file/fm3.jpg",
        ]
      }
    },
  }
</script>

<style scoped>
.img {
    padding-top: 50px;
    padding-bottom: 50px;
  }

</style>
