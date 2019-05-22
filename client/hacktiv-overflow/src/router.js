import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'

Vue.use(Router)

let router =  new Router({
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
      component: () => import(/* webpackChunkName: "login" */ './views/Login.vue')
    },
    {
      path: '/question/:id',
      name: 'question',
      component: () => import(/* webpackChunkName: "question-answer" */ './views/QuestionAnswer.vue'),
      children: [
        {
          path: ':answer_id',
          name: 'answer',
          meta: { requiresAuth: true },
          component: () => import(/* webpackChunkName: "edit-answer" */ './components/EditAnswer.vue')
        },
      ]
    },
    {
      path: '/register',
      name: 'register',
      component: () => import(/* webpackChunkName: "register" */ './views/Register.vue')
    },
    {
      path: '/add-question',
      name: 'add-question',
      meta: { requiresAuth: true },
      component: () => import(/* webpackChunkName: "add-question" */ './views/AddQuestion.vue')
    },
    {
      path: '/edit-question/:id',
      name: 'edit-question',
      meta: { requiresAuth: true },
      component: () => import(/* webpackChunkName: "edit-question" */ './views/AddQuestion.vue')
    },
    {
      path: '/my-question',
      name: 'my-question',
      meta: { requiresAuth: true },
      component: () => import(/* webpackChunkName: "my-question" */ './views/MyQuestion.vue')
    }
  ]
})

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (localStorage.getItem('token') == null) {
      next({ path: '/login', });
    } else {
      next();
    }
  } else {
    next();
  }
});

export default router