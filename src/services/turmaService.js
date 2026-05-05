import http from './http'

export default {
  findAll: () => http.get('/turma'),
  findById: (id) => http.get(`/turma/${id}`),
  create: (data) => http.post('/turma', data),
  update: (id, data) => http.put(`/turma/${id}`, data),
  remove: (id) => http.delete(`/turma/${id}`),
}
