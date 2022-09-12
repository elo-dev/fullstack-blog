import axios from 'axios'

export const instance = axios.create({
  baseURL: 'http://localhost:8888',
})

instance.interceptors.request.use((config) => {
  config.headers.Authorization = localStorage.getItem('token')
  return config
})
