import Vue from 'vue'
import Vuex from 'vuex'
import axios from '@/database/axios'
import {
  stat
} from 'fs';

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    isLogin: false,
    allQuestions: []
  },
  mutations: {
    setIsLogin(state, data) {
      state.isLogin = data
    },
    setAllQuestion(state, data) {
      state.allQuestions = data
    },
    deleteQuestion( state , data){
      state.allQuestions = state.allQuestions.filter( el => {
        return el._id != data._id
      })
    },
    editQuestion( state , data){
      state.allQuestions = state.allQuestions.map( el => {
        if(el._id == data._id){
          return  data
        } else {
          return el
        }
      })
    }
  },
  actions: {
    getUserQuestions(context, search) {
      axios
        .get(`/questions/user`, {
          headers: {
            token: localStorage.getItem("token")
          },
          params : { search }
        })
        .then(({ data }) => {
          context.commit('setAllQuestion', data)
        })
        .catch(err => {
          console.log(err.response.data.message)
        });
    },
    getAllQuestions(context, search) {
      axios
        .get(`/questions`, {
          headers: {
            token: localStorage.getItem("token")
          },
          params : { search }
        })
        .then(({ data }) => {
          context.commit('setAllQuestion', data)
        })
        .catch(err => {
          console.log(err.response.data.message)
        });
    },
    searchByTag(context, tag) {
      axios.get('/questions', {
          headers: {
            token: localStorage.getItem("token"),
          },
          params: { tag:tag }
        })
        .then(({ data }) => {
          
          context.commit('setAllQuestion', data)
        })
        .catch(err => {
          console.log(err)
        })
    }
  },
})
