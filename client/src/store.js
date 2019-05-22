import Vue from 'vue'
import Vuex from 'vuex'
import backend from '@/api/api'
// import swal from 'sweetalert2'
import router from '@/router'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    questions: [],
    topic: {},
    votes: {},
    user: null
  },
  getters: {
    userId: state => state.user._id
  },

  mutations: {
    addQuestion(state, newQuestion) {
      state.questions.push(newQuestion)
    },
    setTopic(state, newTopic) {
      console.log(`setting golbal state of current topic`)
      state.topic = newTopic
    },
    setQuestions(state, newQuestions) {
      state.questions = newQuestions
    },
    setTopic(state, newTopic) {
      state.topic = newTopic
    },
    clearTopic(state) {
      state.topic = null
    },
    setUser(state, data) {
      state.user = data.user
      localStorage.setItem('token', data.token)
    },
    clearUser(state) {
      state.user = null
      state.token = null
      localStorage.removeItem('token')
    }
  },
  actions: {
    async homeQuestions({ commit }) {
      try {
        console.log(`should be here`)
        let response = await backend.get(`/home`)
        if (response.status == 200) { commit('setQuestions', response.data) }
      } catch (error) {
        commit('setProduct', null);
      }
    },
    fetchTopic({ commit }, id) {
      return backend
        .get(`topic/${id}`)
        .then(response => {
          commit('setTopic', response.data);
        })
        .catch(error => {
          console.log(error);
          commit('clearTopic', response.data);
          // swal.fire("error", "cannot get specified Topic", "error");
          this.$router.replace("/home");
        });

    }
  }
})
