import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import Dashboard from './views/Dashboard.vue'
import AskQuestion from './views/AskQuestion.vue'
import QuestionDetail from './views/QuestionDetail.vue'
import QuestionsPage from './views/QuestionsPage'
import EditAnswer from './views/EditAnswer'
import QuestionsTag from './views/QuestionsTag'
import sanbox from './views/sanbox'
import Taglist from './views/Taglist'
import Buzz from './views/Buzz'
Vue.use(Router)

const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'QuestionsPageLanding',
      component: QuestionsPage
    },
    {
      path: '/dashboard',
      name: 'dashboard',
      component: Dashboard,
      meta : {
        requiresAuth : true
      }
    },
    {
      path:'/ask',
      name : "ask",
      component : AskQuestion,
      meta : {
        requiresAuth : true
      }
    },
    {
      path:'/buzz',
      name : "buzz",
      component : Buzz
    },
    {
      path:'/questions',
      name : "question",
      component : QuestionsPage,
      meta : {
        requiresAuth : true
      }
    },

      {
        path:'/questions/:id',
        name : "question-detail",
        component : QuestionDetail,
        meta : {
          requiresAuth : true
        }
      },
      // children : [{
      //   path: ':id',
      //   name: 'question-detail',
      //   component: 
      //     QuestionDetail
      // }]
    // },
    {
      path:'/tags',
      name : "tag",
      component : Taglist,
    },
    {
      path:'/questions/tag/:tag',
      name : "question-tag",
      component : QuestionsTag,
      meta : {
        requiresAuth : true
      }
    },
    {
      path : '/edit-question/:id',
      name : 'edit-question',
      component : AskQuestion,
      meta : {
        requiresAuth : true
      }
    },
    {
      path : '/edit-answer/:id',
      name : 'edit-answer',
      component : EditAnswer,
      meta : {
        requiresAuth : true
      }
    },
    {
      path : '/sanbox',
      name : 'sanbox',
      component : sanbox,
    }
  ]
})


router.beforeEach((to, from, next) => {
  // console.log(to, '=====to=======from', from);
  if (to.matched.some(record => record.meta.requiresAuth)) {
    // console.log('masuk if atass');
    if (!localStorage.getItem('token')) {
      next({ path: '/' })
    } else {
      if (to.matched.some(record => record.meta.is_admin)) {
        if (localStorage.getItem('role') == 'admin') {
          next()
        } else {
          next({path: '/'})
        }
      } else {
        next()
      }
    }
  } else {
    next()
  }
})

export default router
