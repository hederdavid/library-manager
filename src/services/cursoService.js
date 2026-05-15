import http from './http'

export default {
  findAll: (filters = {}) => http.get('/curso', filters),
  findById: (id) => http.get(`/curso/${id}`),
  create: (data) => http.post('/curso', data),
  update: (id, data) => http.put(`/curso/${id}`, data),
  remove: (id) => http.delete(`/curso/${id}`),
}
