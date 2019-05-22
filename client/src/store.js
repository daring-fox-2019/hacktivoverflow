import Vue from 'vue'
import Vuex from 'vuex'
import myaxios from '@/api/axios'
import Swal from 'sweetalert2'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    isLogin: false,
    loginUser: {},
    questions: []
  },
  getters: {
    loginUserId: state => {
      return state.loginUser._id
    },
    isLogin: state => {
      return state.isLogin
    },
    loginUser: state => {
      return state.loginUser
    }
  },
  mutations: {
    setLogin (state, payload) {
      state.isLogin = payload
    },
    setUser (state, payload) {
      state.loginUser = payload
    },
    setQuestions(state,payload){
      state.questions = payload
    },
    addNewQuestion(state, payload){
      state.questions.push(payload);
    },
    deleteQuestion(state, payload) {
      state.questions = state.questions.filter(
        e => {
          if(e._id !== payload._id) {
              return e;
          }
        }
      )
    }
  },
  actions: {
    getQuestion(context){
      myaxios
      .get('/questions')
      .then(({ data }) => {
        context.commit('setQuestions', data)
      })
      .catch(error => {
        console.log(error);
      })
    },
    // buat state baca userlogged tiap refresh
    setLoggedInUser(context) {
      myaxios.defaults.headers.common['token'] = localStorage.token

      myaxios
      .get('/users/userLoggedIn')
      .then(({ data }) => {
        context.commit('setUser', data)
      })
      .catch(error => {
        console.log(error);
      })
    },

    addNewQuestion(context, payload) {
      myaxios.defaults.headers.common['token'] = localStorage.token

      myaxios
      .post('questions/ask', payload)
      .then(({data}) => {
        context.commit('addNewQuestion', data)
      })
      .catch(err => {
          console.log(err);
      })
    },

    deleteQuestion(context, payload) {
      myaxios
      .delete(`/questions/${payload}`)
      .then(({data}) => {
          Swal.fire(
              'Deleted!',
              'Your question has been deleted.',
              'success'
          )
          context.commit('deleteQuestion', data)
      })
      .catch(err => {
          console.log(err);
      })
    }
  }
})
