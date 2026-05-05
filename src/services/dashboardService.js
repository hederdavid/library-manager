import http from './http'

export default {
  getStats: () => http.get('/dashboard/stats'),
}
