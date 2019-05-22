import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/asking',
      name: 'asking',
      component: () => import(/* webpackChunkName: "about" */ './views/Asking.vue'),
    },
    {
      path: '/register',
      name: 'register',
      component: () => import(/* webpackChunkName: "about" */ './views/Register.vue'),
    },
    {
      path: '/login',
      name: 'login',
      component: () => import(/* webpackChunkName: "about" */ './views/Login.vue'),
    },
    {
      path: '/',
      name: 'Home',
      component: () => import(/* webpackChunkName: "about" */ './views/Home.vue'),
    },
    {
      path: '/questions/:id',
      name: 'question',
      component: () => import(/* webpackChunkName: "about" */ './views/Question.vue'),
    },
    ,
    {
      path: '/questions/:id/edit',
      name: 'questionedit',
      component: () => import(/* webpackChunkName: "about" */ './views/QuestionEdit.vue'),
    },
    {
      path: '/answers/:id/edit',
      name: 'answerEdit',
      component: () => import(/* webpackChunkName: "about" */ './views/AnswerEdit.vue'),
    },
  ]
})
