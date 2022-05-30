import axios from 'axios'
const request = axios.create({
  baseURL: '/',
  timeout: 15000
})
export default request