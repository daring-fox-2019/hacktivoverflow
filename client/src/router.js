import Vue from 'vue';
import Router from 'vue-router';
import Home from './views/Home.vue';

Vue.use(Router);

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
    },
    {
      path: '/register',
      name: 'register',
      component: () => import('./views/Register.vue'),
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('./views/Login.vue'),
    },
    {
      path: '/questions',
      component: () => import('./views/Questions.vue'),
      children: [
        {
          path: '/',
          name: 'questionIndex',
          component: () => import('./views/QuestionHome.vue'),

        },
        {
          path: 'ask',
          name: 'AskQuestion',
          component: () => import('./components/AskQuestion.vue'),

        },
        {
          path: ':id',
          name: 'questionDetails',
          component: () => import('./views/QuestionDetailsView.vue'),

        },
      ],
    },
    {
      path: '/tags',
      name: 'tagsHome',
      component: () => import('./views/Tags.vue'),
    },
  ],
});
