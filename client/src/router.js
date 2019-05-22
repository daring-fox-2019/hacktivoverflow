import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import Register from './views/Register.vue'
import Login from './views/Login.vue'
import Dashboard from './views/Dashboard.vue'
import CreateQuestion from './views/CreateQuestion.vue'
import ViewQuestion from './views/ViewQuestion.vue'
import UserDashboard from './views/UserDashboard.vue'
import UserAnswers from './views/UserAnswers.vue'

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
      path: '/register',
      name: 'register',
      component: Register
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/dashboard',
      name: 'dashboard',
      component: Dashboard,
      children: [
        {
          path: 'view/:QuestionId',
          name: 'view',
          component: ViewQuestion
        }
      ],
    },
    {
      path: '/createQuestion',
      name: 'createQuestion',
      component: CreateQuestion,
    },
    {
      path: '/myDashboard',
      name: 'userDashboard',
      component: UserDashboard,
    },
    {
      path: '/myAnswers',
      name: 'userAnswers',
      component: UserAnswers,
    },
  ]
})
