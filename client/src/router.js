import Vue from "vue";
import Router from "vue-router";
import Login from "./views/Login.vue";

Vue.use(Router);

export default new Router({
  routes: [{
      path: "/",
      name: "home",
      children: 
      [
        {
        path: "tags",
        name: "tags",
        component: () => import( /* webpackChunkName: "tags" */ "./views/Tags.vue")
      },
      {
        path: "topquestions",
        name: "topquestions",
        component: () => import( /* webpackChunkName: "topquestions" */ "./views/TopQuestions.vue")
      }
    ],
      component: () => import( /* webpackChunkName: "home" */ "./views/Home.vue")
    },
    {
      path: "/login",
      name: "login",
      component: Login
    },
    {
      path: "/register",
      name: "register",
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () =>
        import( /* webpackChunkName: "about" */ "./views/Register.vue")
    },
    {
      path: "/question",
      name: "question",
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () =>
        import( /* webpackChunkName: "about" */ "./views/Question.vue")
    },
    {
      path: "/addquestion",
      name: "addquestion",
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () =>
        import( /* webpackChunkName: "about" */ "./views/AddQuestion.vue")
    },
    {
      path: "/updatequestion/:id",
      name: "updatequestion",
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () =>
        import( /* webpackChunkName: "about" */ "./views/UpdateQuestion.vue")
    },
    {
      path: "/addanswer/:questionId",
      name: "addanswer",
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () =>
        import( /* webpackChunkName: "about" */ "./views/AddAnswer.vue")
    },
    {
      path: "/updateanswer/:id",
      name: "updateanswer",
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () =>
        import( /* webpackChunkName: "about" */ "./views/UpdateAnswer.vue")
    },
    {
      path: "/search",
      name: "search",
      component: () => import(/* webpackChunkName: "search"*/ "./views/Search.vue"),
    },
    {
      path: "/tagged",
      name: "tagged",
      component: () =>
        import(/* webpackChunkName: "tagged"*/ "./views/Tagged.vue")
    },
  ]
});