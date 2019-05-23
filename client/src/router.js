import Vue from 'vue'
import Router from 'vue-router'

import IndexPage from './views/IndexPage.vue'
import LoginPage from './views/LoginPage.vue'

import QuestionPage from './views/QuestionPage.vue'
import QuestionList from './components/QuestionList.vue'
import QuestionCreate from './components/QuestionCreate.vue'
import QuestionEdit from './components/QuestionEdit.vue'
import QuestionDetail from './components/QuestionDetail.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'index',
      component: IndexPage
    },
    {
      path: '/login',
      name: 'login',
      component: LoginPage
    },
    {
      path: '/questions',
      component: QuestionPage,
      children: [
        {
          path: '',
          name: 'questions',
          component: QuestionList
        },
        {
          path: 'new',
          name: 'question-new',
          component: QuestionCreate
        },
        {
          path: ':question_id/edit',
          name: 'question-edit',
          component: QuestionEdit
        },
        {
          path: ':question_id',
          name: 'question-detail',
          component: QuestionDetail
        }
      ]
    }
  ]
})
