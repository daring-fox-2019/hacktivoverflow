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
      path: '/myQuestions',
      name: 'questions',
      component: () => import(/* webpackChunkName: "question" */ './views/Question.vue')
    },
    {
      path: '/myAnswers',
      name: 'answers',
      component: () => import(/* webpackChunkName: "answer " */ './views/Answer.vue')
    },
    {
      path: '/tags',
      name: 'tags',
      component: () => import(/* webpackChunkName: "tag" */ './views/Tag.vue')
    },
    {
      path: '/tagged/:tag',
      name: 'tagged',
      component: () => import(/* webpackChunkName: "tagged" */ './views/Tagged.vue')
    },
    {
      path: '/newQuestion',
      name: 'newQ',
      component: () => import(/* webpackChunkName: "newQ" */ './views/newQuestion.vue')
    },
    {
      path: '/question/:id',
      name: 'question',
      component: () => import(/* webpackChunkName: "question" */ './views/QuestionDetail.vue')
    },
    {
      path: '/register',
      name: 'register',
      component: () => import(/* webpackChunkName: "register" */ './views/Register.vue')
    },
    {
      path: '/about',
      name: 'about',
      component: () => import(/* webpackChunkName: "about" */ './views/About.vue')
    }
  ]
})
