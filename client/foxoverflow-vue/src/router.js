import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import Login from "./views/Login.vue"
import Register from "./views/Register.vue"
import AddQuestion from "./views/AddQuestion.vue"

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
      path: '/browse',
      name: 'browse',
      component: Home
    },
    {
      path: '/tags',
      name: 'tags',
      component: Home
    },
    {
      path: '/users',
      name: 'users',
      component: Home
    },
    {
      path: "/questions/add",
      name: "add question",
      component: AddQuestion
    },
    {
      path: "/questions/:id",
      name: "question",
      component: AddQuestion
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
      component: Login
    },
    {
      path: "/register",
      name: "register",
      component: Register
    }
  ]
})
