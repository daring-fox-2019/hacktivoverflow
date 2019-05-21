import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    listQuestion: [],
  },
  mutations: {
    setQuestion(state, payload) {
      state.listQuestion = payload;
    },
  },
  actions: {
    loadQuestion(context) {
      axios.get('http://localhost:3000/questions')
        .then(({ data }) => {
          context.commit('setQuestion', data);
        });
    },
  },
});
