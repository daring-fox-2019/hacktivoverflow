import axios from 'axios'

let myaxios = axios.create({
  // baseURL: 'http://localhost:3000',
  baseURL: 'http://35.239.218.228',
  timeout: 10000
})

export default myaxios
