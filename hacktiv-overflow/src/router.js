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
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about" */ './views/About.vue')
    },
    {
      path: '/login',
      name: 'login-page',
      component: () => import(/* webpackChunkName: "login-page" */ './views/LoginPage.vue')
    },
    {
      path: '/detail/:id',
      name: 'detail-page',
      component: () => import(/* webpackChunkName: "detail-page" */ './views/Detail.vue')
    },
    {
      path: '/register',
      name: 'register-page',
      component: () => import(/* webpackChunkName: "register-page" */ './views/RegisterPage.vue')
    }

  ]
})
