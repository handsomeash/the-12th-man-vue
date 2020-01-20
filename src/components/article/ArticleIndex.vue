<template>
  <!-- Element 提供的 Container 布局容器-->
  <el-container>
    <el-main >
      <h3 class="title">文章</h3><br />
      <SingleArticle class="article-area"></SingleArticle>
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
  .article-area{
    /* background-color: #0000FF; */
    width: 1150px;
    margin-left: auto;
    margin-right: auto;
  }


</style>
