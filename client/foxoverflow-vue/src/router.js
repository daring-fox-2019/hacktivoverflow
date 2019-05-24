import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/foxoverflow',
      name: 'foxoverflow',
      component: Home
    },
    {
      path: '/tags',
      name: 'tags',
      component: Home,
    },
    {
      path: '/users',
      name: 'users',
      component: Home
    },
    {
      path: "/questions/add",
      name: "add question",
      component: () => import(/* webpackChunkName: "AddQuestion" */ './views/AddQuestion.vue')
    },
    {
      path: "/questions/:id",
      name: "question",
      component: () => import(/* webpackChunkName: "ViewQuestion" */ './views/ViewQuestion.vue')
    },
    {
      path: "/questions/:id/edit",
      name: "edit question",
      component: () => import(/* webpackChunkName: "EditQuestion" */ './views/EditQuestion.vue')
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about" */ './views/About.vue')
    },
    {
      path: "/login",
      name: "login",
      component: () => import(/* webpackChunkName: "login" */ './views/ViewLogin.vue')
    },
    {
      path: "/register",
      name: "register",
      component: () => import(/* webpackChunkName: "register" */ './views/ViewRegister.vue')
    }
  ]
})
