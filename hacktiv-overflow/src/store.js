import Vue from 'vue'
import Vuex from 'vuex'
import Axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    isLogin : false 
  },
  mutations: {
    isLogin(state){
      state.isLogin = true
    },

  },
  actions: {

  }
})
