import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import(/* webpackChunkName: "home" */ './views/Home.vue'),
    },
    {
      path: '/login',
      name: 'login',
      component: () => import(/* webpackChunkName: "login" */ './views/Login.vue'),
    },
    {
      path: '/register',
      name: 'register',
      component: () => import(/* webpackChunkName: "register" */ './views/Register.vue'),
    },
    {
      path: '/question/ask',
      name: 'questionask',
      component: () => import(/* webpackChunkName: "questionform" */ './views/QuestionForm.vue'),
    },
    {
      path: '/question/:id',
      name: 'questiondetail',
      component: () => import(/* webpackChunkName: "questiondetail" */ './views/QuestionDetail.vue'),
    },
  ],
});
