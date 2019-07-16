import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import Login from './components/Login.vue'
import Register from './components/Register.vue'
import QuestionPage from './views/QuestionPage.vue'

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
      path:'/login',
      name: 'login',
      component: Login
    },
    {
      path: '/register',
      name: 'register',
      component: Register
    },
    {
      path: '/questions/:id',
      name: 'question page',
      component: QuestionPage
    },
    {
      path: '/questions',
      name: 'new question',
      component: () => import(/* webpackChunkName: 'AddQuestion'*/ './views/AddQuestion.vue')
    },
    {
      path: '/myQuestions',
      name: 'my questions',
      component: ()=> import(/* webpackChunkname: 'MyQuestion'*/ './views/MyQuestions.vue')
    }
  ]
})
