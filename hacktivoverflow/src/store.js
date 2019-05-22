import Vue from "vue";
import Vuex from "vuex";
import api from "@/api/config.js"

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    isLogin: false,
    questions: [],
    question: {},
    tempImageUrl: "",
    answers: [],
    answer: {}
  },
  mutations: {
    signin(state, v) {
      state.isLogin = v
      console.log('user signed in? ', v);
    },
    getQuestions(state, questions) {
      state.questions = questions
      console.log(state.questions);
    },
    getOneQuestion(state, question) {
      state.question = question
    },
    setTempImgUrl(state, url) {
      state.tempImageUrl = url
    },
    setAnswers(state, answer) {
      state.answers = answer
    },
    getOneAnswer(state, answer) {
      state.answer = answer
    }
  },
  actions: {
    signin({
      commit
    }, v) {
      console.log(v, 'masuk ke sign in');
      api({
        url: '/signin',
        method: 'POST',
        data: {
          email: v.email,
          password: v.password
        }
      }).then(user => {
        localStorage.setItem("id", user.data.id)
        localStorage.setItem("name", user.data.name)
        localStorage.setItem("token", user.data.token)
        commit('signin', true)
      }).catch(error => {
        console.log(error.response.data.msg);
      })
    },
    register({
      commit
    }, v) {
      console.log(v);
      api({
        url: '/register',
        method: 'POST',
        data: {
          name: v.name,
          email: v.email,
          password: v.password
        }
      }).then(user => {
        console.log(user.data);
        this.dispatch('signin', {
          email: v.email,
          password: v.password
        })
      }).catch(error => {
        console.log(error);
      })
    },
    signout({
      commit
    }) {
      localStorage.removeItem("token")
      localStorage.removeItem("name")
      localStorage.removeItem("id")
      this.dispatch('checkSignIn')
    },
    checkSignIn({
      commit
    }) {
      if (localStorage.getItem('token')) {
        commit('signin', true)
      } else {
        commit('signin', false)
      }
    },
    getQuestions({
      commit
    }) {
      api({
        url: "/questions",
        method: "GET"
      }).then(({
        data
      }) => {
        data.forEach(question => {
          if (question.upvotes.indexOf(localStorage.getItem("id")) !== -1) {
            question.contribution = 'upvote'
          } else if (question.downvotes.indexOf(localStorage.getItem("id")) !== -1) {
            question.contribution = 'downvote'
          } else {
            question.contribution = null
          }
          if (question.author._id === localStorage.getItem("id")) {
            question.isOwner = true
          } else {
            question.isOwner = false
          }

        })
        commit('getQuestions', data)
      })
    },
    deleteQuestion({
      commit
    }, questionId) {
      console.log(questionId);
      api({
        url: `/questions/${questionId}`,
        method: "DELETE",
        headers: {
          token: localStorage.getItem("token")
        }
      }).then(() => {
        this.dispatch('getQuestions')
      }).catch(error => {
        console.log(error.response);
      })
    },
    deleteAnswer({
      commit
    }, v) {
      console.log(v.questionId, v.answerId);
      api({
        url: `/questions/${v.questionId}/answers/${v.answerId}`,
        method: "DELETE",
        headers: {
          token: localStorage.getItem("token")
        }
      }).then(() => {
        this.dispatch('getQuestions')
        this.dispatch('getOneQuestion', v.questionId)
        this.dispatch('getAnswers', v.questionId)
      }).catch(error => {
        console.log(error.response);
      })
    },
    upvoteQuestion({
      commit
    }, v) {
      console.log('upvote dispatched');
      console.log("question id", v);
      console.log(`/questions/${v}/upvote`);
      api({
        url: `/questions/${v}/upvote`,
        method: "PUT",
        headers: {
          token: localStorage.getItem("token")
        }
      }).then(() => {
        this.dispatch('getQuestions')
        this.dispatch('getOneQuestion', v)
      }).catch(error => {
        console.log(error.response);
      })
    },
    upvoteAnswer({
      commit
    }, v) {
      console.log('upvote dispatched');
      console.log("question id", v);
      console.log(`/questions/${v.questionId}/answers/${v.answerId}/upvote`);
      api({
        url: `/questions/${v.questionId}/answers/${v.answerId}/upvote`,
        method: "PUT",
        headers: {
          token: localStorage.getItem("token")
        }
      }).then(() => {
        this.dispatch('getQuestions')
        this.dispatch('getOneQuestion', v.questionId)
        this.dispatch('getAnswers', v.questionId)
      }).catch(error => {
        console.log(error.error);
      })
    },
    downvoteQuestion({
      commit
    }, v) {
      console.log('downvote dispatched');
      console.log("question id", v);
      console.log(`/questions/${v}/downvote`);
      api({
        url: `/questions/${v}/downvote`,
        method: "PUT",
        headers: {
          token: localStorage.getItem("token")
        }
      }).then(() => {
        this.dispatch('getQuestions')
        this.dispatch('getOneQuestion', v)
      }).catch(error => {
        console.log(error.error);
      })
    },
    downvoteAnswer({
      commit
    }, v) {
      console.log('downvote dispatched');
      console.log("question id", v.questionId);
      console.log(`/questions/${v.questionId}/answers/${v.answerId}/downvote`);
      api({
        url: `/questions/${v.questionId}/answers/${v.answerId}/downvote`,
        method: "PUT",
        headers: {
          token: localStorage.getItem("token")
        }
      }).then(() => {
        this.dispatch('getQuestions')
        this.dispatch('getOneQuestion', v.questionId)
        this.dispatch('getAnswers', v.questionId)
      }).catch(error => {
        console.log(error.error);
      })
    },
    getOneQuestion({
      commit
    }, questionId) {
      api({
        url: `/questions/${questionId}`,
        method: "GET"
      }).then(({
        data
      }) => {
        if (data.upvotes.indexOf(localStorage.getItem("id")) !== -1) {
          data.contribution = 'upvote'
        } else if (data.downvotes.indexOf(localStorage.getItem("id")) !== -1) {
          data.contribution = 'downvote'
        } else {
          data.contribution = null
        }
        if (data.author._id === localStorage.getItem("id")) {
          data.isOwner = true
        } else {
          data.isOwner = false
        }
        commit('getOneQuestion', data)
      })
    },
    getOneAnswer({
      commit
    }, v) {
      console.log(v.questionId, v.answerId);
      api({
        url: `/questions/${v.questionId}/answers/${v.answerId}`,
        method: "GET",
        headers: {
          token: localStorage.getItem("token")
        }
      }).then(({
        data
      }) => {
        commit('getOneAnswer', data)
      }).catch(error => {
        console.log(error.response);
      })
    },
    submitQuestion({
      commit
    }, question) {
      console.log(localStorage.getItem('token'));
      api({
        url: '/questions',
        method: 'POST',
        headers: {
          token: localStorage.getItem('token')
        },
        data: {
          title: question.title,
          body: question.body
        }
      }).then(({
        data
      }) => {
        this.dispatch('getQuestions')
      }).catch(error => {
        console.log(error.response);
      })
    },
    updateQuestion({
      commit
    }, updatedQuestion) {
      console.log(updatedQuestion._id, 'ini line 281');
      console.log(updatedQuestion);
      api({
        url: `/questions/${updatedQuestion._id}`,
        method: "PUT",
        headers: {
          token: localStorage.getItem("token")
        },
        data: {
          title: updatedQuestion.title,
          body: updatedQuestion.body
        }
      }).then(() => {
        this.dispatch('getQuestions')
        this.dispatch('getOneQuestion', updatedQuestion._id)
      }).catch(error => {
        console.log(error.response.data);
      })
    },
    updateAnswer({
      commit
    }, v) {
      console.log(`/questions/${v.questionId}/answers/${v.answer._id}`);
      api({
        url: `/questions/${v.questionId}/answers/${v.answer._id}`,
        method: "PUT",
        headers: {
          token: localStorage.getItem("token")
        },
        data: {
          body: v.answer.body
        }
      }).then(() => {
        this.dispatch('getOneAnswer')
        this.dispatch('getOneQuestion', v.questionId)
        this.dispatch('getAnswers', v.questionId)
      })
    },
    submitAnswer({
      commit
    }, answer) {
      api({
        url: '/questions/' + answer.questionId + '/answers',
        method: 'POST',
        headers: {
          token: localStorage.getItem('token')
        },
        data: {
          body: answer.body
        }
      }).then(({
        data
      }) => {
        this.dispatch('getQuestions')
        this.dispatch('getAnswers', answer.questionId)
        this.dispatch('getOneQuestion', answer.questionId)
      }).catch(error => {
        console.log(error.errors);
      })
    },
    uploadImage({
      commit
    }, formData) {
      return new Promise((resolve, reject) => {
        api({
            url: "/upload",
            method: "POST",
            data: formData,
            headers: {
              token: localStorage.getItem("token")
            }
          })
          .then(result => {
            let url = result.data.link;
            resolve(url)
          })
          .catch(error => {
            reject(error.errors)
          });

      })
    },
    getAnswers({
      commit
    }, questionId) {
      api({
        url: "/questions/" + questionId + "/answers",
        method: "GET"
      }).then(({
        data
      }) => {
        console.log(data);
        data.forEach(answer => {
          if (answer.author._id === localStorage.getItem("id")) {
            answer.isOwner = true
          } else {
            answer.isOwner = false
          }
          if (answer.upvotes.indexOf(localStorage.getItem("id")) !== -1) {
            answer.contribution = 'upvoteanswer'
          } else if (answer.downvotes.indexOf(localStorage.getItem("id")) !== -1) {
            answer.contribution = 'downvoteanswer'
          } else {
            answer.contribution = "neutral"
          }
        })
        commit('setAnswers', data)
      })
    },
    markSolved({
      commit
    }, questionId) {
      api({
        url: `/questions/${questionId}/solve`,
        method: "PUT",
        headers: {
          token: localStorage.getItem("token")
        }
      }).then(() => {
        this.dispatch('getQuestions')
        this.dispatch('getOneQuestion', questionId)
      }).catch(error => {
        console.log(error.errors);
      })
    },
    markUnsolved({
      commit
    }, questionId) {
      api({
        url: `/questions/${questionId}/unsolve`,
        method: "PUT",
        headers: {
          token: localStorage.getItem("token")
        }
      }).then(() => {
        this.dispatch('getQuestions')
        this.dispatch('getOneQuestion', questionId)
      }).catch(error => {
        console.log(error.errors);
      })
    }
  }
});