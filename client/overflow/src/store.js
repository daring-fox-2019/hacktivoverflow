import Vue from "vue";
import Vuex from "vuex";
import axios from "@/api/server/axios.js";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    isLogin: false,
    status: "",
    user: {}
  },
  mutations: {
    login(state, data) {
      localStorage.setItem("token", data.token);
      state.isLogin = true;
      state.status = "success";
    },
    failedLogin(state, data) {
      state.status = "error";
    },
    resetStatus(state) {
      state.status = "";
    },
    loggedIn(state) {
      state.isLogin = true;
    },
    logout(state) {
      state.isLogin = false;
      state.user = {}
    },
    getUser(state, data) {
      state.user = data;
    }
  },
  actions: {
    login(context, userLogin) {
      axios
        .post("/users/login", userLogin)
        .then(({ data }) => {
          context.commit("login", data);
          axios
            .get("/users/one", {
              headers: {
                token: localStorage.token
              }
            })
            .then(({ data }) => {
              context.commit("getUser", data);
            })
            .catch(err => {
              console.log(err);
            });
        })
        .catch(err => {
          context.commit("failedLogin");
        });
    },
    loggedIn(context){
      axios
        .get("/users/one", {
          headers: {
            token: localStorage.token
          }
        })
        .then(({ data }) => {
          context.commit("getUser", data);
          context.commit('loggedIn')
        })
        .catch(err => {
          console.log(err)
        })
    },
    resetStatus(context) {
      context.commit("resetStatus");
    }
  }
});
