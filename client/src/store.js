import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    islogin: false,
    listQuestion: [],
    displayQuestion: [],
    myQuestion: [],
    isSearch: false,
    searchTag: '',
  },
  mutations: {
    setLogin(state, payload) {
      state.islogin = payload;
    },
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
    setSearchTag(state, payload) {
      state.searchTag = payload
    },
    setIsSearch(state, payload) {
      state.isSearch = payload
    },
    searchTag(state, payload) {
      state.displayQuestion = state.listQuestion.filter(element => {
        console.log(element);
        if (element.tags.includes(payload)) {
          return element
        }
      })
      state.isSearch = payload
    }
  },
  actions: {
    loadQuestion(context) {
      axios.get('http://35.198.235.228/questions')
        .then(({ data }) => {
          context.commit('setQuestion', data);
        });
    },
    loadMyQuestion(context) {
      axios.get('http://35.198.235.228/questions/user', {
        headers: {
          token: localStorage.token
        }
      })
        .then(({ data }) => {
          context.commit('setMyQuestion', data);
        });
    },
    searchTag(context, payload) {
      this.displayQuestion = this.listQuestion.filter(element => {
        if (element.tags === payload) {
          return element
        }
      })
      // let data = {
      //   datas : {
      //     tags : payload
      //   }
      // }
      // axios.post('http://35.198.235.228/questions/search', data, {
      //   headers: {
      //     token: localStorage.token
      //   }
      // })
      //   .then(({ data }) => {
      //     context.commit('setResultSearch', data);
      //     context.commit('setSearchTag', payload);
      //   });
    },
  },
});
