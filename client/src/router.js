import Vue from 'vue';
import Router from 'vue-router';
import Home from './views/Home.vue';
import AddEditQuestion from './views/AddEditQuestion.vue';
import DetailQuestion from './views/DetailQuestion.vue';
import MyQuestion from './views/MyQuestion.vue';

Vue.use(Router);

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
    }, {
      path: '/addQuestion',
      name: 'addQuestion',
      component: AddEditQuestion,
    }, {
      path: '/editQuestion/:id',
      name: 'editQuestion',
      component: AddEditQuestion,
    }, {
      path: '/questions/:id',
      name: 'detailQuestion',
      component: DetailQuestion,
    }, {
      path: '/myQuestion',
      name: 'myQuestion',
      component: MyQuestion,
    },
  ],
});
