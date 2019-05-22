import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import login from './views/login.vue'
import register from './views/register.vue'
import formQuestion from './views/formQuestion.vue'
import profile from './views/profile.vue'
import editQuestion from './views/editQuestion.vue'
import formAnswer from './views/formAnswer.vue'
import questionAndAnswer from './views/questionAndAnswer'

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
      path: '/login',
      name: 'login',
      component: login
    },
    {
      path: '/register',
      name: 'register',
      component: register
    },
    {
      path: '/addQuestion',
      name: 'addQuestion',
      component : formQuestion
    },
    {
      path : '/profile',
      name : 'profile',
      component : profile
    },
    {
      path : '/editQuestion/:questionid',
      name : 'editQuestion',
      component : editQuestion
    },
    {
      path : '/addAnswer/:questionid',
      name: 'addAnswer',
      component : formAnswer
    },
    {
      path : '/questionDetail/:questionid',
      name: 'questionDetail',
      component: questionAndAnswer
    }
  ]
})
