import Vue from 'vue';
import Router from 'vue-router';
import Home from './views/Home.vue';
import AddEditQuestion from './views/AddEditQuestion.vue';
import DetailQuestion from './views/DetailQuestion.vue';
import MyQuestion from './views/MyQuestion.vue';
import Signin from './views/Signin.vue';
import Signup from './views/Signup.vue';
import ListTags from './views/ListTags.vue';
import ListQuestion from './views/ListQuestion.vue';

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
      path: '/signin',
      name: 'signin',
      component: Signin,
    }, {
      path: '/signup',
      name: 'signup',
      component: Signup,
    }, {
      path: '/addQuestion',
      name: 'addQuestion',
      component: AddEditQuestion,
    }, {
      path: '/listQuestion',
      name: 'listQuestion',
      component: ListQuestion,
    }, {
      path: '/tags',
      name: 'tags',
      component: ListTags,
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
