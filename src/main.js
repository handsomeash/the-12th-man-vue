// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
//引入element-ui
// import 'element-ui/lib/theme-chalk/index.css';
import '../theme/index.css'
import '../theme/mycss.css'
import ElementUI from 'element-ui'
import router from './router'
//添加对 store 的引用
import store from './store'
//引入富文本编辑器
import VueQuillEditor from 'vue-quill-editor'
import 'quill/dist/quill.snow.css'
import '../theme/fonts/font.css'

//设置反向代理，前端默认请求发送到 http://localhost:8443/api
var axios = require('axios')
axios.defaults.baseURL = 'http://localhost:8443/api'

// 使请求带上凭证信息
//这样，前端每次发送请求时就会带上 sessionId，shiro 就可以通过 sessionId 获取登录状态并执行是否登录的判断
axios.defaults.withCredentials = true
// 全局注册，之后可在其他组件中通过 this.$axios 发送数据
Vue.prototype.$axios = axios
Vue.config.productionTip = false

Vue.use(ElementUI);
Vue.use(VueQuillEditor);

router.beforeEach((to, from, next) => {

    if(store.state.user.id){
        next()
    }else{
        axios.get('/isRememberMe').then(resp => {
        if (resp.data.code == 200 ){
          //获取到后端传过来的user对象
          var data = resp.data.data
          //存储到sessionstorage
          store.commit('login', data)
          console.log("通过记住我登陆："+window.sessionStorage.getItem('user').toString())
          //刷新
          location.reload()
          next()
        }
      })
    }

    if (to.meta.requireAuth) {
      if (store.state.user.id) {
        // axios.get('/authentication').then(resp => {
        //   if (resp.data.code == 200 ) next()
        // })
        next()
      } else {
        next({
          path: 'login',
          query: {redirect: to.fullPath}
        })
      }
    } else {
      next()
    }
  }
)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  render: h => h(App),
  router,
  store,
  components: {App},
  template: '<App/>'
})
