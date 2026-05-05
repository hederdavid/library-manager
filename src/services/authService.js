import http from './http'

export default {
  login: (credentials) => http.post('/auth/login', credentials),
  logout: () => http.post('/auth/logout'),
  me: () => http.get('/auth/me'),
}
