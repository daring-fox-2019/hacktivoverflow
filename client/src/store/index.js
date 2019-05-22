// import vue
import Vue from 'vue';
// import vuex
import Vuex from 'vuex';
// menggunakan vuex pada vue
Vue.use(Vuex);
// import state dari file state.js
// import state from './state'
// export vuex berikut dengan state-nya
export default new Vuex.Store({
  state: {
    isLogin: false,
  },
  mutations: {
    userLogin(state) {
      state.isLogin = true;
    },
    userLogout(state) {
      state.isLogin = false;
    },
  },
});
