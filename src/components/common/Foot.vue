<template>
  <div class="foot">
    <el-row>
      <el-col :span="21" :offset="3"><div class="title"><span > - The 12th Man - </span></div></el-col>
    </el-row>
    <el-row class="foot_mid" >
      <el-col :span="11" :offset="3" class="introduce">
          <span>
            机核从2010年开始一直致力于分享游戏玩家的生活，以及深入探讨游戏相关的文化。我们开发原创的电台以及视频节目，一直在不断寻找民间高质量的内容创作者。
            <br />
            <br />
            我们坚信游戏不止是游戏，游戏中包含的科学，文化，历史等各个层面的知识和故事，它们同时也会辐射到二次元甚至电影的领域，这些内容非常值得分享给热爱游戏的您。
          </span>
      </el-col>
      <el-col :span="7" :offset="1" class="mid_right">
        <div>
          <a href="https://music.163.com/#/user/home?id=102139461">网易云</a>&#8195
          <a href="https://space.bilibili.com/46494503">bilibili</a>&#8195
          <a href="https://www.zhihu.com/people/fyj-90">知乎</a>&#8195
          <a href="https://www.douban.com/people/161739062/">豆瓣</a>&#8195
          <a href="https://weibo.com/3934990403/profile?topnav=1&wvr=6&is_all=1">微博</a>&#8195
        </div>
        <el-image :src="src" style="width: 100px; height: 100px;padding-top: 20px;"></el-image>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="7" :offset="15" class="down-left">
        <small>Copyright © 2019 - 2020 The 12th Man. All Rights Reserved</small>
      </el-col>
    </el-row>
  </div>

</template>

<script>
  export default {
      name: "Foot",
      data(){
        return {
        src: require('../../assets/img/weibo.png')
      }
    }
  }
</script>

<style scoped>
  .foot{
    margin-top: 60px;
    margin-bottom: 90px;
  }
  .foot_mid{
    /* background-color: #00FF00; */
    margin-top: 25px;
  }
  .title{
    float: left;
    font-weight: 900;
    font-size: 25px;
  }
  .introduce{
    padding-top: 25px;
    border-top: 1px solid #C1C2C3;
    font-size: 12px;
    line-height:2;
    text-align: left;
  }
  .mid_right{
    font-size: 16px;
    padding-top: 25px;
    border-top: 1px solid #C1C2C3;
    text-align: right;
  }
  .down-left{
    padding-top: 15px;
    text-align: right;
  }
</style>
