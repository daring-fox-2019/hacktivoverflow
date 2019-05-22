import auth from '@/api/auth'

import types from '../mutation-types.js'

const state = {
  user: {},
  token: ''
}

const getters = {
  isLogin: (state) => !!state.token
}

const actions = {
  login: ({ commit }, payload) => {
    return auth
      .login(payload)
      .then(({ data }) => {
        commit(types.SET_AUTH, {
          user: data.user,
          token: data.jwtToken
        })
        localStorage.setItem('hacktivOverflow_auth', JSON.stringify(data))
      })
  }
}

const mutations = {
  [types.SET_AUTH]: (state, payload) => {
    state.user = payload.user
    state.token = payload.token
  },
  [types.CLEAR_AUTH]: (state, payload) => {
    state.user = {}
    state.token = ''
    localStorage.removeItem('hacktivOverflow_auth')
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
