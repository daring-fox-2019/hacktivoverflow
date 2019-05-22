import Vue from 'vue';
import Vuex from 'vuex';
import axios from '@/axios'
import Swal from 'sweetalert2'
import router from '@/router';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    loggedIn: false,
    questions: [],
    queries: [],
    question: {}
  },
  mutations: {
    register(state, payload) {
      Swal.fire(
        'Registered!',
        'User Registered!',
        'success',
      );
    },
    login(state, payload) {
      Swal.fire(
        'Logged In!',
        'Successfully logged in!',
        'success',
      );
      localStorage.setItem('token', payload.token);
      localStorage.setItem('name', payload.name);
      state.loggedIn = true;
      router.push('/');
    },
    logout(state) {
      localStorage.removeItem('token');
      localStorage.removeItem('name');
      localStorage.removeItem('role');
      state.loggedIn = false;
      router.push('/auth');
    },
    getAllQuestions(state, payload) {
      state.questions = [...payload]
    },
    searchQuestions(state, payload) {
      state.queries = [...payload]
    },
    getQuestion(state,payload){
      state.question = {...payload}
    },
    createQuestion(state,payload){
      router.push(`/question/${payload._id}`)
    }
  },
  actions: {
    createQuestion(context, payload) {
      axios({
        method: "POST",
        url: '/questions/create',
        data: payload,
        headers: {
          token: localStorage.getItem('token'),
        }
      })
        .then(({ data }) => {
          context.dispatch('getQuestion',data._id)
          context.commit('createQuestion',data)
        })
        .catch((err) => {
          console.log(err);
        });
    },
    getQuestion(context, questionid) {
      axios({
        method: "GET",
        url: `/answers/read/${questionid}`,
        headers: {
          token: localStorage.getItem('token'),
        }
      })
        .then(({ data }) => {
          context.commit('getQuestion',data)
        })
        .catch((err) => {
          console.log(err);
        });
    },
    answerQuestion(context, payload) {
      axios({
        method: "POST",
        url: `/answers/create`,
        data: payload,
        headers: {
          token: localStorage.getItem('token'),
        }
      })
        .then(({ data }) => {
          context.dispatch('getAllQuestions')
        })
        .catch((err) => {
          console.log(err);
        });
    },
    getAllQuestions(context) {
      axios({
        method: "GET",
        url: '/questions/read',
      })
        .then(({ data }) => {
          context.commit('getAllQuestions', data)
        })
        .catch((err) => {
          console.log(err);
        });
    },
    searchQuestions(context, searchText) {
      let query = `?title=${searchText}`
      axios({
        method: 'GET',
        url: `/answers/search${query}`,
      })
        .then(({ data }) => {
          context.commit('searchQuestions', data);
        })
        .catch((err) => {
          console.log(err);
        });
    },
    createQuestion(context, payload) {
      axios({
        method: "POST",
        url: '/questions/create',
        data: payload,
        headers: {
          token: localStorage.getItem('token'),
        }
      })
        .then(({ data }) => {
          context.dispatch('getAllQuestions')
        })
        .catch((err) => {
          console.log(err);
        });
    },
    register(context, payload) {
      console.log('di action')
      axios({
        method: 'POST',
        url: '/users/register',
        data: payload,
      })
        .then(({ data }) => {
          context.commit('register', data);
        })
        .catch((err) => {
          console.log(err);
        });
    },
    login(context, payload) {
      axios({
        method: 'POST',
        url: '/users/login',
        data: payload,
      })
        .then(({ data }) => {
          context.commit('login', data);
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
});
