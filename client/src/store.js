import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    isLoggedIn: false,
    indivQuestionData: "",
    indivAnswerData: ""
  },
  mutations: {
    login(state) {
      state.isLoggedIn = true;
    },
    logout(state) {
      state.isLoggedIn = false;
    },
    simpenGlobalQuest(state, input) {
      state.indivQuestionData = input;
    },
    simpenGlobalAns(state, input) {
      state.indivAnswerData = input;
    }
  },
  actions: {
    login(context) {
      context.commit("login");
    },
    logout(context) {
      context.commit("logout");
    },
    simpenGlobalQuest(context) {
      context.commit("simpenGlobalQuest");
    },
    simpenGlobalAns(context) {
      context.commit("simpenGlobalAns");
    }
  }
});
