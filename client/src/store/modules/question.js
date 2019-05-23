import question from '@/api/question'
import answer from '@/api/answer'

import types from '../mutation-types.js'

const state = {
  all: [],
  select: {},
  searchQuery: ''
}

const actions = {
  getAll: ({ commit }) => {
    question
      .fetchAll()
      .then(({ data }) => commit(types.GET_QUESTIONS, data.questions))
      .catch(err => console.log(err))
  },
  getById: ({ commit }, payload) => {
    question
      .fetchById(payload)
      .then(({ data }) => commit(types.GET_QUESTION, data.question))
      .catch(err => console.log(err))
  },
  create: ({ commit }, payload) => {
    question
      .create(payload)
      .then(({ data }) => commit(types.ADD_QUESTION, data.question))
      .catch(err => console.log(err))
  },
  update: ({ commit }, payload) => {
    question
      .update(payload)
      .then(({ data }) => commit(types.GET_QUESTION, data.question))
      .catch(err => console.log(err))
  },
  delete: ({ commit, state, rootState }) => {
    question
      .deleteQuestion({
        questionId: state.select._id,
        token: rootState.auth.token
      })
      .then(() => {
        commit(types.DELETE_QUESTION, { _id: state.select._id })
        commit(types.CLEAR_SELECT)
      })
  },
  addAnswer: ({ commit }, payload) => {
    answer
      .create(payload)
      .then(({ data }) => commit(types.ADD_ANSWER, data.answer))
      .catch(err => console.log(err))
  },
  addVotes: ({ commit }, payload) => {
    question
      .votes(payload)
      .then(({ data }) => commit(types.UPDATE_QUESTION_VOTES, {
        upvotes: data.question.upvotes,
        downvotes: data.question.downvotes
      }))
      .catch(err => console.log(err))
  },
  addAnswerVotes: ({ commit }, payload) => {
    answer
      .votes(payload)
      .then(({ data }) => commit(types.UPDATE_ANSWER, data.answer))
      .catch(err => console.log(err))
  },
  search: ({ commit, state }) => {
    question
      .searchQuestions(state.searchQuery)
      .then(({ data }) => commit(types.GET_QUESTIONS, data.questions))
      .catch(err => console.log(err))
  },
  updateAnswer: ({ commit }, payload) => {
    answer
      .update(payload)
      .then(({ data }) => commit(types.UPDATE_ANSWER, data.answer))
      .catch(err => console.log(err))
  }
}

const mutations = {
  [types.GET_QUESTIONS]: (state, payload) => {
    state.all = payload
  },
  [types.GET_QUESTION]: (state, payload) => {
    state.select = payload
  },
  [types.ADD_QUESTION]: (state, payload) => {
    state.all.unshift(payload)
  },
  [types.ADD_ANSWER]: (state, payload) => {
    state.select.answers.push(payload)
  },
  [types.UPDATE_QUESTION_VOTES]: (state, payload) => {
    state.select.upvotes = payload.upvotes
    state.select.downvotes = payload.downvotes
  },
  [types.UPDATE_ANSWER]: (state, payload) => {
    state.select.answers
      .splice(state.select.answers.indexOf(payload._id), 1, payload)
  },
  [types.CLEAR_SELECT]: (state, payload) => {
    state.select = {}
  },
  [types.SET_QUERY]: (state, payload) => {
    state.searchQuery = payload
  },
  [types.DELETE_QUESTION]: (state, payload) => {
    state.all = state.all.filter(q => q._id !== payload._id)
  }
}

export default {
  namespaced: true,
  state,
  actions,
  mutations
}
