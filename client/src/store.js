import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    listQuestion: [],
    myQuestion: [],
  },
  mutations: {
    setQuestion(state, payload) {
      state.listQuestion = payload;
    },
    setMyQuestion(state, payload) {
      state.myQuestion = payload;
    },
  },
  actions: {
    loadQuestion(context) {
      axios.get('http://localhost:3000/questions')
        .then(({ data }) => {
          context.commit('setQuestion', data);
        });
    },
    loadMyQuestion(context) {
      axios.get('http://localhost:3000/questions/user', {
        headers: {
          token: localStorage.token
        }
      })
        .then(({ data }) => {
          context.commit('setMyQuestion', data);
        });
    },
  },
});
