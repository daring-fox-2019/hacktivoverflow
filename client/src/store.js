import Vue from 'vue';
import Vuex from 'vuex';
import myServer from '@/api/myServer';
import Router from './router';

myServer.defaults.headers.common.token = localStorage.token;

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    allQuestions: [],
    isLogin: false,
    user: {},
    currentQuestion: {},
    questionToEdit: null,
    answers: [],
  },
  mutations: {
    createQuestion(state, question) {
      state.allQuestions.push(question);
      Router.push('/');
    },

    getQuestion(state, question) {
      state.currentQuestion = question;
    },

    upvoteQuestion(state, question) {
      state.currentQuestion = question;
      for (let i = 0; i < state.allQuestions.length; i++) {
        if (state.allQuestions[i]._id == question._id) {
          state.allQuestions[i] = question;
        }
      }
    },

    downvoteQuestion(state, question) {
      state.currentQuestion = question;
      for (let i = 0; i < state.allQuestions.length; i++) {
        if (state.allQuestions[i]._id == question._id) {
          state.allQuestions[i] = question;
        }
      }
    },

    getAnswers(state, answers) {
      state.answers = answers;
    },

    createAnswer(state, answer) {
      state.answers.push(answer);
    },

    editAnswer(state, answer) {
      for (let i = 0; i < state.answers.length; i++) {
        if (state.answers[i]._id === answer._id) {
          state.answers[i] = answer;
        }
      }
    },

    deleteAnswer(state, answer) {
      state.answers = state.answers.filter(el => el._id !== answer._id);
    },

    upvoteAnswer(state, answer) {
      console.log('before');
      console.log(state.answers);
      for (let i = 0; i < state.answers.length; i++) {
        if (state.answers[i]._id === answer._id) {
          console.log('ada yg sama kok');
          state.answers[i] = answer;
        }
      }
      console.log('after');
      console.log(state.answers);
    },

    downvoteAnswer(state, answer) {
      console.log('before');
      console.log(state.answers);
      for (let i = 0; i < state.answers.length; i++) {
        if (state.answers[i]._id === answer._id) {
          console.log('ada yg sama kok');
          state.answers[i] = answer;
        }
      }
      console.log('after');
      console.log(state.answers);
    },

    editQuestion(state, question) {
      state.allQuestions = state.allQuestions.map((el) => {
        if (el._id === question._id) el = question;
      });
      Router.push('/');
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
      myServer.defaults.headers.common.token = localStorage.token;
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
        .then(({ data }) => { })
        .catch((err) => {
          console.log(err);
        });
    },

    createQuestion(context, form) {
      myServer.defaults.headers.common.token = localStorage.token;
      myServer
        .post('/question', form)
        .then(({ data }) => {
          context.commit('createQuestion', data);
        })
        .catch((err) => {
          console.log(err);
        });
    },

    editQuestion(context, [id, form]) {
      myServer
        .patch(`/question/${id}`, form)
        .then(({ data }) => {
          context.commit('editQuestion', data);
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

    getAnswers(context, questionId) {
      myServer
        .get(`/answer/allAnswer/${questionId}`)
        .then(({ data }) => {
          context.commit('getAnswers', data);
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

    createAnswer(context, [questionId, answer]) {
      myServer.defaults.headers.common.token = localStorage.token;

      myServer
        .post('/answer', { questionId, answer })
        .then(({ data }) => {
          context.commit('createAnswer', data);
        })
        .catch((err) => {
          console.log(err);
        });
    },

    editAnswer(context, [answerId, editedAnswer]) {
      myServer
        .patch(`/answer/${answerId}`, editedAnswer)
        .then(({ data }) => {
          context.commit('editAnswer', data);
        })
        .catch((err) => {
          console.log(err);
        });
    },

    deleteAnswer(context, answerId) {
      myServer
        .delete(`/answer/${answerId}`)
        .then(({ data }) => {
          context.commit('deleteAnswer', data);
        })
        .catch((err) => {
          console.log(err);
        });
    },

    upvoteQuestion(context) {
      myServer.defaults.headers.common.token = localStorage.token;
      myServer
        .patch(`/question/upvote/${this.state.currentQuestion._id}`, this.state.user._id)
        .then(({ data }) => {
          context.commit('upvoteQuestion', data);
        })
        .catch((err) => {
          console.log(err);
        });
    },

    downvoteQuestion(context) {
      myServer.defaults.headers.common.token = localStorage.token;
      myServer
        .patch(`/question/downvote/${this.state.currentQuestion._id}`, this.state.user._id)
        .then(({ data }) => {
          context.commit('downvoteQuestion', data);
        })
        .catch((err) => {
          console.log(err);
        });
    },

    upvoteAnswer(context, id) {
      myServer.defaults.headers.common.token = localStorage.token;
      myServer
        .patch(`/answer/upvote/${id}`, this.state.user._id)
        .then(({ data }) => {
          context.commit('upvoteAnswer', data);
        })
        .catch((err) => {
          console.log(err);
        });
    },

    downvoteAnswer(context, id) {
      myServer.defaults.headers.common.token = localStorage.token;
      myServer
        .patch(`/answer/downvote/${id}`, this.state.user._id)
        .then(({ data }) => {
          context.commit('downvoteAnswer', data);
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
});
