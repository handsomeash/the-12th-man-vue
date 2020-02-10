import Vue from 'vue'
import Router from 'vue-router'
//导入编写的组件

import AppIndex from '../components/home/AppIndex'
import Login from '../components/Login'
import HelloWorld from '@/components/HelloWorld'
import Register from "../components/Register"
import Home from "../components/Home"
import ArticleIndex from "../components/article/ArticleIndex"
import ArticleDetail from "../components/article/ArticleDetail"
import UserIndex from "../components/user/UserIndex"
import UserEdit from "../components/user/UserEdit"
import Write from "../components/article/Write"

Vue.use(Router)

//如果路由跳转同一个页面，会报错
// const originalPush = Router.prototype.push
// Router.prototype.push = function push(location) {
//   return originalPush.call(this, location).catch(err => err)
// }

export default new Router({
  mode: 'history',
  //路由
  routes: [
    {
      path: '/home',
      name: 'Home',
      component: Home,
// home页面并不需要被访问
      redirect: '/index',
      children: [
        {
          path: '/index',
          name: 'AppIndex',
          component: AppIndex,
          // meta: {
          //   requireAuth: true
          // }
        },
        {
          path: '/article',
          name:'Article',
          component: ArticleIndex,
        },
        {
          path: '/article/:id',
          name: 'ArticleDetail',
          component: ArticleDetail,
        },
        {
          path: '/write',
          name: 'write',
          component: Write,
          meta: {
            requireAuth: true
          }
        },
        {
          path: '/user/:id',
          name: 'user',
          component: UserIndex,
          meta: {
            requireAuth: true
          }
        },
        {
          path: '/edit/:id',
          name: 'edit',
          component: UserEdit,
          meta: {
            requireAuth: true
          }
        }
      ]
    },
    {
      path: '/',
      name: 'HelloWorld',
      component: HelloWorld
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/register',
      name: 'Register',
      component: Register
    }
  ]
})
