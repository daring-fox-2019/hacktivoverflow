import Vue from 'vue';
import Vuex from 'vuex';
import axios from '@/axios'
import Swal from 'sweetalert2'
import router from '@/router';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    loggedIn: false,
    questions: [],
    user: {},
    queries: [],
    question: {},
    answered: false,
    sortBy: ''
  },
  mutations: {
    sortQuestions(state, payload) {
      switch (payload) {
        case 'Newest':
          state.questions.sort((a, b) => {
            if (a.createdAt > b.createdAt) return -1
            if (a.createdAt < b.createdAt) return 1
            return 0
          })
          break;
        case 'Updated Recently':
          state.questions.sort((a, b) => {
            if (a.updatedAt > b.updatedAt) return -1
            if (a.updatedAt < b.updatedAt) return 1
            return 0
          })
          break;
        case 'Most Voted':
          state.questions.sort((a, b) => {
            if ((a.upvotes.length - a.downvotes.length) > (b.upvotes.length - b.downvotes.length)) return -1
            if ((a.upvotes.length - a.downvotes.length) < (b.upvotes.length - b.downvotes.length)) return 1
            return 0
          })
          break;
        case 'Most Answers':
          state.questions.sort((a, b) => {
            if (a.answers.length > b.answers.length) return -1
            if (a.answers.length < b.answers.length) return 1
            return 0
          })
          break;
        default:
          sort = ''
          break;
      }
    },
    register(state, payload) {
      Swal.fire(
        'Registered!',
        'User Registered!',
        'success',
      );
    },
    login(state, payload) {
      Swal.fire(
        'Logged In!',
        'Successfully logged in!',
        'success',
      );
      localStorage.setItem('userId', payload._id);
      localStorage.setItem('name', payload.name);
      localStorage.setItem('token', payload.token);
      state.loggedIn = true;
      router.push('/');
    },
    logout(state) {
      localStorage.removeItem('userId');
      localStorage.removeItem('name');
      localStorage.removeItem('token');
      state.loggedIn = false;
      router.push('/auth');
    },
    getAllQuestions(state, payload) {
      state.questions = [...payload]
    },
    getUserQuestions(state, payload) {
      state.user = { ...payload }
    },
    searchQuestions(state, payload) {
      state.queries = [...payload]
    },
    getQuestion(state, payload) {
      if (payload.user === localStorage.getItem('userId'))
        state.answered = true
      else state.answered = false
      state.question = { ...payload }
    },
    createQuestion(state, _id) {
      router.push(`/question/${_id}`)
      // Swal.fire(
      //   'Created!',
      //   'Question Created!',
      //   'success',
      // );
    }
  },
  actions: {
    createQuestion(context, payload) {
      axios({
        method: "POST",
        url: '/questions/create',
        data: payload,
        headers: {
          token: localStorage.getItem('token'),
        }
      })
        .then(({ data }) => {
          context.commit('createQuestion', data._id)
        })
        .catch((err) => {
          console.log(err);
        });
    },
    getQuestion(context, questionid) {
      axios({
        method: "GET",
        url: `/questions/read/${questionid}`,
        headers: {
          token: localStorage.getItem('token'),
        }
      })
        .then(({ data }) => {
          context.commit('getQuestion', data)
        })
        .catch((err) => {
          console.log(err);
        });
    },
    answerQuestion(context, payload) {
      axios({
        method: "POST",
        url: `/answers/${payload.questionid}/create`,
        data: payload,
        headers: {
          token: localStorage.getItem('token'),
        }
      })
        .then(({ data }) => {
          context.dispatch('getQuestion', payload.questionid)
        })
        .catch(({response}) => {
          Swal.fire(
            'Answer error!',
            response.data.message,
            'error',
          );
        });
    },
    updateQuestion(context, payload) {
      axios({
        method: "PUT",
        url: `/questions/update/${payload.id}`,
        data: {
          title: payload.title,
          description: payload.description,
        },
        headers: {
          token: localStorage.getItem('token'),
        }
      })
        .then(({ data }) => {
          context.dispatch('getQuestion', payload.questionid)
        })
        .catch((err) => {
          console.log(err);
        });
    },
    updateAnswer(context, payload) {
      axios({
        method: "PUT",
        url: `/answers/update/${payload.id}`,
        data: {
          title: payload.title,
          description: payload.description,
        },
        headers: {
          token: localStorage.getItem('token'),
        }
      })
        .then(({ data }) => {
          context.dispatch('getQuestion', payload.questionid)
        })
        .catch((err) => {
          console.log(err);
        });
    },
    voteQuestion(context, payload) {
      axios({
        method: "PUT",
        url: `/questions/update/${payload.id}`,
        data: {
          voteType: payload.voteType
        },
        headers: {
          token: localStorage.getItem('token'),
        }
      })
        .then(({ data }) => {
          context.dispatch('getAllQuestions')
          context.dispatch('getUserQuestions',localStorage.getItem('userId'))
          context.dispatch('getQuestion', payload.questionid)
        })
        .catch(({ response }) => {
          Swal.fire(
            'Vote Failed!',
            response.data.message,
            'error',
          );
        });
    },
    voteAnswer(context, payload) {
      axios({
        method: "PUT",
        url: `/answers/update/${payload.id}`,
        data: {
          voteType: payload.voteType
        },
        headers: {
          token: localStorage.getItem('token'),
        }
      })
        .then(({ data }) => {
          context.dispatch('getQuestion', payload.questionid)
        })
        .catch(({ response }) => {
          Swal.fire(
            'Vote Failed!',
            response.data.message,
            'error',
          );
        });
    },
    getAllQuestions(context,sortBy) {
      axios({
        method: "GET",
        url: '/questions/read',
      })
        .then(({ data }) => {
          context.commit('getAllQuestions', data)
          if(sortBy)
            context.commit('sortQuestions',sortBy)
        })
        .catch((err) => {
          console.log(err);
        });
    },
    getUserQuestions(context,id) {
      axios({
        method: "GET",
        url: `/users/questions/${id}`,
      })
        .then(({ data }) => {
          context.commit('getUserQuestions', data)
        })
        .catch((err) => {
          console.log(err);
        });
    },
    searchQuestions(context, searchText) {
      let query = `?title=${searchText}`
      axios({
        method: 'GET',
        url: `/answers/search${query}`,
      })
        .then(({ data }) => {
          context.commit('searchQuestions', data);
        })
        .catch((err) => {
          console.log(err);
        });
    },
    register(context, payload) {
      axios({
        method: 'POST',
        url: '/users/register',
        data: payload,
      })
        .then(({ data }) => {
          context.commit('register', data);
        })
        .catch((err) => {
          console.log(err);
        });
    },
    login(context, payload) {
      axios({
        method: 'POST',
        url: '/users/login',
        data: payload,
      })
        .then(({ data }) => {
          context.commit('login', data);
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
  getters: {
    getQuestion(state) {
      return state.question
    }
  }
});
