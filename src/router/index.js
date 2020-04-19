import Vue from 'vue'
import Router from 'vue-router'
//导入编写的组件

import AppIndex from '../components/home/AppIndex'
import Login from '../components/Login'
import HelloWorld from '@/components/HelloWorld'
import Register from "../components/Register"
import Home from "../components/Home"
import ArticleDetail from "../components/article/ArticleDetail"
import UserIndex from "../components/user/UserIndex"
import UserEdit from "../components/user/UserEdit"
import Write from "../components/article/Write"
import ArticleIndex from "../components/article/ArticleIndex"
import AdminHome from "../components/admin/AdminHome"
import AdminLogin from "../components/admin/AdminLogin"
import UserAdmin from "../components/admin/UserAdmin"
import ArticleAdmin from "../components/admin/ArticleAdmin"
import CommentAdmin from "../components/admin/CommentAdmin"
import PasswordAdmin from "../components/admin/PasswordAdmin"

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
          path: '/articles/:type',
          name:'articles',
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
      path: '/adminhome',
      name: 'AdminHome',
      component: AdminHome,
      redirect: '/useradmin',
      children: [
        {
          path: '/useradmin',
          name:'UserAdmin',
          component: UserAdmin,
          meta: {
            requireAdmin: true
          }
        },
        {
          path: '/articleadmin',
          name:'ArticleAdmin',
          component: ArticleAdmin,
          meta: {
            requireAdmin: true
          }
        },
        {
          path: '/commentadmin',
          name:'CommentAdmin',
          component: CommentAdmin,
          meta: {
            requireAdmin: true
          }
        },
        {
          path: '/passwordadmin',
          name:'PasswordAdmin',
          component: PasswordAdmin,
          meta: {
            requireAdmin: true
          }
        },
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
    },
    {
      path: '/adminlogin',
      name: 'AdminLogin',
      component: AdminLogin
    },
  ]
})
