<template>
   <div>
    <!-- <el-row style="height: 840px;"> -->
    <el-row >

      <el-tooltip effect="dark" placement="right" v-for="item in books" :key="item.id">
        <p slot="content" style="font-size: 14px;margin-bottom: 6px;">{{item.title}}</p>
        <p slot="content" style="font-size: 13px;margin-bottom: 6px">
          <span>{{item.author}}</span> /
          <span>{{item.date}}</span> /
          <span>{{item.press}}</span>
        </p>
        <p slot="content" style="width: 300px" class="abstract">{{item.abs}}</p>

        <el-card :body-style="{ padding: '0px' }" class="box-card">
          <div >
            <img :src="item.cover" alt="封面" class="cover">
          </div>

          <div class="info">
            <div class="title">
              <a href="">{{item.title}}</a>
            </div>
          </div>
          <div class="card-foot">
            <div class="author" >
              {{item.author}}
            </div>
            <div class="icon">
              <i class="el-icon-star-on">23</i>&#8195
              <i class="el-icon-chat-line-round">25</i>
            </div>

          </div>

        </el-card>
      </el-tooltip>

      <el-tooltip effect="dark" placement="right" v-for="item in books" :key="item.id">
        <p slot="content" style="font-size: 14px;margin-bottom: 6px;">{{item.title}}</p>
        <p slot="content" style="font-size: 13px;margin-bottom: 6px">
          <span>{{item.author}}</span> /
          <span>{{item.date}}</span> /
          <span>{{item.press}}</span>
        </p>
        <p slot="content" style="width: 300px" class="abstract">{{item.abs}}</p>

        <el-card :body-style="{ padding: '0px' }" class="box-card">
          <div >
            <img :src="item.cover" alt="封面" class="cover">
          </div>

          <div class="info">
            <div class="title">
              <a href="">{{item.title}}</a>
            </div>
          </div>
          <div class="card-foot">
            <div class="author" >
              {{item.author}}
            </div>
            <div class="icon">
              <i class="el-icon-star-on">23</i>&#8195
              <i class="el-icon-chat-line-round">25</i>
            </div>

          </div>

        </el-card>
      </el-tooltip>



    </el-row>

    <!--分页-->
    <el-row>
      <!-- <el-pagination
        :current-page="1"
        :page-size="10"
        :total="20">
      </el-pagination> -->
      <el-pagination
        background
        layout="prev, pager, next"
        :total="1000">
      </el-pagination>
    </el-row>
  </div>
</template>

<script>
  export default {
    name: 'SingleArticle',
    data () {
      return {
        currentDate: new Date(),
        books: [
          {
            cover: require('../../assets/img/UK.jpg'),
            title: '战锤40K的旧日霸主：艾达灵族极简概览介绍',
            author: '刘慈欣',
            date: '2019-05-05',
            press: '重庆出版社',
            abs: '文化大革命如火如荼进行的同时。军方探寻外星文明的绝秘计划“红岸工程”取得了突破性进展。但在按下发射键的那一刻，历经劫难的叶文洁没有意识到，她彻底改变了人类的命运。地球文明向宇宙发出的第一声啼鸣，以太阳为中心，以光速向宇宙深处飞驰……'
          }
        ]
      }
    }
  }

</script>

<style scoped>
  .box-card{
    width: 270px;
    /*下部距离*/
    margin-bottom: 30px;
    height: 300px;
    float: left;
    margin-right: 30px
  }

  .cover {
    width: 100%;
    display: block;
   /* width: 115px;
    height: 172px;
    margin-bottom: 7px;
    overflow: hidden;
    cursor: pointer; */
    /* background-color: #0000FF; */
  }

  .title {
    font-size: 16px;
    font-weight: 800;
    text-align: left;
    padding: 20px;
  }

  .card-foot{
    padding: 20px;
  }

  .author {
    font-size: 13px;
    float: left;
  }
  .icon{
    font-size: 14px;
    color: #A3A3A5;
    float: right;
  }

  .abstract {
    display: block;
    line-height: 17px;
  }

  a {
    color: #303133;
    text-decoration: none;
  }



</style>
