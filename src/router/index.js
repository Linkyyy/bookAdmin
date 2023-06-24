import { createRouter, createWebHistory } from 'vue-router'
import store from '../store/index'

import AdminLogin from '../views/admin/Login.vue'
import AdminIndex from '../views/admin/Index.vue'
import AdminData from '../views/admin/Data.vue'
import AdminSet from '../views/admin/Set.vue'
import AdminBorrow from '../views/admin/Borrow.vue'
import AdminBook from '../views/admin/Book.vue'
import AdminUser from '../views/admin/User.vue'

import FrontNav from '../views/front/Nav.vue'
import FrontIndex from '../views/front/Index.vue'
import FrontSearch from '../views/front/Search.vue'
import FrontBook from '../views/front/Book.vue'
import FrontMy from '../views/front/My.vue'
import FrontLogin from '../views/front/Login.vue'
import FrontRegister from '../views/front/Register.vue'

const routes = [

  { path: '/', redirect: '/index' },

  {
    path: '/admin',
    redirect: '/admin/index',
  },
  {
    path: '/admin/index',
    name: 'adminIndex',
    component: AdminIndex,
    children: [
      {
        path: '/admin/index',
        name: 'AdminData',
        component: AdminData,
        beforeEnter: () => {
          store.state.breadcrumbList = [];
          store.state.activeIndex = '1';

        }
      },
      {
        path: '/admin/set',
        name: 'AdminSet',
        component: AdminSet,
        beforeEnter: () => {
          store.state.breadcrumbList = ['设置'];
          store.state.activeIndex = '3';
        }
      },
      {
        path: '/admin/borrow',
        name: 'AdminBorrow',
        component: AdminBorrow,
        beforeEnter: () => {
          store.state.breadcrumbList = ['管理', '借阅管理'];
          store.state.activeIndex = '2-1';
        }
      },

      {
        path: '/admin/book',
        name: 'AdminBook',
        component: AdminBook,
        beforeEnter: () => {
          store.state.breadcrumbList = ['管理', '图书管理'];
          store.state.activeIndex = '2-2';
        }
      },
      {
        path: '/admin/user',
        name: 'AdminUser',
        component: AdminUser,
        beforeEnter: () => {
          store.state.breadcrumbList = ['管理', '用户管理'];
          store.state.activeIndex = '2-3';
        }
      },

    ]
  },
  {
    path: '/admin/login',
    name: 'adminLogin',
    component: AdminLogin
  },
  {
    path: '/index',
    name: 'FrontNav',
    component: FrontNav,
    children: [
      {
        path: '/index',
        name: 'FrontIndex',
        component: FrontIndex,
        beforeEnter: () => {

        }
      },
      {
        path: '/search',
        name: 'FrontSearch',
        component: FrontSearch,

      },
      {
        path: '/book',
        name: 'FrontBook',
        component: FrontBook,
      },
      {
        path: '/my',
        name: 'FrontMy',
        component: FrontMy,
      },


    ]

  },
  {
    path: '/login',
    name: 'FrontLogin',
    component: FrontLogin,
  },
  {
    path: '/register',
    name: 'FrontRegister',
    component: FrontRegister,
  },




]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
