<template>
  <div>
    <div class="img">
        <el-carousel :interval="3000" type="card" height="500px">
          <el-carousel-item v-for="item in imgList" :key="item">
            <img :src="item"  ref='img_ref' style="width: 900px; height: 500px"/>
          </el-carousel-item>
        </el-carousel>
     </div>
    <div class="word">
      Everything negative pressure,challenges is all an opportunity for me to rise.
      <br /><br />
      压力、挑战，这一切消极的东西都是我能够取得成功的催化剂。
    </div>
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
.word{
  font-size: 21px;
  /* font-weight: 200; */
  padding-bottom: 100px;
}
</style>
