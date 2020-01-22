<template>
  <!-- Element 提供的 Container 布局容器-->
  <el-container>
    <el-main >
      <el-row>

        <el-col :span="1" :offset="3"><h3 class="title">文章</h3></el-col>
        <el-col :span="20" :offset="3"><div>
          <SingleArticle ></SingleArticle>
        </div></el-col>
      </el-row>

    </el-main>
  </el-container>
</template>

<script>
  import SingleArticle from './SingleArticle'
   export default {
    name: 'ArticleIndex',
    components:{SingleArticle}
  }
</script>

<style scoped>
</style>
