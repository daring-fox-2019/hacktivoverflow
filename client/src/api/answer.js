import api from '../api/index.js'

const create = (payload) => {
  return api.post(
    `/questions/${payload.questionId}/answers`,
    { description: payload.description },
    {
      headers: {
        Authorization: payload.token
      }
    }
  )
}

const votes = (payload) => {
  return api.put(`/questions/${payload.questionId}/answers/${payload.answerId}/votes`, {
    votes: payload.votes
  }, {
    headers: {
      Authorization: payload.token
    }
  })
}

const update = (payload) => {
  return api.put(`/questions/${payload.questionId}/answers/${payload.answerId}`, {
    description: payload.description
  }, {
    headers: {
      Authorization: payload.token
    }
  })
}

export default {
  create,
  votes,
  update
}
