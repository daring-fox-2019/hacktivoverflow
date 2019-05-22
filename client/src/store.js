import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    listQuestion: [],
    displayQuestion: [],
    myQuestion: [],
    isSearch: false,
    searchTag: '',
  },
  mutations: {
    setQuestion(state, payload) {
      state.listQuestion = payload;
      state.displayQuestion = payload
    },
    setMyQuestion(state, payload) {
      state.myQuestion = payload;
    },
    setResultSearch(state, payload) {
      state.displayQuestion = payload;
      state.isSearch = true
    },
    setSearchTag(state, payload){
      state.searchTag = payload
    },
    setIsSearch(state, payload){
      state.isSearch = payload
    }
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
    searchTag(context, payload) {
      // this.displayQuestion = this.listQuestion.filter(element => {
      //   if (element.tags === payload) {
      //     return element
      //   }
      // })
      let data = {
        datas : {
          tags : payload
        }
      }
      axios.post('http://localhost:3000/questions/search', data, {
        headers: {
          token: localStorage.token
        }
      })
        .then(({ data }) => {
          context.commit('setResultSearch', data);
          context.commit('setSearchTag', payload);
        });
    },
  },
});
