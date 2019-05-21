import Vue from 'vue';
import Vuex from 'vuex';
import myServer from '@/api/myServer';
import Router from './router';

if (localStorage.token) myServer.defaults.headers.common.token = localStorage.token;

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    allQuestions: [],
    isLogin: false,
    user: {},
    currentQuestion: {},
  },
  mutations: {
    createQuestion(state, question) {
      state.allQuestions.push(question);
      Router.push('/');
    },

    getQuestion(state, question) {
      state.currentQuestion = question;
    },

    getAllQuestions(state, questions) {
      state.allQuestions = questions;
    },

    deleteQuestion(state, question) {
      state.allQuestions = state.allQuestions.filter(el => el._id !== question._id);
      Router.push('/');
    },

    submitLogin(state, user) {
      if (!localStorage.token) localStorage.token = user.token;
      state.isLogin = true;
      state.user = {
        _id: user._id,
        username: user.username,
        email: user.email,
      };
    },

    logout(state) {
      localStorage.clear();
      state.isLogin = false;
      state.user = {};
    },

  },
  actions: {
    getAllQuestions(context) {
      myServer
        .get('/question')
        .then(({ data }) => {
          context.commit('getAllQuestions', data);
        })
        .catch((err) => {
          console.log(err);
        });
    },

    submitLogin(context, form) {
      myServer
        .post('/user/login', form)
        .then(({ data }) => {
          context.commit('submitLogin', data);
        })
        .catch((err) => {
          console.log(err);
        });
    },

    stayLogin(context) {
      myServer
        .post('/user/token')
        .then(({ data }) => {
          context.commit('submitLogin', data);
        })
        .catch((err) => {
          console.log(err);
        });
    },

    submitRegister(context, form) {
      myServer
        .post('/user/register', form)
        .then(({ data }) => {})
        .catch((err) => {
          console.log(err);
        });
    },

    createQuestion(context, form) {
      myServer
        .post('/question', form)
        .then(({ data }) => {
          context.commit('createQuestion', data);
        })
        .catch((err) => {
          console.log(err);
        });
    },

    getQuestion(context, id) {
      myServer
        .get(`/question/${id}`)
        .then(({ data }) => {
          context.commit('getQuestion', data);
        })
        .catch((err) => {
          console.log(err);
        });
    },

    deleteQuestion(context, id) {
      myServer
        .delete(`/question/${id}`)
        .then(({ data }) => {
          context.commit('deleteQuestion', data);
        })
        .catch((err) => {
          console.log(err);
        });
    },

  },
});
