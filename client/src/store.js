import Vue from 'vue'
import Vuex from 'vuex'
import router from './router'
import server from './main';
import VueSwal from 'vue-swal'

Vue.use(Vuex)
Vue.use(VueSwal)

export default new Vuex.Store({
  state: {
    isLoggedIn: false,
    allQuestions: [],
    myQuestions: [],
    myAnswers: [],
  },
  mutations: {
    verify(state, payload) {
      state.isLoggedIn = true
    },
    login(state, payload) {
      state.isLoggedIn = true
    },
    logout(state, payload) {
      state.isLoggedIn = false
    },
    getQuestions(state, payload) {
      state.allQuestions = payload
    },
    getUserQuestions(state, payload) {
      state.myQuestions = payload
    },
    getUserAnswers(state, payload) {
      state.myAnswers = payload
    },
  },
  actions: {
    verify({ commit }) {
      commit('verify')
    },
    login({ commit, dispatch }, payload) {
      const { email, password } = payload
      server
        .post(`/users/signIn`, {
          email,
          password
        })
        .then(({ data }) => {
          const { token, details } = data;
          const { email, id } = details;
          localStorage.setItem("token", token);
          localStorage.setItem("email", email);
          localStorage.setItem("UserId", id);
          commit("login");
          dispatch('getQuestions')
          dispatch('getUserQuestions')
          dispatch('getUserAnswers')
          swal(data.message, "Welcome back!", "success");
          router.replace("/dashboard");
        })
        .catch(err => {
          console.log(err)
          const { message } = err.response.data;
          swal("Error!", message, "error");
        });
    },
    getQuestions({ commit }) {
      let token = localStorage.getItem('token')
      server
        .get('/questions', { headers: { token } })
        .then(({ data }) => {
          commit('getQuestions', data)
        })
        .catch((err) => {
          console.log(err)
        })
    },
    createQuestion({ commit, dispatch }) {
      dispatch('getQuestions')
      dispatch('getUserQuestions')
    },
    getUserQuestions({ commit }) {
      let token = localStorage.getItem('token')
      server
        .get('/questions/myQuestions', { headers: { token } })
        .then(({ data }) => {
          commit('getUserQuestions', data)
        })
        .catch((err) => {
          console.log(err)
        })
    },
    getUserAnswers({ commit }) {
      let token = localStorage.getItem('token')
      server
        .get('/answers/myAnswers', { headers: { token } })
        .then(({ data }) => {
          commit('getUserAnswers', data)
        })
        .catch((err) => {
          console.log(err)
        })
    }
  }
})
