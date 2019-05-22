import Vue from "vue";
import Router from "vue-router";
import Home from "./views/Home.vue";
import Preview from "./views/Preview.vue"
import NewQuestion from "./views/NewQuestion.vue"
import EditQuestion from "./views/EditQuestion.vue"
import EditAnswer from "./views/EditAnswer.vue"

Vue.use(Router);

export default new Router({
  mode: 'history',
  routes: [{
      path: "/",
      name: "home",
      component: Home
    },
    {
      path: "/about",
      name: "about",
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () =>
        import( /* webpackChunkName: "about" */ "./views/About.vue")
    },
    {
      path: "/questions/new",
      name: "new question",
      component: NewQuestion
    },
    {
      path: "/questions/:questionId",
      name: "question",
      component: Preview
    },
    {
      path: "/questions/:questionId/edit",
      name: "edit question",
      component: EditQuestion
    },
    {
      path: "/questions/:questionId/answers/:answerId/edit",
      name: "edit question",
      component: EditAnswer
    }
  ]
});