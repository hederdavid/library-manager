import http from './http'

export default {
  async getAll(params = {}) {
    return http.get('/materias', { params })
  },
  async getById(id) {
    return http.get(`/materias/${id}`)
  },
  async create(data) {
    return http.post('/materias', data)
  },
  async update(id, data) {
    return http.put(`/materias/${id}`, data)
  },
  async delete(id) {
    return http.delete(`/materias/${id}`)
  },
}
