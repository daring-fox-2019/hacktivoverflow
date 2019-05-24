import Vue from 'vue'
import Vuex from 'vuex'

import axios from "@/api/axios";

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    isLoggedIn: false,
    allQuestions: [],
    allUserQuestions: [],
    currentQuestion: {},
    fullName: "",
    currentPage: "FoxOverflow",
    keyword: "",
    hasUpvoted: false,
    hasDownvoted: false,
  },
  mutations: {
    login(state) {
      state.isLoggedIn = true;
    },
    logout(state) {
      state.isLoggedIn = false;
    },
    setFullName(state) {
      state.fullName = localStorage.fullName;
    },
    clearAllQuestions(state) {
      state.allQuestions = [];
    },
    setAllQuestions(state, payload) {
      state.allQuestions = payload;
    },
    setUserQuestions(state, payload) {
      state.allUserQuestions = payload;
    },
    setCurrentQuestion(state, payload) {
      state.currentQuestion = payload;
    },
    setCurrentPage(state, payload) {
      state.currentPage = payload;
    },
    updateKeyword(state, payload) {
      state.keyword = payload;
    },
    setHasUpvoted(state, payload) {
      state.hasUpvoted = payload;
    },
    setHasDownvoted(state, payload) {
      state.hasDownvoted = payload;
    },
  },
  actions: {
    getAllQuestions(context) {
      axios({
        method: "GET",
        url: `/questions`,
      })
        .then(({ data }) => {
          console.log(data);
          context.commit("setAllQuestions", data);
        })
        .catch((err) => {
          console.log(err);
        });
    },
    getUserQuestions(context) {
      axios({
        method: "GET",
        url: `/questions/user`,
        headers: { token: localStorage.token }
      })
        .then(({ data }) => {
          console.log(data);
          context.commit("setUserQuestions", data);
        })
        .catch((err) => {
          console.log(err);
        });
    },
    getCurrentQuestion(context, id) {
      axios({
        method: "GET",
        url: `/questions/${id}`,
      })
        .then(({ data }) => {
          console.log(data);

          context.commit("setHasUpvoted", data.upvotes.includes(localStorage.userId));
          context.commit("setHasDownvoted", data.downvotes.includes(localStorage.userId));
          context.commit("setCurrentQuestion", data);
        })
        .catch((err) => {
          console.log(err);
        });
    },
    upvoteQuestion(context, id) {
      console.log(id)
      console.log(context.state.hasUpvoted)
      // console.log(this.$state.hasUpvoted);

      axios({
        method: "PATCH",
        url: `/questions/${id}`,
        data: { upvote: true, hasVoted: context.state.hasUpvoted },
        headers: { token: localStorage.token }
      })
        .then(({ data }) => {
          console.log(data);
          context.commit("setHasUpvoted", data.upvotes.includes(localStorage.userId));
          context.commit("setHasDownvoted", data.downvotes.includes(localStorage.userId));
          context.commit("setCurrentQuestion", data);
        })
        .catch((err) => {
          console.log(err);
        });
    },
    downvoteQuestion(context, id) {
      console.log(id)
      console.log(context.state.hasDownvoted)

      axios({
        method: "PATCH",
        url: `/questions/${id}`,
        data: { downvote: true, hasVoted: context.state.hasDownvoted },
        headers: { token: localStorage.token }
      })
        .then(({ data }) => {
          console.log(data);
          context.commit("setHasUpvoted", data.upvotes.includes(localStorage.userId));
          context.commit("setHasDownvoted", data.downvotes.includes(localStorage.userId));
          context.commit("setCurrentQuestion", data);
        })
        .catch((err) => {
          console.log(err);
        });
    },

    test(context) {
      console.log("invoked")
    }
  }
})
