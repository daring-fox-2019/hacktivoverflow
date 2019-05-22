import axios from 'axios'

export default axios.create({
  baseURL: 'http://35.187.238.131/',
  timeout: 10000,
  withCredentials: false,
})