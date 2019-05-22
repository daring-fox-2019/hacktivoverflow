import Vue from 'vue';
import Vuex from 'vuex';
import server from '@/api/server';
import Swal from 'sweetalert2';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    // user
    serverUrl: 'http://localhost:3000',
    session: {
      isLogin: false,
    },
    tags:[],
    // question
    questionsList: [],
    questionDetail: {
      question: {},
      answers: [],
    },
    user: {}
  },
  mutations: {
    // user
    submitLogin(state, payload) {
      state.session.isLogin = true;
      if(payload) {
        localStorage.token = payload.token;
        localStorage._id = payload._id;
        localStorage.name = payload.name;
        state.user = payload
      }
    },
    signOut(state) {
      state.session.isLogin = false;
      localStorage.clear();
      Swal.fire({
        // position: 'top-end',
        type: 'success',
        title: 'Successfully logged out!',
        showConfirmButton: false,
        timer: 1500,
      });
    },
    saveUserTags(state, payload ) {
      state.tags = payload
    },
    // question
    fetchQuestionList(state, payload) {
      state.questionsList = payload;
    },
    fetchQuestionDetail(state, payload) {
      state.questionDetail.question = payload;
    },
    upvoteQuestion(state, payload) {
      state.questionDetail.question = payload;
    },
    downvoteQuestion(state, payload) {
      state.questionDetail.question = payload;
    },
    submitNewQuestion(state, payload) {
      state.questionsList.push(payload);
    },
    deleteQuestion(state,payload) {

    },
    // answer
    fetchQuestionAnswers(state, payload) {
      state.questionDetail.answers = payload;
    },
    postAnswer(state, payload) {
      state.questionDetail.answers.push(payload);
    },
    //query
    searchBy(state,payload) {

    }
  },
  actions: {
    // user
    submitRegister({ commit }, register_obj) {
      server
        .post('/users/register', register_obj)
        .then(({ data }) => {
          commit('submitLogin', data);
          Swal.fire({
            type: 'success',
            title: 'Register success!',
            showConfirmButton: false,
            timer: 1500,
          });
        })
        .catch((err) => {
          console.log(err.message);
          Swal.fire({
            type: 'error',
            title: 'Register failed',
            text: err.response.data.message,
            showConfirmButton: false,
            timer: 1500,
          });
        });
    },
    submitLogin({ commit }, login_obj) {
      server
        .post('/users/login', login_obj)
        .then(({ data }) => {
          commit('submitLogin', data);
          Swal.fire({
            type: 'success',
            title: 'Login success!',
            showConfirmButton: false,
            timer: 1500,
          });
        })
        .catch((err) => {
          console.log(err.message);
          Swal.fire({
            type: 'error',
            title: 'Login failed',
            text: err.response.data.message,
            showConfirmButton: false,
            timer: 1500,
          });
        });
    },
    // question
    fetchQuestionList({ commit }) {
      server
        .get('/questions')
        .then(({ data }) => {
          console.log('success fetching question list');
          commit('fetchQuestionList', data);
        })
        .catch((err) => {
          console.log('error fetching fetchQuestionList');
        });
    },
    fetchQuestionDetail({ commit }, question_id) {
      console.log(question_id);
      console.log('masuk fetchquestiondetail');
      server
        .get(`/questions/${question_id}`)
        .then(({ data }) => {
          console.log(data);
          commit('fetchQuestionDetail', data);
        })
        .catch((err) => {
          console.log(err);
        });
    },
    fetchQuestionAnswers({ commit }, question_id) {
      console.log('masuk find answer based on question');

      server
        .get(`/answers/question/${question_id}`)
        .then(({ data }) => {
          console.log(data);
          commit('fetchQuestionAnswers', data);
        })
        .catch((err) => {
          console.log(err);
        });
    },
    upvoteQuestion({ commit }, question_id) {
      server
        .patch(`/questions/${question_id}/upvote`, {}, { headers: { token: localStorage.token } })
        .then(({ data }) => {
          console.log(data);
          commit('upvoteQuestion', data);
        })
        .catch((err) => {
          console.log(err);
          console.log('failed upvoting question');
        });
    },
    downvoteQuestion({ commit }, question_id) {
      server
        .patch(`/questions/${question_id}/downvote`, {}, { headers: { token: localStorage.token } })
        .then(({ data }) => {
          console.log(data);
          commit('downvoteQuestion', data);
        })
        .catch((err) => {
          console.log(err);
          console.log('failed downvoting question');
        });
    },
    submitNewQuestion({ commit }, question_obj) {
      server
        .post('/questions', question_obj, { headers: { token: localStorage.token } })
        .then(({ data }) => {
          console.log('sukses submit new question');
          commit('submitNewQuestion', data);
        })
        .catch((err) => {
          console.log(err);
          console.log('gagal submit new question');
          Swal.fire({
               // position: 'top-end',
               type: 'error',
               title: 'Must be logged in to post question',
               showConfirmButton: false,
               timer: 1500
          })
        });
    },
    // answer
    postAnswer({ commit }, answer_obj) {
      const { token } = localStorage;
      server
        .post('/answers', answer_obj, { headers: { token } })
        .then(({ data }) => {
          commit('postAnswer', data);
        })
        .catch((err) => {
          console.log(err);
          console.log('error posting new answer to question');
        });
    },
    upvoteAnswer({ dispatch }, answer) {
      console.log(answer.question, ' ----- dalam store');
      console.log(answer._id);
      server
        .patch(`/answers/${answer._id}/upvote`, {}, { headers: { token: localStorage.token } })
        .then(({ data }) => {
          console.log(data);
          console.log('masuk then');
          dispatch('fetchQuestionAnswers', answer.question);
        })
        .catch((err) => {
          console.log(err);
          console.log('failed upvoting Answer');
        });
    },
    downvoteAnswer({ dispatch }, answer) {
      // console.log('masuk function')
      // console.log(answer.question ,' ----- dalam store')
      // console.log(answer._id)
      server
        .patch(`/answers/${answer._id}/downvote`, {}, { headers: { token: localStorage.token } })
        .then(({ data }) => {
          console.log(data, '---');
          console.log('masuk then');

          dispatch('fetchQuestionAnswers', answer.question);
        })
        .catch((err) => {
          console.log(err);
          console.log('failed downvoting Answer');
        });
    },
    searchBy({ commit }, query) {
      console.log(query, '--=store')
      server
      .get('/questions', {params: query})
      .then(({data}) => {
        console.log(data)
        console.log('success search filter')
        commit('fetchQuestionList', data)
      })
      .catch(err => {
        console.log(err.response)
      })
    }
  },//end of actions
});
