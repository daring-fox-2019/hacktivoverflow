import Vue from 'vue';
import Vuex from 'vuex';
import myServer from '@/api/myServer';

if (localStorage.token) {
  myServer.defaults.headers.common.token = localStorage.token;
  console.log('ada token kok!');
}

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    allQuestions: [],
    isLogin: false,
    user: {},
    currentQuestion: {},
  },
  mutations: {
    getQuestion(state, question) {
      state.currentQuestion = question;
    },

    getAllQuestions(state, questions) {
      state.allQuestions = questions;
    },

    submitLogin(state, user) {
      if (!localStorage.token) localStorage.token = user.token;
      state.isLogin = true;
      console.log(user);
      

      state.user = {
        _id: user._id,
        username: user.username,
        email: user.email
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
          console.log(data);

          context.commit('submitLogin', data);
        })
        .catch((err) => {
          console.log(err);
        });
    },

    stayLogin(context) {
      console.log('masuk stay login');
      console.log(myServer.defaults.headers.common.token);

      myServer
        .post('/user/token')
        .then(({ data }) => {
          console.log('ini data');

          console.log(data);
          console.log('ini data');
          context.commit('submitLogin', data);
        })
        .catch((err) => {
          console.log(err);
        });
    },

    submitRegister(context, form) {
      myServer
        .post('/user/register', form)
        .then(({ data }) => {
          console.log(data);
          console.log('yeay berhasil register');
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

  },
});
