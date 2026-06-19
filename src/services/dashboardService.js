import http from './http'

export default {
  async getStats() {
    return http.get('/dashboard/stats')
  },
}
