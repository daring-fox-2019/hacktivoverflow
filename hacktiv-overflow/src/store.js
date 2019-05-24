import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    isLogin: false
  },
  mutations: {
    isLogin (state) {
      state.isLogin = true
    },
    isLogout (state) {
      state.isLogin = false
      localStorage.clear()
    }

  },
  actions: {
    isLogin (context) {
      context.commit('isLogin')
    },
    isLogout (context) {
      context.commit('isLogout')
    }

  }
})
