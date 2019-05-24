import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";
import VueSweetalert2 from "vue-sweetalert2";
import router from "./router";
import { stat } from "fs";
import swal from "sweetalert2";
import { log } from "util";

Vue.use(Vuex);
Vue.use(VueSweetalert2);
// const baseURL = 'http://18.136.100.95'
const baseURL = "http://localhost:3000";

export default new Vuex.Store({
  state: {
    auth: "",
    isLogin: false,
    questions: [],
    answers: [],
    title: "",
    answer: "",
    countQuestion: 0,
    countAnswer: 0,
    watchedTags: [],
    user: {},
    editMode : false,
    newsPage : false

  },
  mutations: {
    setAuth(state, value) {
      state.auth = value;
    },
    setIsLogin(state, value) {
      state.isLogin = true;
    },
    setQuestions(state, value) {
      state.questions = value;
      state.countQuestion = +value.upvotes.length - +value.downvotes.length;
    },
    clearUser(state) {
      state.name = "";
      state.email = "";
      state.password = "";
    },
    pushAnswer(state, value) {
      state.answers.push(value);
    },
    setAnswers(state, value) {
      state.answers = value;
    },
    setDetailAnswer(state, value) {
      (state.title = value.title), (state.answer = value.answer);
    },
    setCountQuestion(state, value) {
      console.log(value);
      
      state.countQuestion = value;
    },
    setCountAnswer(state, value) {
      state.countAnswer = value;
    },
    setTags(state, value) {      
      state.watchedTags = value;
    },
    setUser(state, value) {
      state.user = value
    },
    setEdit(state, value) {
      console.log('triggered?');
      console.log(value);
      
      state.editMode = value
    },
    setNews(state, value) {
      state.newsPage = value
    }
  },
  actions: {
    register({ commit, dispatch }, newUser) {
      let { name, email, password } = newUser;
      axios
        .post(`${baseURL}/users/signUp`, { name, email, password })
        .then(({ data }) => {
          // console.log(data);
          Vue.swal("success", data.message, "success");
          commit("setAuth", "login");
        })
        .catch(err => {
          Vue.swal("Ooops", err.response.data.message, "warning");
        });
    },
    signIn({ commit, dispatch }, loginUser) {
      let { email, password } = loginUser;
      if (email == localStorage.getItem("email")) {
        Vue.swal("Ooops", "You already login!", "warning");
      } else {
        axios
          .post(`${baseURL}/users/signIn`, { email, password })
          .then(({ data }) => {
            console.log(data,'=== from storee')
            Vue.swal("success", data.message, "success");
            commit("setIsLogin", true);
            localStorage.setItem("token", data.token);
            localStorage.setItem("id", data.details.id);
            localStorage.setItem("email", data.details.email);
            router.push({ path: "/" });
          })
          .catch(err => {
            Vue.swal("Ooops", err.response.data.message, "warning");
          });
      }
    },
    getUser({commit, dispatch}, option) {
      axios
        .get(`${baseURL}/users`, { headers : {
          token : localStorage.getItem('token')
        }})
        .then(({ data })=> {
          console.log(data);
          commit("setUser", data)
        })
        .catch(err => {
          console.log(err);
        })
    },
    getQuestions({ commit, dispatch }, option) {
      if (!option) {
        axios
          .get(`${baseURL}/questions`)
          .then(({ data }) => {
            commit("setQuestions", data);
          })
          .catch(err => {
            console.log(err);
          });
      } else {
        axios
          .get(`${baseURL}/questions/myList`, {
            headers: {
              token: localStorage.getItem("token")
            }
          })
          .then(({ data }) => {
            // console.log(data);

            commit("setQuestions", data);
          })
          .catch(err => {
            console.log(err);
          });
      }
    },
    createQuestion({ commit, dispatch }, newQuestion) {
      let { title, description, user, tags } = newQuestion;
      axios
        .post(
          `${baseURL}/questions`,
          { title, description, user, tags },
          {
            headers: {
              token: localStorage.getItem("token")
            }
          }
        )
        .then(({ data }) => {
          // console.log(data);
          router.push({ path: "/" });
          Vue.swal("Nice!", data.message, "success");
        })
        .catch(err => {
          Vue.swal("Sorry...", err.response.data.message, "warning");
        });
    },
    createAnswer({ commit, dispatch }, newAnswer) {
      axios
        .post(`${baseURL}/answers`, newAnswer, {
          headers: {
            token: localStorage.getItem("token")
          }
        })
        .then(({ data }) => {
          console.log(data,'jawaban ??');
          
          commit("pushAnswer", data.data);
          router.push({ path: `/questions/${data.data._id}` });
          Vue.swal("Nice!", data.message, "success");
        })
        .catch(err => {
          Vue.swal("Sorry...", err.response.data.message, "warning");
        });
    },

    updateAnswer({ commit, dispatch }, option) {
      // console.log(option, "=== option");

      let { answerId, title, description, question, user } = option;
      axios
        .put(
          `${baseURL}/answers/${answerId}`,
          {
            title,
            description,
            question,
            user
          },
          {
            headers: {
              token: localStorage.getItem("token"),
              email: localStorage.getItem("email"),
              id: localStorage.getItem("id")
            }
          }
        )
        .then(({data}) => {
          console.log(data.question,'what is this???');
          
          router.push(`/questions/${data.question}`)
          swal("Yeap", "update success","success")
        })
        .catch(err => {
          console.log(err);
          swal("Nice", err.message, "warning");
        });
    },
    deleteAnswer({ commit, dispatch }, option) {
      let { answerId, title, description } = option;
      axios.delete(
        `${baseURL}/answers/${answerId}`,
        {
          title,
          description
        },
        {
          headers: {
            token: localStorage.getItem("token"),
            email: localStorage.getItem("email"),
            id: localStorage.getItem("id")
          }
        }
      );
    },
    getTags({ commit, dispatch }, option) {
      axios
        .get(`${baseURL}/users/tags`, {
          headers: { token: localStorage.getItem("token") }
        })
        .then(({ data }) => {
          //  console.log(data);
          commit("setTags", data);
        })
        .catch(err => {
          console.log(err);
        });
    }
  }
});
