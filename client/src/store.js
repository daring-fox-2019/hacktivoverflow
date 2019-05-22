/* eslint-disable */
import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    isLoggedIn: false,
    isLoading: true,
    loggedUser: {
      name: '',
      email: '',
      id: ''
    }
  },
  mutations: {
    checkLog(state, payload) {
      if(localStorage.token) {
        let { name, email, id } = localStorage
        state.loggedUser = {
          name, email, id
        }
        state.isLoggedIn = true
      } else {
        state.isLoggedIn = false
      }
    },
    login(state, payload) {
      let { name, email, id } = payload
      state.loggedUser = {
        name, email, id
      }
      state.isLoggedIn = true
    },
    logout(state, payload) {
      state.loggedUser = {
        name: '',
        email: '',
        id: ''
      }
      state.isLoggedIn = false
    }
  },
  actions: {
    login(context, payload) {
     console.log({payload, dari: 'login actions'})
     context.commit('login', payload)
    },
    logout(context, payload) {
      context.commit('logout', payload)
    }
  }
})
