import Vue from 'vue'
import Vuex from 'vuex'
import backend from './api/backend'
import { stat } from 'fs';

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    isLogin : false,
    userLogin : null,
    questions : [],
    newPost : null
  },
  mutations: {
    makeNewPost(state, payload){
      console.log(payload);
      state.newPost = payload
    },
    successLogin(state){
      state.isLogin = true
      state.userLogin = localStorage.getItem('userLogin')
    },
    userLogout(state){
      state.isLogin = false
    },
    getQuestions(state,payload){
      state.questions = payload
      console.log(`berada di payload`);
    }

  },
  actions: {
    createQuestion({commit}, payload) {
      return backend
        .post('/questions', payload, 
        {
          headers: {
            token: localStorage.getItem('token')
          }
        }
        )
        .then(({data}) => {
          Swal.fire({
            position: 'center',
            type: 'success',
            title: 'Successfully Posted',
            showConfirmButton: false,
            timer: 1500
          })
          commit('makeNewPost', data)
        })
        .catch(err => {
          Swal.fire({
            position: 'center',
            type: 'error',
            title: err.response.data.message,
            showConfirmButton: false,
            timer: 1500
          })
          commit('makeNewPost', null)
        })
    },
    getAllQuestions({commit}, payload){
     if (payload) {
        backend
          .get(`/questions?q=` + payload)
          .then(({data}) => {
            commit('getQuestions', data)
          })
          .catch(err => {
            console.log(err)
          })
      } else {
        backend
          .get('/questions')
          .then(({data}) => {
            commit('getQuestions', data)
          })
          .catch(err => {
            console.log(err)
          })
      }
    }
  }
})
