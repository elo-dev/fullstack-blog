import axios from 'axios'

export const instance = axios.create({
  baseURL: import.meta.env.VITE_REACT_APP_API_URL,
})

instance.interceptors.request.use((config) => {
  config.headers = {
    Authorization: `${localStorage.getItem('token')}`,
  }
  return config
})
