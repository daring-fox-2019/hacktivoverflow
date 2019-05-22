import api from '../api/index.js'

const register = (payload) => api.post('/auth/register', payload)

const login = (payload) => api.post('/auth/login', payload)

const updateTags = (payload) => api.put('/user/tags', payload, {
  headers: {
    Authorization: payload.token
  }
})

const fetchUser = (payload) => api.get(`/users/${payload}`)

export default {
  register,
  login,
  updateTags,
  fetchUser
}
