import api from '../api/index.js'

const register = (payload) => api.post('/auth/register', payload)

const login = (payload) => api.post('/auth/login', payload)

export default {
  register,
  login
}
