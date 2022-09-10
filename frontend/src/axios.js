import axios from 'axios'

const instance = axios.create({
  baseURL: 'http://localhost:8888',
})

export default instance
