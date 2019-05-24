import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    serverAddress: "http://104.155.210.171:3000/",
    userEmail: "",
    userId: "",
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
