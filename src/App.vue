<template>
  <div id="app">
<!--    <img src="./assets/logo.png">-->
    <!-- 通过v-if来控制组件出现与消失-->
    <router-view v-if="isRouterAlive"/>
  </div>
</template>

<script>
export default {
  name: 'App',
  provide(){
    return {
      reload:this.reload
    }
  },
  data(){
    return{
      isRouterAlive: true
    }
  },
  methods: {
    //实现组件局部刷新,定义了全局的方法 reload( ); 原理就是通过控制组件容器的出现与消失, 达到重新渲染的效果
   reload () {
     this.isRouterAlive = false
     this.$nextTick(() => (this.isRouterAlive = true))
   }
 }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
