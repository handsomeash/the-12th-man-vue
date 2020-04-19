import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state:{
    user:{
      id: window.sessionStorage.getItem('user') == null ? '' : JSON.parse(window.sessionStorage.getItem('user' || '[]')).id
    },
    admin:{
      id: window.sessionStorage.getItem('admin') == null ? '' : JSON.parse(window.sessionStorage.getItem('admin' || '[]')).id
    }
  },
  mutations:{
    login (state, data) {
      state.user = data
      window.sessionStorage.setItem('user', JSON.stringify(data))
    },
    logout (state) {
      // 注意不能用 null 清除，否则将无法判断 user 里具体的内容
      state.user = []
      window.sessionStorage.removeItem('user')
    },
    adminLogin (state, data){
      state.admin = data
      window.sessionStorage.setItem('admin', JSON.stringify(data))
    }
  }
})
