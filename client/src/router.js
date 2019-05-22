import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  // base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/login',
      name: 'login',
      component: () => import(/* webpackChunkName: "about" */ './views/Login.vue')
    },
    {
      path: '/register',
      name: 'register',
      component: () => import(/* webpackChunkName: "about" */ './views/Register.vue')
    },
    {
      path: '/question/ask',
      name: 'ask-question',
      component: () => import(/* webpackChunkName: "about" */ './views/Question.vue')
    },
    {
      path: '/question/user',
      name: 'my-question',
      component: () => import(/* webpackChunkName: "about" */ './views/MyQuestion.vue')
    },
    {
      path: '/question/edit/:id',
      name: 'edit-question',
      component: () => import(/* webpackChunkName: "about" */ './views/QuestionEdit.vue')
    },
    {
      path: '/question/:id',
      name: 'detail-question',
      component: () => import(/* webpackChunkName: "about" */ './views/QuestionDetail.vue')
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about" */ './views/About.vue')
    }
  ]
})
