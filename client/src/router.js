import Vue from 'vue';
import Router from 'vue-router';
// import Home from './views/Home.vue';

Vue.use(Router);

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import(/* webpackChunkName: "about" */ './views/Home.vue'),
    },
    {
      path: '/profile/:id',
      name: 'profileId',
      component: () => import(/* webpackChunkName: "about" */ './views/Profile.vue'),
    },
    {
      path: '/profile',
      name: 'profile',
      component: () => import(/* webpackChunkName: "about" */ './views/Profile.vue'),
    },
    {
      path: '/search',
      name: 'search',
      component: () => import(/* webpackChunkName: "about" */ './views/Search.vue'),
    },
    {
      path: '/question/:id',
      name: 'question',
      component: () => import(/* webpackChunkName: "about" */ './views/ViewQuestion.vue'),
    },
    {
      path: '/newquestion',
      name: 'newquestion',
      component: () => import(/* webpackChunkName: "about" */ './views/NewQuestion.vue'),
    },
    {
      path: '/auth',
      name: 'auth',
      component: () => import(/* webpackChunkName: "about" */ './views/Auth.vue'),
    },
    {
      path: '*',
      name: 'notfound',
      component: () => import(/* webpackChunkName: "about" */ './views/NotFound.vue'),
    },
  ],
});
