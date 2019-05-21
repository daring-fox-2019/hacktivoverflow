import Vue from 'vue';
import Vuex from 'vuex';
import myServer from '@/api/myServer';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    allQuestions: [],
    isLogin: false,
    user: {},
    currentQuestion: {}
  },
  mutations: {
    getQuestion(state, question){
      console.log(`ini di mutation quesotn`);
      console.log(question);
      
      state.currentQuestion = question
    },

    getAllQuestions(state, questions) {
      
      state.allQuestions = questions;
    },

    submitLogin(state, user) {
      localStorage.token = user.token;
      state.isLogin = true;
      state.user = user;
    },

    logout(state) {
      state.isLogin = false;
      state.user = {};
    },

  },
  actions: {
    getAllQuestions(context) {
      myServer
        .get('/question')
        .then(({ data }) => {
          context.commit('getAllQuestions', data);
        })
        .catch((err) => {
          console.log(err);
        });
    },

    submitLogin(context, form) {
      myServer
        .post('/user/login', form)
        .then(({ data }) => {
          context.commit('submitLogin', data);
        })
        .catch((err) => {
          console.log(err);
        });
    },

    submitRegister(context, form) {
      console.log(form);

      myServer
        .post('/user/register', form)
        .then(({ data }) => {
          console.log(data);
          console.log('yeay berhasil register');
        })
        .catch((err) => {
          console.log(err);
        });
    },

    getQuestion(context, id){
      myServer
        .get(`/question/${id}`)
        .then(({data})=>{
          console.log(`masuk action`);
          
          console.log(data)
          context.commit('getQuestion', data)
        })
        .catch(err =>{
          console.log(err)
        })
    }

  },
});
