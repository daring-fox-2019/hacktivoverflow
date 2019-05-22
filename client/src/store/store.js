import Vue from 'vue';
import Vuex from 'vuex';
import axios from '../main'
import router from '../router';
import Swal from "sweetalert2";

Vue.use(Vuex);

export const store = new Vuex.Store({
  state: {
    userId : localStorage.getItem('id'),
    userTags : [],
    isLogin: false,
    listQuestions: [],
    myQuestionsList: [],
    oneQuestionDetails: '',
    watchedTag : [],
    answersOnThisQuestion: []


  },
  mutations: {
    //me mutasi data yang di store sendiri, dipanggil dengan commit dari bawah
    changeLoginStatus(state, payload) {
      state.isLogin = true
      localStorage.setItem('id', payload._id);
      localStorage.setItem('email', payload.email);
      localStorage.setItem('token', payload.token);
      router.push('/dashboard');
    },
    changeSignOutStatus(state) {
      state.isLogin = false
      localStorage.clear()
      router.push('/');

    },
    persistLoginStatus(state) {
      state.isLogin = true
    },
    setQuestionsList(state, questions) {
      state.listQuestions = questions
    },
    setMyQuestionsList(state, questions) {
      state.myQuestionsList = questions
    },
    setDetailsOnThisQuestion(state, details) {
      state.oneQuestionDetails = details
    },
    setListAnswersOnThisQuestion(state, details) {
      state.answersOnThisQuestion = details
    },
    changeListToSearch(state, payload) {
      state.listQuestions = payload
    },
    changeListToWatchedTag(state, payload) {
      state.listQuestions = payload
    },
    setUserWatchedTags(state, payload) {
      state.watchedTag = payload
    },
    setOneQuestionDetailsUp(state, payload ) {
      console.log(payload, state, 'UP????????');
      
      state.oneQuestionDetails = payload
    },
    setOneQuestionDetailsDown(state, payload ) {
      console.log(payload, state, 'DOWNN????????');

      state.oneQuestionDetails = payload
    }
 
  },
  actions: {
    // methods asycnronusç
    login(context, payload) {
      axios.post(`/users/signin`, {
          email: payload.email,
          password: payload.password
        })
        .then(({ data  }) => {
          context.commit('changeLoginStatus', data)
          Swal.fire({
            type: "success",
            title: "Logged in!"
          });

        })
        .catch(err => {
          Swal.fire({
            type: "error",
            title: "Wrong credentials!"
          });
          console.log(err);
        })
    },
    getQuestions({ commit }) {
      console.log('ini gQ store');
      axios.get(`/questions`, {
          headers: {
            token: localStorage.getItem("token")
          }
        })
        .then(({ data }) => {
          console.log('ini dari store');
          commit('setQuestionsList', data)
        })
        .catch(err => {
          // console.log(err, 'err di get ALL question');
        })
    },
    getMyQuestions({ commit }) {
      console.log('ini mau dpt my qs');
      console.log(localStorage.getItem("id"), '????');

      axios.get(`/questions/user/${localStorage.getItem("id")}`)
        .then(({
          data
        }) => {
          console.log('berhasil get my qs');
          commit('setMyQuestionsList', data)
        })
        .catch(err => {
          // console.log(err, 'err di get MY question');
        })
    },
    getDetailsOnThisQuestion({ commit, dispatch }, id) {
      console.log(id, 'dari storeee');

      axios
        .get(`/questions/${id}`)
        .then(({
          data
        }) => {
          commit('setDetailsOnThisQuestion', data)

          // this.q = data;
          // console.log(data, "/????");
        })
        .catch(err => {
          // console.log(err.response, "apa erooor?????");
        });
    },
    getListAnswersOnThisQuestion({ commit, dispatch }, id) {
      console.log('masuk ngecek list answernya!!', id);

      axios
        .get(`/answers/question/${id}`)
        .then(({
          data
        }) => {
          commit('setListAnswersOnThisQuestion', data)

          // this.answers = data
          // console.log("ini jawaban kalo ada", data);
        })
        .catch(err => {
          console.log(err.response);
        });
    }, 
    getTaggedQuestion ({commit , dispatch}, tagnya) {
      axios.get(`/questions/tag`, {params : {tags : tagnya}})
      .then(({data}) => {
        commit('setQuestionsArrayToSelectedTag', data)

      })
      .catch(err => {

      })
    },
    getUser({commit, dispatch} ) {
      // console.log('KETRIGRES DARI APP');
      
      axios
        .get(`/users/user/`, {
          headers: { token: localStorage.getItem("token") }
        })
        .then(({ data }) => {
          // console.log(data , ' apaaaaaa MANA TAG');
          commit('setUserWatchedTags', data.tags)
        })
        .catch(err => {
          console.log(err);
        });
    }
  }, watch: {
    
  },
});
