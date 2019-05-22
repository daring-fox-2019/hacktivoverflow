import auth from '@/api/auth'

import types from '../mutation-types.js'

const state = {
  user: {},
  token: ''
}

const getters = {
  isLogin: (state) => !!state.token,
  hasTags: (state) => state.user.tags && state.user.tags.length
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
  },
  updateTags: ({ commit }, payload) => {
    auth
      .updateTags(payload)
      .then(({ data }) => commit(types.SET_USER, data.user))
      .catch(err => console.log(err))
  },
  getUser: ({ commit }, payload) => {
    auth
      .fetchUser(payload)
      .then(({ data }) => commit(types.SET_USER, data.user))
      .catch(err => console.log(err))
  }
}

const mutations = {
  [types.SET_AUTH]: (state, payload) => {
    state.user = payload.user
    state.token = payload.token
  },
  [types.SET_TOKEN]: (state, payload) => {
    state.token = payload.token
  },
  [types.CLEAR_AUTH]: (state, payload) => {
    state.user = {}
    state.token = ''
    localStorage.removeItem('hacktivOverflow_auth')
  },
  [types.SET_USER]: (state, payload) => {
    state.user = payload
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
