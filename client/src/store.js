import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    serverAddress: "http://localhost:3000/",
    loggedIn: false,
    zone: 0,
    showForm: 0,
    questions: [],
    selectedQuestion: null,
    answers: [],
  },
  mutations: {

  },
  actions: {

  }
})
