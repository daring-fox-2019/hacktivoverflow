/* eslint-disable no-underscore-dangle */
/* eslint-disable no-param-reassign */
import Vue from 'vue';
import Vuex from 'vuex';
import backend from './api/http';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    isLogin: false,
    loading: false,
    user: {},
    questions: null,
    question: null,
    updateQuestion: null,
    error: '',
    tags: null,
  },
  mutations: {
    setLoading(s, p) {
      s.loading = p;
    },
    setTags(state, payload) {
      state.tags = payload;
    },
    setError(state, payload) {
      state.error = payload;
    },
    setIsLogin(state, payload) {
      state.isLogin = payload;
    },
    setQuestion(state, payload) {
      state.question = payload;
    },
    setUpdateQuestion(state, payload) {
      state.updateQuestion = payload;
    },
    setQuestions(state, payload) {
      state.questions = payload;
    },
    setUser(state, payload) {
      state.user = payload;
    },
  },
  actions: {
    editQuestion(context, question) {
      return backend
        .put(`/questions/${question._id}`, question, {
          headers: {
            Authorization: localStorage.getItem('hackflow_token'),
          },
        });
    },
    deleteQuestion(context, id) {
      return backend
        .delete(`/questions/${id}`, {
          headers: {
            Authorization: localStorage.getItem('hackflow_token'),
          },
        });
    },
    deleteAnswer(context, id) {
      backend
        .delete(`/answers/${id}`, {
          headers: {
            Authorization: localStorage.getItem('hackflow_token'),
          },
        })
        .then(({
          data,
        }) => {
          console.log('updated question...', data);
          context.dispatch('getQuestions');
        })
        .catch((err) => {
          console.log('error delete question');
          context.commit('setError', err.response);
        });
    },
    upVoteQuestion(context, id) {
      backend
        .get(`/questions/${id}/upvote`, {
          headers: {
            Authorization: localStorage.getItem('hackflow_token'),
          },
        })
        .then(({
          data,
        }) => {
          console.log('upvoted...', data);
          context.dispatch('getQuestionDetail', data._id);
        })
        .catch((err) => {
          console.log('error upvote');
          context.commit('setError', err);
        });
    },
    downVoteQuestion(context, id) {
      backend
        .get(`/questions/${id}/downvote`, {
          headers: {
            Authorization: localStorage.getItem('hackflow_token'),
          },
        })
        .then(({
          data,
        }) => {
          console.log('downvoted...', data);
          context.dispatch('getQuestionDetail', data._id);
        })
        .catch((err) => {
          console.log('error downvote');
          context.commit('setError', err.response);
        });
    },
    upVoteAnswer(context, id) {
      backend
        .get(`/answers/${id}/upvote`, {
          headers: {
            Authorization: localStorage.getItem('hackflow_token'),
          },
        })
        .then(({
          data,
        }) => {
          console.log('upvoted answer...', data);
          context.dispatch('getQuestionDetail', context.state.question._id);
        })
        .catch((err) => {
          console.log('error upvote');
          context.commit('setError', err);
        });
    },
    downVoteAnswer(context, id) {
      backend
        .get(`/answers/${id}/downvote`, {
          headers: {
            Authorization: localStorage.getItem('hackflow_token'),
          },
        })
        .then(({
          data,
        }) => {
          console.log('downvoted answer...', data);
          context.dispatch('getQuestionDetail', context.state.question._id);
        })
        .catch((err) => {
          console.log('error downvote');
          context.commit('setError', err);
        });
    },
    getUser(context) {
      backend
        .get('/auth/user', {
          headers: {
            Authorization: localStorage.getItem('hackflow_token'),
          },
        })
        .then(({
          data,
        }) => {
          console.log(data);
          context.commit('setUser', data);
        })
        .catch((err) => {
          console.log(err);
        });
    },
    getQuestions(context) {
      backend
        .get('/questions')
        .then(({
          data,
        }) => {
          context.commit('setQuestions', data);
        })
        .catch((err) => {
          console.log(err);
        });
    },
    getQuestionDetail(context, id) {
      backend
        // eslint-disable-next-line prefer-template
        .get('/questions/' + id)
        .then(({
          data,
        }) => {
          context.commit('setQuestion', data);
        })
        .catch((err) => {
          console.log(err);
        });
    },
    getTags(context) {
      return backend.get(`${process.env.VUE_APP_SERVER_URL}/tags`)
        .then(({ data }) => {
          context.commit('setTags', data);
        })
        .catch((err) => {
          if (err.response) {
            err = err.response.data;
          }
          console.log(err)
        });
    },
  },
});
