import api from '../api/index.js'

const fetchAll = () => api.get('/questions')

const fetchById = (questionId) => api.get(`/questions/${questionId}`)

const create = (payload) => {
  return api.post('/questions', payload, {
    headers: {
      Authorization: payload.token
    }
  })
}

const update = (payload) => {
  return api.put(`/questions/${payload.questionId}`, payload, {
    headers: {
      Authorization: payload.token
    }
  })
}

const deleteQuestion = (payload) => {
  return api.delete(`/questions/${payload.questionId}`, {
    headers: {
      Authorization: payload.token
    }
  })
}

const votes = (payload) => {
  return api.put(`/questions/${payload.questionId}/votes`, {
    votes: payload.votes
  }, {
    headers: {
      Authorization: payload.token
    }
  })
}

const searchQuestions = (payload) => {
  return api.get(`/questions?q=${payload}`)
}

export default {
  fetchAll,
  fetchById,
  create,
  votes,
  update,
  deleteQuestion,
  searchQuestions
}
