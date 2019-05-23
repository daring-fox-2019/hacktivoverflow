import Vue from 'vue'
import Vuex from 'vuex'

import auth from './modules/auth.js'
import question from './modules/question.js'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    auth,
    question
  }
})
