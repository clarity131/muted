import axios from 'axios'
const request = axios.create({
  baseURL: 'http://43.128.42.48:2800/',
  timeout: 15000
})
export default request