// component: () => import(/* webpackChunkName: "about" */ './views/About.vue'),
import Vue from 'vue';
import Router from 'vue-router';
import Home from './views/Home.vue';
import Question from './views/Question.vue';
import AskQuestion from './views/AskQuestion.vue';
import MyProfile from './views/MyProfile.vue';
import EditAnswer from './views/EditAnswer.vue';

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
      path: '/question/:id',
      name: 'question',
      component: Question,
    },
    {
      path: '/askQuestion',
      name: 'askQuestion',
      component: AskQuestion,
      children: [
        {
          path: ':id',
          component: AskQuestion,
        },
      ],
    },
    {
      path: '/myProfile',
      name: 'myProfile',
      component: MyProfile,
    },
    {
      path: '/editAnswer/:id',
      name: 'editAnswer',
      component: EditAnswer,
    },
  ],
});
